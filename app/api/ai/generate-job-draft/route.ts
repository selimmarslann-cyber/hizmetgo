/**
 * Generate Job Draft API
 *
 * POST /api/ai/generate-job-draft
 * AI sohbetinden ilan taslağı oluşturur
 */

import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/session";
import { generateJobDraftFromConversation } from "@/lib/ai/jobDraftGenerator";
import { ChatMessage } from "@/lib/ai/chatService";
import { withRateLimit } from "@/lib/middleware/rateLimit";
import { logger } from "@/lib/utils/logger";
import {
  createErrorResponse,
  createSuccessResponse,
  getErrorCodeFromStatus,
  getStatusFromErrorCode,
} from "@/lib/utils/apiError";
import { z } from "zod";

const generateDraftSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant"]),
      content: z.string(),
    }),
  ),
});

async function generateJobDraftHandler(request: NextRequest) {
  try {
    const userId = await getUserId(request);
    if (!userId) {
      const errorResponse = createErrorResponse(
        "UNAUTHORIZED",
        "Kullanıcı girişi gerekli",
      );
      return NextResponse.json(errorResponse, { status: 401 });
    }

    const body = await request.json();
    const validated = generateDraftSchema.parse(body);

    // ChatMessage array'ine dönüştür
    const messages: ChatMessage[] = validated.messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    // Job draft oluştur
    const draft = await generateJobDraftFromConversation(messages);

    const successResponse = createSuccessResponse({ draft });
    return NextResponse.json(successResponse);
  } catch (error: any) {
    logger.error("Generate job draft error", error);

    const errorCode =
      error instanceof z.ZodError
        ? "VALIDATION_ERROR"
        : getErrorCodeFromStatus(500);

    const errorResponse = createErrorResponse(
      errorCode,
      error instanceof z.ZodError
        ? error.errors[0].message
        : error.message || "İlan taslağı oluşturulamadı",
      error instanceof z.ZodError ? { errors: error.errors } : undefined,
    );

    return NextResponse.json(errorResponse, {
      status: getStatusFromErrorCode(errorCode),
    });
  }
}

// Export with rate limiting (10 requests per 15 minutes)

// Cookie kullandığı için dynamic olmalı
export const dynamic = "force-dynamic";
export const POST = withRateLimit(generateJobDraftHandler, {
  maxRequests: 10,
  windowMs: 15 * 60 * 1000,
  getIdentifier: async (req) => {
    const userId = await getUserId(req);
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded
      ? forwarded.split(",")[0]
      : req.headers.get("x-real-ip") || "unknown";
    return userId ? `user:${userId}` : `ip:${ip}`;
  },
});
