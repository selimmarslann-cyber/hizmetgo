/**
 * Mobile Token Management
 *
 * Stateless JWT-like tokens for mobile authentication.
 * Web uses HTTP-only cookies, mobile uses Bearer tokens.
 */

import jwt from "jsonwebtoken";

const MOBILE_JWT_SECRET =
  process.env.MOBILE_JWT_SECRET ||
  process.env.JWT_SECRET ||
  "your-mobile-secret-key-change-in-production";

export interface MobileTokenPayload {
  userId: string;
  email: string;
  issuedAt: number;
  expiresAt: number;
}

/**
 * Create a mobile authentication token
 * Valid for 30 days
 */
export function createMobileToken(userId: string, email: string): string {
  const now = Math.floor(Date.now() / 1000);
  const expiresAt = now + 30 * 24 * 60 * 60; // 30 days

  const payload: MobileTokenPayload = {
    userId,
    email,
    issuedAt: now,
    expiresAt,
  };

  return jwt.sign(payload, MOBILE_JWT_SECRET, {
    expiresIn: "30d",
  });
}

/**
 * Verify a mobile token and return userId
 * Returns null if token is invalid or expired
 */
export function verifyMobileToken(token: string): string | null {
  try {
    const decoded = jwt.verify(token, MOBILE_JWT_SECRET) as MobileTokenPayload;

    // Double-check expiration
    const now = Math.floor(Date.now() / 1000);
    if (decoded.expiresAt < now) {
      return null;
    }

    return decoded.userId;
  } catch (error) {
    // Token invalid, expired, or malformed
    return null;
  }
}

/**
 * Extract token from Authorization header
 * Format: "Bearer <token>"
 */
export function extractTokenFromHeader(
  authHeader: string | null,
): string | null {
  if (!authHeader) return null;

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return null;
  }

  return parts[1];
}
