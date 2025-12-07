/**
 * Referral Landing Page
 *
 * Route: /r/[code]
 *
 * Referral link'lerine gelen kullanıcıları yönlendirir ve UTM tracking yapar.
 */

import { Metadata } from "next";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { cookies } from "next/headers";


interface PageProps {
  params: {
    code: string;
  };
  searchParams: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
  };
}

/**
 * Generate metadata
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  return {
    title: "HizmetGO - Mahallenizdeki Ustalar",
    description:
      "Mahallenizdeki güvenilir esnaf ve hizmet sağlayıcıları ile buluşun.",
  };
}

/**
 * Referral landing page
 */
export default async function ReferralPage({
  params,
  searchParams,
}: PageProps) {
  const { code } = params;
  const { utm_source, utm_medium, utm_campaign, utm_term, utm_content } =
    searchParams;

  // Referral kodunu doğrula
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

  if (!referralCode) {
    // Geçersiz kod - ana sayfaya yönlendir
    redirect("/");
  }

  // UTM parametrelerini cookie'ye kaydet (30 gün)
  const cookieStore = await cookies();
  const utmData = {
    utm_source: utm_source || "referral",
    utm_medium: utm_medium || "referral_link",
    utm_campaign: utm_campaign || code,
    utm_term: utm_term || undefined,
    utm_content: utm_content || undefined,
    referral_code: code,
    timestamp: new Date().toISOString(),
  };

  cookieStore.set("utm_data", JSON.stringify(utmData), {
    maxAge: 30 * 24 * 60 * 60, // 30 gün
    httpOnly: false, // Client-side'da da erişilebilir olmalı
    sameSite: "lax",
    path: "/",
  });

  // Referral code'u cookie'ye kaydet
  cookieStore.set("ref", code, {
    maxAge: 30 * 24 * 60 * 60, // 30 gün
    httpOnly: false,
    sameSite: "lax",
    path: "/",
  });

  // Analytics event (server-side)
  try {
    // Burada analytics servisine event gönderebilirsin
    // Şimdilik sadece log
    console.log("[Referral] Landing page visit", {
      code,
      referrer: referralCode.user.name,
      utm: utmData,
    });
  } catch (error) {
    // Analytics hatası sayfa yönlendirmesini engellememeli
    console.error("Analytics error:", error);
  }

  // Kayıt sayfasına yönlendir (ref parametresi ile)
  redirect(`/auth/register?ref=${code}`);
}
