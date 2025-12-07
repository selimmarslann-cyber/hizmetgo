/**
 * API Response Caching Utilities
 * Simple cache wrapper for API responses
 */

import { NextResponse } from "next/server";
import { memoryCache } from "@/lib/cache/memoryCache";

interface CacheOptions {
  ttl?: number; // Time to live in seconds
  key?: string; // Custom cache key
  tags?: string[]; // Cache tags for invalidation
}

/**
 * Get cached response or execute function and cache result
 */
export async function withCache<T>(
  key: string,
  fn: () => Promise<T>,
  options: CacheOptions = {},
): Promise<T> {
  const { ttl = 60 } = options;

  // Try to get from cache
  const cached = memoryCache.get<T>(key);
  if (cached !== null) {
    return cached;
  }

  // Execute function
  const result = await fn();

  // Cache the result
  memoryCache.set(key, result, ttl);

  return result;
}

/**
 * Create cache key from request
 */
export function createCacheKey(
  prefix: string,
  params: Record<string, any>,
): string {
  const sortedParams = Object.keys(params)
    .sort()
    .map((key) => `${key}:${params[key]}`)
    .join("|");

  return `${prefix}:${sortedParams}`;
}

/**
 * Cache Next.js API response
 */
export function cachedResponse(
  data: any,
  options: { maxAge?: number; swr?: number } = {},
): NextResponse {
  const { maxAge = 60, swr = 300 } = options;

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": `public, s-maxage=${maxAge}, stale-while-revalidate=${swr}`,
    },
  });
}

/**
 * Invalidate cache by pattern
 */
export function invalidateCache(pattern: string): void {
  // Simple implementation - in production use Redis with pattern matching
  // For now, just log the invalidation
  console.log(`Cache invalidation requested for pattern: ${pattern}`);
}
