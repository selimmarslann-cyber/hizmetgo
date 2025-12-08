import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { code: string } }
) {
  const { code } = params;

  // Parse UTM params from URL
  const url = new URL(request.url);
  const utm_source = url.searchParams.get("utm_source") ?? "referral";
  const utm_medium = url.searchParams.get("utm_medium") ?? "referral_link";
  const utm_campaign = url.searchParams.get("utm_campaign") ?? code;
  const utm_term = url.searchParams.get("utm_term") ?? undefined;
  const utm_content = url.searchParams.get("utm_content") ?? undefined;

  // Validate referral code via prisma
  const referralCode = await prisma.referralCode.findUnique({
    where: { code },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  // If invalid code, redirect to homepage (no cookies)
  if (!referralCode) {
    const redirectUrl = new URL("/", url.origin);
    return NextResponse.redirect(redirectUrl);
  }

  const utmData = {
    utm_source,
    utm_medium,
    utm_campaign,
    utm_term,
    utm_content,
    referral_code: code,
    timestamp: new Date().toISOString(),
  };

  // Prepare redirect URL to register page with ref param
  const redirectUrl = new URL(`/auth/register?ref=${code}`, url.origin);

  const response = NextResponse.redirect(redirectUrl);

  // Set cookies for 30 days
  const maxAge = 30 * 24 * 60 * 60; // 30 days in seconds

  response.cookies.set("utm_data", JSON.stringify(utmData), {
    maxAge,
    httpOnly: false,
    sameSite: "lax",
    path: "/",
  });

  response.cookies.set("ref", code, {
    maxAge,
    httpOnly: false,
    sameSite: "lax",
    path: "/",
  });

  // Optional: server-side log
  console.log("[Referral] Landing page visit", {
    code,
    referrer: referralCode.user?.name,
    utm: utmData,
  });

  return response;
}

