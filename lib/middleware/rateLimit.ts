/**
 * Rate Limit Middleware for API Routes
 */

import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/utils/rateLimiter";

export interface RateLimitConfig {
  maxRequests?: number;
  windowMs?: number;
  getIdentifier?: (req: NextRequest) => string | Promise<string>;
}

const defaultConfig: Required<RateLimitConfig> = {
  maxRequests: 100,
  windowMs: 15 * 60 * 1000, // 15 minutes
  getIdentifier: (req) => {
    // Use IP address as identifier
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded
      ? forwarded.split(",")[0]
      : req.headers.get("x-real-ip") || "unknown";
    return ip;
  },
};

export function withRateLimit(
  handler: (req: NextRequest) => Promise<NextResponse>,
  config: RateLimitConfig = {},
) {
  const finalConfig = { ...defaultConfig, ...config };

  return async (req: NextRequest) => {
    const identifier = await Promise.resolve(finalConfig.getIdentifier(req));
    const result = rateLimit({
      maxRequests: finalConfig.maxRequests,
      windowMs: finalConfig.windowMs,
      identifier,
    });

    if (!result.allowed) {
      return NextResponse.json(
        {
          error: "Too many requests",
          message: "Rate limit exceeded. Please try again later.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(
              Math.ceil((result.resetTime - Date.now()) / 1000),
            ),
            "X-RateLimit-Limit": String(finalConfig.maxRequests),
            "X-RateLimit-Remaining": String(result.remaining),
            "X-RateLimit-Reset": String(result.resetTime),
          },
        },
      );
    }

    const response = await handler(req);

    // Add rate limit headers to response
    response.headers.set("X-RateLimit-Limit", String(finalConfig.maxRequests));
    response.headers.set("X-RateLimit-Remaining", String(result.remaining));
    response.headers.set("X-RateLimit-Reset", String(result.resetTime));

    return response;
  };
}
