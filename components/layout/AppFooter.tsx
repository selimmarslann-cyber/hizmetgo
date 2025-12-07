"use client";

import Link from "next/link";
import { Shield, CheckCircle2 } from "lucide-react";

export default function AppFooter() {
  const currentYear = new Date().getFullYear();

  const footerLinks: {
    customers: Array<{ label: string; href: string; external?: boolean }>;
    pros: Array<{ label: string; href: string; external?: boolean }>;
    support: Array<{ label: string; href: string; external?: boolean }>;
    company: Array<{ label: string; href: string; external?: boolean }>;
  } = {
    customers: [
      { label: "Hizmetgo Nasıl Kullanılır", href: "/how-it-works" },
      { label: "Kayıt Ol", href: "/auth/register" },
      { label: "Uygulamayı İndir", href: "/download" },
      { label: "Yakınımdaki Hizmetler", href: "/map" },
      { label: "Fiyat Tahminleri", href: "/pricing" },
      { label: "Kaynak Merkezi", href: "/resources" },
    ],
    pros: [
      { label: "Esnaflar İçin Hizmetgo", href: "/business" },
      { label: "Esnaf Olarak Kayıt Ol", href: "/auth/register" },
      { label: "Topluluk", href: "/community" },
      { label: "Esnaf Kaynakları", href: "/pro-resources" },
      { label: "Esnaf Yorumları", href: "/pro-reviews" },
      { label: "iPhone Uygulaması", href: "https://apps.apple.com/app/hizmetgo", external: true },
      { label: "Android Uygulaması", href: "https://play.google.com/store/apps/details?id=com.hizmetgo.app", external: true },
    ],
    support: [
      { label: "Yardım", href: "/support/help" },
      { label: "Güvenlik", href: "/safety" },
      { label: "Kullanım Şartları", href: "/legal/terms" },
      { label: "Gizlilik Politikası", href: "/legal/privacy" },
      { label: "KVKK", href: "/legal/kvkk" },
      { label: "Kişisel Bilgilerimi Satma veya Paylaşma", href: "/legal/privacy/do-not-sell" },
    ],
    company: [
      { label: "Hakkımızda", href: "/about" },
      { label: "Bizimle Çalış", href: "/partner" },
      { label: "Geliştiriciler İçin", href: "/developers" },
      { label: "Kariyer", href: "/careers" },
      { label: "Basın", href: "/press" },
      { label: "Blog", href: "/blog" },
    ],
  };

  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 md:gap-16">
          {/* Brand - Thumbtack Style */}
          <div className="col-span-2 md:col-span-1">
            <h3
              className="text-slate-900 font-bold text-xl mb-3"
              style={{ letterSpacing: "-0.01em" }}
            >
              Hizmetgo
            </h3>
            <p className="text-sm text-slate-600 font-normal leading-relaxed mb-6 max-w-xs">
              İşini hallet.
            </p>
            {/* Social Media Icons */}
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/hizmetgo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-brand-500 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://twitter.com/hizmetgo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-brand-500 transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="https://facebook.com/hizmetgo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-brand-500 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Müşteriler - Thumbtack Style */}
          <div>
            <h4 className="text-slate-900 font-bold text-sm mb-6 uppercase tracking-wide">
              Müşteriler
            </h4>
            <ul className="space-y-3">
              {footerLinks.customers.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-slate-600 hover:text-brand-500 transition-colors font-normal"
                    >
                      {link.label}
                    </a>
                  ) : (
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-brand-500 transition-colors font-normal"
                  >
                    {link.label}
                  </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Esnaflar - Thumbtack Style */}
          <div>
            <h4 className="text-slate-900 font-bold text-sm mb-6 uppercase tracking-wide">
              Esnaflar
            </h4>
            <ul className="space-y-3">
              {footerLinks.pros.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-slate-600 hover:text-brand-500 transition-colors font-normal"
                    >
                      {link.label}
                    </a>
                  ) : (
                <Link
                      href={link.href}
                  className="text-sm text-slate-600 hover:text-brand-500 transition-colors font-normal"
                >
                      {link.label}
                </Link>
                  )}
              </li>
              ))}
            </ul>
          </div>

          {/* Destek - Thumbtack Style */}
          <div>
            <h4 className="text-slate-900 font-bold text-sm mb-6 uppercase tracking-wide">
              Destek
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-slate-600 hover:text-brand-500 transition-colors font-normal"
                    >
                      {link.label}
                    </a>
                  ) : (
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-brand-500 transition-colors font-normal"
                  >
                    {link.label}
                  </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Şirket - Thumbtack Style */}
          <div>
            <h4 className="text-slate-900 font-bold text-sm mb-6 uppercase tracking-wide">
              Şirket
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-slate-600 hover:text-brand-500 transition-colors font-normal"
                    >
                      {link.label}
                    </a>
                  ) : (
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-brand-500 transition-colors font-normal"
                  >
                    {link.label}
                  </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright ve Garanti - Thumbtack Style */}
        <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 font-normal">
            © {currentYear} Hizmetgo, Inc.
          </p>
          
          {/* Hizmetgo Garantisi Badge */}
          <Link
            href="/guarantee"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all group"
          >
            <Shield className="w-4 h-4 text-brand-500" />
            <span className="text-sm font-semibold text-slate-900">
              Hizmetgo Garantisi
            </span>
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
