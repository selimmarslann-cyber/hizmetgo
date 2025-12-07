"use client";

import React, { useState } from "react";
import { Sparkles, Gift, TrendingUp, Copy, Check } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/lib/hooks/useToast";

export default function PromotionalBanner() {
  const [copied, setCopied] = useState(false);
  const { success } = useToast();

  const handleCopyReferralLink = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/referral/my-code", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        if (data.referralLink) {
          await navigator.clipboard.writeText(data.referralLink);
          setCopied(true);
          success("Referans linki kopyalandı!");
          setTimeout(() => setCopied(false), 2000);
        } else {
          // Referans linki yoksa login sayfasına yönlendir
          window.location.href = "/auth/login";
        }
      } else {
        // Giriş yapılmamışsa login sayfasına yönlendir
        window.location.href = "/auth/login";
      }
    } catch (err) {
      console.error("Referral link kopyalanamadı:", err);
      // Hata durumunda login sayfasına yönlendir
      window.location.href = "/auth/login";
    }
  };

  return (
    <div className="relative w-full bg-black text-white shadow-2xl overflow-hidden border-b-2 border-brand-500">
      {/* Alevli Gradient Arka Plan */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-500/20 via-brand-500/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-brand-500/30 to-transparent opacity-50"></div>
      </div>

      {/* Alev Efekti */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-60 blur-sm"></div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-80"></div>

      <div className="relative max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 md:py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="hidden sm:block flex-shrink-0 animate-bounce-slow">
              <Sparkles className="w-6 h-6 md:w-7 md:h-7 text-brand-500 drop-shadow-lg" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 min-w-0">
              <span className="text-xs sm:text-sm font-black uppercase tracking-widest whitespace-nowrap animate-fade-in text-brand-500">
                2026
              </span>
              <span className="text-sm sm:text-base md:text-lg lg:text-xl font-extrabold leading-tight animate-fade-in-delay">
                Ömür Boyu Referans Geliriyle{" "}
                <span className="text-brand-500">Muhteşem 2026!</span>
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/referral"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-500/20 hover:bg-brand-500/30 rounded-lg text-xs sm:text-sm font-bold transition-all backdrop-blur-sm border border-brand-500/40"
            >
              <Gift className="w-4 h-4 text-brand-500" />
              <span>Kazancımı Gör</span>
            </Link>
            <button
              onClick={handleCopyReferralLink}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-500/20 hover:bg-brand-500/30 rounded-lg text-xs sm:text-sm font-bold transition-all backdrop-blur-sm border border-brand-500/40"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-brand-500" />
                  <span>Kopyalandı!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-brand-500" />
                  <span>Referans Linkim</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
