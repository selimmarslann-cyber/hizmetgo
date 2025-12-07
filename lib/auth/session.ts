import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { verifyToken, JWTPayload } from "./jwt";
import { verifyMobileToken, extractTokenFromHeader } from "./mobileTokens";

/**
 * Server-side session kontrolü
 * Middleware veya server component'lerde kullanılır
 * Cookie tabanlı (web) authentication
 */
export async function getSession(): Promise<JWTPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;

  if (!token) {
    return null;
  }

  return verifyToken(token);
}

/**
 * Extract user ID from request (supports both web cookie and mobile Bearer token)
 *
 * Priority:
 * 1. Cookie-based token (web)
 * 2. Bearer token from Authorization header (mobile)
 */
export async function extractUserIdFromRequest(
  request: NextRequest,
): Promise<string | null> {
  // First, try cookie-based session (web)
  const cookieStore = await cookies();
  const cookieToken = cookieStore.get("auth-token")?.value;

  if (cookieToken) {
    const session = verifyToken(cookieToken);
    if (session) {
      return session.userId;
    }
  }

  // If no cookie, try Bearer token (mobile)
  const authHeader = request.headers.get("authorization");
  const bearerToken = extractTokenFromHeader(authHeader);

  if (bearerToken) {
    const userId = verifyMobileToken(bearerToken);
    if (userId) {
      return userId;
    }
  }

  return null;
}

/**
 * Kullanıcı ID'sini döndür
 *
 * Overload 1: No parameters - uses cookie (web, backward compatible)
 * Overload 2: NextRequest - supports both cookie and Bearer token
 */
export async function getUserId(request?: NextRequest): Promise<string | null> {
  // If request provided, use dual-mode extraction
  if (request) {
    return extractUserIdFromRequest(request);
  }

  // Otherwise, use cookie-based session (backward compatible)
  const session = await getSession();
  return session?.userId || null;
}

/**
 * Kullanıcı giriş yapmış mı kontrol et
 */
export async function isAuthenticated(request?: NextRequest): Promise<boolean> {
  if (request) {
    const userId = await extractUserIdFromRequest(request);
    return userId !== null;
  }

  const session = await getSession();
  return session !== null;
}
