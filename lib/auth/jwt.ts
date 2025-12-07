import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

export interface JWTPayload {
  userId: string;
  email: string;
}

/**
 * JWT token oluştur
 */
export function signToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d", // 7 gün geçerli
  });
}

/**
 * JWT token doğrula
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}

/**
 * Request'ten token al (cookie veya header)
 */
export function getTokenFromRequest(request: Request): string | null {
  // Cookie'den al
  const cookies = request.headers.get("cookie");
  if (cookies) {
    const tokenCookie = cookies
      .split(";")
      .find((c) => c.trim().startsWith("auth-token="));
    if (tokenCookie) {
      return tokenCookie.split("=")[1];
    }
  }

  // Header'dan al (fallback)
  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }

  return null;
}
