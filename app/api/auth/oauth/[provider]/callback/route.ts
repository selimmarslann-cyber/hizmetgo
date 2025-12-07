/**
 * OAuth Callback Handler
 * GET /api/auth/oauth/[provider]/callback
 *
 * Handles OAuth callback from providers and creates/links user account
 */

import { NextRequest, NextResponse } from "next/server";
import {
  createOrLinkSocialAccount,
  createSocialLoginSession,
} from "@/lib/auth/socialAuth";
import { getOAuthConfig, type OAuthProvider } from "@/lib/auth/oauth";

async function exchangeCodeForToken(
  provider: OAuthProvider,
  code: string,
  redirectUri: string,
): Promise<any> {
  const configs = getOAuthConfig();
  const config = configs[provider] as any;
  if (!config || !config.clientId) {
    throw new Error(`${provider} not configured`);
  }

  // Exchange authorization code for access token
  const tokenUrl = getTokenUrl(provider);

  const params = new URLSearchParams({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    code,
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
  });

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Token exchange failed: ${errorText}`);
  }

  return response.json();
}

async function getUserInfo(
  provider: OAuthProvider,
  accessToken: string,
): Promise<any> {
  const userInfoUrl = getUserInfoUrl(provider);

  const response = await fetch(userInfoUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user info");
  }

  return response.json();
}

function getTokenUrl(provider: OAuthProvider): string {
  const urls: Record<OAuthProvider, string> = {
    google: "https://oauth2.googleapis.com/token",
    facebook: "https://graph.facebook.com/v18.0/oauth/access_token",
    twitter: "https://api.twitter.com/2/oauth2/token",
    apple: "https://appleid.apple.com/auth/token",
  };
  return urls[provider];
}

function getUserInfoUrl(provider: OAuthProvider): string {
  const urls: Record<OAuthProvider, string> = {
    google: "https://www.googleapis.com/oauth2/v2/userinfo",
    facebook: "https://graph.facebook.com/me?fields=id,name,email,picture",
    twitter: "https://api.twitter.com/2/users/me?user.fields=profile_image_url",
    apple: "https://appleid.apple.com/auth/userinfo",
  };
  return urls[provider];
}

function parseUserInfo(
  provider: OAuthProvider,
  userInfo: any,
): {
  email: string;
  name: string;
  avatarUrl?: string;
  providerAccountId: string;
} {
  switch (provider) {
    case "google":
      return {
        email: userInfo.email,
        name: userInfo.name,
        avatarUrl: userInfo.picture,
        providerAccountId: userInfo.id,
      };
    case "facebook":
      return {
        email: userInfo.email,
        name: userInfo.name,
        avatarUrl: userInfo.picture?.data?.url,
        providerAccountId: userInfo.id,
      };
    case "twitter":
      return {
        email: userInfo.data?.email || `${userInfo.data?.id}@twitter.oauth`,
        name: userInfo.data?.name || "Twitter User",
        avatarUrl: userInfo.data?.profile_image_url,
        providerAccountId: userInfo.data?.id,
      };
    case "apple":
      // Apple provides name only on first login
      return {
        email: userInfo.email,
        name: userInfo.name || userInfo.email?.split("@")[0] || "Apple User",
        providerAccountId: userInfo.sub,
      };
    default:
      throw new Error(`Unsupported provider: ${provider}`);
  }
}

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

// Eski callback handler - artık kullanılmıyor
async function oldCallbackHandler(
  request: NextRequest,
  { params }: { params: { provider: string } },
) {
  try {
    const provider = params.provider as OAuthProvider;

    // Validate provider
    const validProviders: OAuthProvider[] = [
      "google",
      "facebook",
      "twitter",
      "apple",
    ];
    if (!validProviders.includes(provider)) {
      return NextResponse.json(
        { error: "Geçersiz OAuth provider" },
        { status: 400 },
      );
    }

    // Get code and state from query params
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const stateParam = searchParams.get("state");
    const error = searchParams.get("error");

    // Check for OAuth errors
    if (error) {
      console.error(`OAuth error from ${provider}:`, error);
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("error", "oauth_denied");
      return NextResponse.redirect(loginUrl);
    }

    if (!code) {
      return NextResponse.json(
        { error: "Authorization code bulunamadı" },
        { status: 400 },
      );
    }

    // Parse state
    let refCode: string | undefined;
    let redirect = "/account";

    if (stateParam) {
      try {
        const state = JSON.parse(
          Buffer.from(stateParam, "base64url").toString(),
        );
        refCode = state.ref;
        redirect = state.redirect || "/account";
      } catch {
        // Invalid state, continue with defaults
      }
    }

    // Get OAuth config
    const configs = getOAuthConfig();
    const config = configs[provider] as any;
    if (!config || !config.clientId) {
      throw new Error(`${provider} OAuth not configured`);
    }

    // Exchange code for token
    const tokenData = await exchangeCodeForToken(
      provider,
      code,
      config.redirectUri,
    );

    // Get user info from provider
    const userInfo = await getUserInfo(provider, tokenData.access_token);

    // Parse user info
    const parsedInfo = parseUserInfo(provider, userInfo);

    // Create or link account
    const user = await createOrLinkSocialAccount(
      {
        provider,
        providerAccountId: parsedInfo.providerAccountId,
        email: parsedInfo.email,
        name: parsedInfo.name,
        avatarUrl: parsedInfo.avatarUrl,
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token,
        expiresAt: tokenData.expires_in
          ? new Date(Date.now() + tokenData.expires_in * 1000)
          : undefined,
        idToken: tokenData.id_token,
      },
      refCode,
    );

    if (!user) {
      throw new Error("Kullanıcı oluşturulamadı veya bulunamadı");
    }

    // Create session
    const { token, mobileToken } = createSocialLoginSession(
      user.id,
      user.email,
    );

    // Create response with redirect
    const redirectUrl = new URL(redirect, request.url);
    const response = NextResponse.redirect(redirectUrl);

    // Set auth cookie
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error(`OAuth callback error (${params.provider}):`, error);

    // Redirect to login page with error
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("error", "oauth_failed");
    loginUrl.searchParams.set(
      "message",
      error.message || "OAuth girişi başarısız",
    );
    return NextResponse.redirect(loginUrl);
  }
}
