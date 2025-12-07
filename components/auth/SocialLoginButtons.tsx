/**
 * Social Login Buttons Component
 * Google, Facebook, Twitter, Apple login butonları
 */

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {} from // Lucide icons for social login (if available, otherwise use text)
"lucide-react";

interface SocialLoginButtonsProps {
  refCode?: string | null;
  redirect?: string;
  isBusiness?: boolean;
}

export default function SocialLoginButtons({
  refCode,
  redirect,
  isBusiness = false,
}: SocialLoginButtonsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSocialLogin = (
    provider: "google" | "facebook" | "twitter" | "apple",
  ) => {
    // Build OAuth URL with referral and redirect
    const params = new URLSearchParams();
    if (refCode) {
      params.set("ref", refCode);
    }
    if (redirect) {
      params.set("redirect", redirect);
    } else {
      const currentRedirect = searchParams.get("redirect");
      if (currentRedirect) {
        params.set("redirect", currentRedirect);
      } else {
        params.set("redirect", isBusiness ? "/business/jobs" : "/account");
      }
    }

    // Redirect to OAuth initiation endpoint
    router.push(`/api/auth/oauth/${provider}?${params.toString()}`);
  };

  return (
    <div className="space-y-3">
      {/* Google */}
      <Button
        type="button"
        variant="outline"
        className="w-full h-12 border-2 hover:bg-gray-50"
        onClick={() => handleSocialLogin("google")}
      >
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Google ile Giriş Yap
      </Button>

      {/* Facebook */}
      <Button
        type="button"
        variant="outline"
        className="w-full h-12 border-2 hover:bg-blue-50"
        onClick={() => handleSocialLogin("facebook")}
      >
        <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
        Facebook ile Giriş Yap
      </Button>

      {/* Twitter */}
      <Button
        type="button"
        variant="outline"
        className="w-full h-12 border-2 hover:bg-sky-50"
        onClick={() => handleSocialLogin("twitter")}
      >
        <svg className="w-5 h-5 mr-2" fill="#1DA1F2" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
        Twitter ile Giriş Yap
      </Button>

      {/* Apple */}
      <Button
        type="button"
        variant="outline"
        className="w-full h-12 border-2 hover:bg-gray-900 hover:text-white"
        onClick={() => handleSocialLogin("apple")}
      >
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
        </svg>
        Apple ile Giriş Yap
      </Button>
    </div>
  );
}
