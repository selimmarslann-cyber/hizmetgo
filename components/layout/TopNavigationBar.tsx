"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import SupportHelpButton from "@/components/support/SupportHelpButton";

export default function TopNavigationBar() {
  return (
    <div className="w-full bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end gap-3 py-3">
          {/* Sol tarafta boş alan - ileride logo veya başka şeyler eklenebilir */}
          <div className="flex-1"></div>

          {/* Menü Butonları */}
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href="/auth/register"
              className="text-sm font-medium text-slate-700 hover:text-slate-900 px-3 py-2 rounded-md transition-colors whitespace-nowrap"
            >
              Kayıt Ol
            </Link>
            <Link
              href="/auth/login"
              className="text-sm font-medium text-slate-700 hover:text-slate-900 px-3 py-2 rounded-md transition-colors whitespace-nowrap"
            >
              Giriş Yap
            </Link>
            <Link
              href="/partner"
              className="text-sm font-medium text-slate-700 hover:text-slate-900 px-3 py-2 rounded-md transition-colors whitespace-nowrap"
            >
              Ortak Ol
            </Link>
            <Link
              href="/business/register"
              className="text-sm font-medium text-slate-700 hover:text-slate-900 px-3 py-2 rounded-md transition-colors whitespace-nowrap"
            >
              Esnaf Kayıt
            </Link>
            {/* En sağda: Destek Butonu */}
            <div className="ml-2 pl-2 border-l border-slate-200">
              <SupportHelpButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
