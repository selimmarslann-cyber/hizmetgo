/**
 * Sitemap
 *
 * XML sitemap for search engines
 * Includes category + city SEO pages
 */

import { MetadataRoute } from "next";
import { SERVICE_CATEGORIES } from "@/lib/data/service-categories";

// Ana şehirler (SEO için)
const MAJOR_CITIES = [
  { slug: "istanbul", name: "İstanbul" },
  { slug: "ankara", name: "Ankara" },
  { slug: "izmir", name: "İzmir" },
  { slug: "bursa", name: "Bursa" },
  { slug: "antalya", name: "Antalya" },
  { slug: "adana", name: "Adana" },
  { slug: "gaziantep", name: "Gaziantep" },
  { slug: "konya", name: "Konya" },
  { slug: "kayseri", name: "Kayseri" },
  { slug: "eskisehir", name: "Eskişehir" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://hizmetgo.app";
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/download`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/legal/privacy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/legal/terms`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Kategori + şehir SEO sayfaları (ilk 20 kategori için)
  const popularCategories = SERVICE_CATEGORIES.slice(0, 20);
  const seoPages: MetadataRoute.Sitemap = [];

  for (const city of MAJOR_CITIES) {
    for (const category of popularCategories) {
      const categorySlug = category.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-");
      seoPages.push({
        url: `${baseUrl}/usta/${city.slug}/${categorySlug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  return [...staticPages, ...seoPages];
}
