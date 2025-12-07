/**
 * OAuth Provider Initiation Endpoint
 * GET /api/auth/oauth/[provider]
 *
 * Redirects user to OAuth provider's authorization page
 */

import { NextRequest, NextResponse } from "next/server";
import { getOAuthAuthUrl, type OAuthProvider } from "@/lib/auth/oauth";

// OAuth devre dışı bırakıldı - Sadece manuel giriş kullanılıyor

// Cookie kullandığı için dynamic olmalı
export const dynamic = "force-dynamic";
export async function GET(
  request: NextRequest,
  { params }: { params: { provider: string } },
) {
  return NextResponse.json(
    {
      error:
        "OAuth girişi devre dışı bırakıldı. Lütfen e-posta ve şifre ile giriş yapın.",
    },
    { status: 410 }, // 410 Gone - Artık kullanılmayan endpoint
  );
}
