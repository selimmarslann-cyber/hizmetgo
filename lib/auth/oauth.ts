/**
 * OAuth Provider Configuration and Helpers
 * Supports: Google, Facebook, Twitter, Apple
 */

export type OAuthProvider = "google" | "facebook" | "twitter" | "apple";

export interface OAuthConfig {
  google: {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
  };
  facebook: {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
  };
  twitter: {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
  };
  apple: {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    teamId?: string;
    keyId?: string;
    privateKey?: string;
  };
}

export function getOAuthConfig(): Partial<OAuthConfig> {
  return {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      redirectUri: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/auth/oauth/google/callback`,
    },
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
      redirectUri: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/auth/oauth/facebook/callback`,
    },
    twitter: {
      clientId: process.env.TWITTER_CLIENT_ID || "",
      clientSecret: process.env.TWITTER_CLIENT_SECRET || "",
      redirectUri: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/auth/oauth/twitter/callback`,
    },
    apple: {
      clientId: process.env.APPLE_CLIENT_ID || "",
      clientSecret: process.env.APPLE_CLIENT_SECRET || "",
      redirectUri: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/auth/oauth/apple/callback`,
      teamId: process.env.APPLE_TEAM_ID,
      keyId: process.env.APPLE_KEY_ID,
      privateKey: process.env.APPLE_PRIVATE_KEY,
    },
  };
}

/**
 * Get OAuth authorization URL
 */
export function getOAuthAuthUrl(
  provider: OAuthProvider,
  state?: string,
): string {
  const config = getOAuthConfig()[provider];
  if (!config || !config.clientId) {
    throw new Error(`${provider} OAuth not configured`);
  }

  const baseUrls: Record<OAuthProvider, string> = {
    google: "https://accounts.google.com/o/oauth2/v2/auth",
    facebook: "https://www.facebook.com/v18.0/dialog/oauth",
    twitter: "https://twitter.com/i/oauth2/authorize",
    apple: "https://appleid.apple.com/auth/authorize",
  };

  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    response_type: "code",
    scope: getOAuthScopes(provider),
    ...(state && { state }),
  });

  return `${baseUrls[provider]}?${params.toString()}`;
}

function getOAuthScopes(provider: OAuthProvider): string {
  const scopes: Record<OAuthProvider, string> = {
    google: "openid email profile",
    facebook: "email public_profile",
    twitter: "tweet.read users.read offline.access",
    apple: "name email",
  };
  return scopes[provider];
}
