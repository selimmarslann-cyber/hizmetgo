/**
 * CSRF Protection Utilities
 */

import { cookies } from 'next/headers';
import crypto from 'crypto';

const CSRF_TOKEN_NAME = 'csrf-token';
const CSRF_TOKEN_MAX_AGE = 60 * 60 * 24; // 24 hours

/**
 * Generate CSRF token
 */
export function generateCsrfToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Get CSRF token from cookies
 */
export async function getCsrfToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(CSRF_TOKEN_NAME)?.value || null;
}

/**
 * Set CSRF token in cookie
 */
export async function setCsrfToken(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(CSRF_TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: CSRF_TOKEN_MAX_AGE,
    path: '/',
  });
}

/**
 * Verify CSRF token
 */
export async function verifyCsrfToken(
  token: string | null,
): Promise<boolean> {
  if (!token) {
    return false;
  }
  const storedToken = await getCsrfToken();
  return storedToken !== null && storedToken === token;
}

/**
 * Initialize CSRF token if not exists
 */
export async function ensureCsrfToken(): Promise<string> {
  let token = await getCsrfToken();
  if (!token) {
    token = generateCsrfToken();
    await setCsrfToken(token);
  }
  return token;
}

