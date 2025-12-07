/**
 * Robots.txt
 *
 * Search engine crawler instructions
 */

import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://hizmetgo.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/usta/*", // SEO sayfaları
          "/download",
          "/legal/*",
        ],
        disallow: [
          "/api/",
          "/admin/",
          "/business/",
          "/customer/",
          "/auth/",
          "/r/", // Referral linklerini indexleme (opsiyonel)
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
