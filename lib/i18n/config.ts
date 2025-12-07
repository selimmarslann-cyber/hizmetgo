/**
 * i18n Configuration
 *
 * Minimal i18n hazırlığı - şu an sadece TR dil desteği var
 * İleride ek dil desteği için hazırlık
 */

export const DEFAULT_LOCALE = "tr";
export const SUPPORTED_LOCALES = ["tr"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

/**
 * Get locale from request
 */
export function getLocaleFromRequest(request: Request): Locale {
  // Şu an sadece TR destekleniyor
  // İleride Accept-Language header'ından veya route'dan alınabilir
  return DEFAULT_LOCALE;
}

/**
 * Check if locale is supported
 */
export function isSupportedLocale(locale: string): locale is Locale {
  return SUPPORTED_LOCALES.includes(locale as Locale);
}

/**
 * Get locale metadata for SEO
 */
export function getLocaleMetadata(locale: Locale = DEFAULT_LOCALE) {
  return {
    locale,
    direction: "ltr" as const, // TR için LTR
    // İleride RTL diller için 'rtl' eklenebilir
  };
}
