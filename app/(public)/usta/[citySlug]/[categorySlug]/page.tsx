/**
 * SEO Category + City Page
 *
 * Route: /usta/[citySlug]/[categorySlug]
 *
 * Example: /usta/istanbul/cam-balkon
 *
 * Bu sayfa SEO için kategori ve şehir bazlı dinamik sayfalar oluşturur.
 */

import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SERVICE_CATEGORIES } from "@/lib/data/service-categories";
import { prisma } from "@/lib/db/prisma";

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

interface PageProps {
  params: {
    citySlug: string;
    categorySlug: string;
  };
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { citySlug, categorySlug } = params;

  // Şehir bilgisini bul
  const city = MAJOR_CITIES.find((c) => c.slug === citySlug);
  if (!city) {
    return {
      title: "Sayfa Bulunamadı",
    };
  }

  // Kategori bilgisini bul
  const category = SERVICE_CATEGORIES.find((cat) => {
    const slug = cat.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return slug === categorySlug;
  });

  if (!category) {
    return {
      title: "Sayfa Bulunamadı",
    };
  }

  const title = `${category.name} Ustası ${city.name}\u2019de | HizmetGO`;
  const description = `${city.name}\u2019de ${category.name} hizmeti veren güvenilir ustalar. Hızlı teklif al, en iyi fiyatı bul.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: "tr_TR",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/**
 * Page component
 * Note: generateStaticParams removed because this page uses dynamic = "force-dynamic"
 * to avoid useContext errors during prerendering (layout is a client component)
 */
export default async function CategoryCityPage({ params }: PageProps) {
  const { citySlug, categorySlug } = params;

  // Şehir ve kategori doğrulama
  const city = MAJOR_CITIES.find((c) => c.slug === citySlug);
  if (!city) {
    notFound();
  }

  const category = SERVICE_CATEGORIES.find((cat) => {
    const slug = cat.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return slug === categorySlug;
  });

  if (!category) {
    notFound();
  }

  // Bu kategorideki aktif işletmeleri getir (cache ile)
  const businesses = await prisma.business.findMany({
    where: {
      isActive: true,
      mainCategories: {
        has: category.id,
      },
      // Şehir bazlı filtreleme (addressText içinde şehir adı geçiyorsa)
      addressText: {
        contains: city.name,
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      name: true,
      description: true,
      avgRating: true,
      reviewCount: true,
      addressText: true,
    },
    take: 20,
    orderBy: [{ avgRating: "desc" }, { reviewCount: "desc" }],
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            {category.name} Ustası {city.name}&apos;de
          </h1>
          <p className="text-slate-600 text-lg">
            {city.name}&apos;de {category.name} hizmeti veren {businesses.length}{" "}
            güvenilir usta
          </p>
        </div>

        {/* Businesses List */}
        {businesses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businesses.map((business) => (
              <div
                key={business.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {business.name}
                </h3>
                {business.description && (
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                    {business.description}
                  </p>
                )}
                <div className="flex items-center gap-4 text-sm">
                  {business.avgRating > 0 && (
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="font-medium">
                        {business.avgRating.toFixed(1)}
                      </span>
                      {business.reviewCount > 0 && (
                        <span className="text-slate-500">
                          ({business.reviewCount})
                        </span>
                      )}
                    </div>
                  )}
                </div>
                {business.addressText && (
                  <p className="text-xs text-slate-500 mt-2">
                    {business.addressText}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-slate-600">
              {city.name}&apos;de {category.name} kategorisinde henüz usta
              bulunmuyor.
            </p>
            <Link
              href="/"
              className="mt-4 inline-block text-[#FF6000] hover:underline"
            >
              Ana sayfaya dön
            </Link>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-r from-[#FF6000] to-orange-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">
            {category.name} hizmeti mi arıyorsunuz?
          </h2>
          <p className="mb-4">Hemen teklif alın, en iyi fiyatı bulun.</p>
          <Link
            href="/"
            className="inline-block bg-white text-[#FF6000] px-6 py-3 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
          >
            Hemen Başla
          </Link>
        </div>
      </div>
    </div>
  );
}

// Force dynamic rendering to avoid useContext errors during prerendering
// This page uses a client component layout (PublicLayout) which uses context
export const dynamic = "force-dynamic";
