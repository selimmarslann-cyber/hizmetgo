"use client";
import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/lib/hooks/useToast";
import { ArrowLeft, MapPin, MessageSquare, Phone, ShoppingCart, Star, Store } from "lucide-react";


// Static generation'ı engelle
interface Product {
  id: string;
  name: string;
  price: number;
  description?: string | null;
  photoUrl?: string | null;
  active: boolean;
  isService: boolean;
}

export default function BusinessDetailPageClient() {
  const params = useParams();
  const router = useRouter();
  const { success, error } = useToast();
  const [business, setBusiness] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadReviews = useCallback(async () => {
    try {
      const res = await fetch(`/api/businesses/${params.id}/reviews?limit=3`);
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (err) {
      console.error("Yorumlar yüklenemedi:", err);
    }
  }, [params.id]);

  const loadBusiness = useCallback(async () => {
    try {
      const res = await fetch(`/api/businesses/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setBusiness(data);
        setProducts((data.products || []).filter((p: Product) => p.active));
        loadReviews();
      }
    } catch (err) {
      console.error("İşletme yüklenemedi:", err);
    } finally {
      setLoading(false);
    }
  }, [params.id, loadReviews]);

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      const newCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    } else {
      const newCart = [
        ...cart,
        { ...product, businessId: business.id, quantity: 1 },
      ];
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
    success("Sepete eklendi!");
  };

  const getProductImage = (product: Product) => {
    if (product.photoUrl) return product.photoUrl;

    // Auto-assign images for common products
    const name = product.name.toLowerCase();
    if (name.includes("döner")) return "/images/foods/tavuk-doner.jpg";
    if (name.includes("iskender")) return "/images/foods/iskender.jpg";
    if (name.includes("lahmacun")) return "/images/foods/lahmacun.jpg";
    if (name.includes("pide")) return "/images/foods/pide.jpg";
    if (name.includes("pizza")) return "/images/foods/pizza.jpg";
    if (name.includes("hamburger")) return "/images/foods/hamburger.jpg";

    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF6000]"></div>
          <p className="mt-4 text-slate-500">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center">
        <div className="text-center">
          <Store className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            İşletme bulunamadı
          </h2>
          <p className="text-slate-600 mb-4">
            Aradığınız işletme mevcut değil.
          </p>
          <Button onClick={() => router.push("/map")}>Haritaya Dön</Button>
        </div>
      </div>
    );
  }

  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Geri
            </Button>
            <Link href="/cart">
              <Button variant="outline" size="sm" className="relative">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Sepet
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-[#FF6000] text-white border-0 min-w-[20px] h-5 flex items-center justify-center">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Business Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-2 border-slate-200 mb-6 overflow-hidden">
            {/* Cover Image / Gallery Placeholder */}
            <div className="relative h-48 md:h-64 bg-gradient-to-br from-[#FF6000]/20 to-[#FFB347]/20">
              {business.coverImageUrl ? (
                <img
                  src={business.coverImageUrl}
                  alt={business.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Store className="w-24 h-24 text-[#FF6000]/30" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h1 className="text-3xl font-bold text-slate-900">
                      {business.name}
                    </h1>
                    <Badge
                      variant={
                        business.onlineStatus === "ONLINE"
                          ? "default"
                          : "secondary"
                      }
                      className={
                        business.onlineStatus === "ONLINE"
                          ? "bg-green-500 text-white border-0"
                          : "bg-slate-200 text-slate-700"
                      }
                    >
                      {business.onlineStatus === "ONLINE" ? "Açık" : "Kapalı"}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-xl font-bold text-slate-900">
                        {business.avgRating?.toFixed(1) || "0.0"}
                      </span>
                      <span className="text-sm text-slate-600">
                        ({business.reviewCount || 0} değerlendirme)
                      </span>
                    </div>
                    <Badge variant="outline" className="text-sm">
                      {business.category}
                    </Badge>
                  </div>

                  {business.description && (
                    <p className="text-slate-700 mb-4 leading-relaxed">
                      {business.description}
                    </p>
                  )}

                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">
                      {business.addressText || "Adres belirtilmemiş"}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 md:min-w-[200px]">
                  <Button
                    className="w-full bg-[#FF6000] hover:bg-[#FF5500] text-white"
                    onClick={() => {
                      if (business.phone) {
                        window.location.href = `tel:${business.phone}`;
                      } else {
                        error("Telefon numarası bulunamadı");
                      }
                    }}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Hemen Ara
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() =>
                      router.push(`/request?businessId=${business.id}`)
                    }
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Teklif Al
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Gallery Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-6"
        >
          <h2 className="text-xl font-bold text-slate-900 mb-4">Galeri</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="aspect-square rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center overflow-hidden"
              >
                <Store className="w-12 h-12 text-slate-400" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Products / Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900">
              {business.businessType === "restaurant"
                ? "Menü"
                : "Ürünler ve Hizmetler"}
            </h2>
            <Badge variant="outline" className="text-sm">
              {products.length} {products.length === 1 ? "ürün" : "ürün"}
            </Badge>
          </div>

          {products.length === 0 ? (
            <Card className="border-2 border-slate-200">
              <CardContent className="py-12 text-center">
                <Store className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600 font-medium">
                  Henüz ürün/hizmet eklenmemiş
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => {
                const productImage = getProductImage(product);
                return (
                  <motion.div
                    key={product.id}
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Card className="h-full border-2 border-slate-200 hover:border-[#FF6000]/30 hover:shadow-lg transition-all overflow-hidden">
                      {/* Product Image */}
                      <div className="relative h-48 bg-slate-100">
                        {productImage ? (
                          <img
                            src={productImage}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300">
                            <Store className="w-16 h-16 text-slate-400" />
                          </div>
                        )}
                        {!product.active && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <Badge className="bg-red-500 text-white">
                              Pasif
                            </Badge>
                          </div>
                        )}
                      </div>

                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div>
                            <h3 className="font-semibold text-lg text-slate-900 mb-1 line-clamp-1">
                              {product.name}
                            </h3>
                            {product.description && (
                              <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                                {product.description}
                              </p>
                            )}
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                            <div>
                              <p className="text-2xl font-bold text-[#FF6000]">
                                {product.price.toFixed(2)} ₺
                              </p>
                              {product.isService && (
                                <Badge
                                  variant="outline"
                                  className="text-xs mt-1"
                                >
                                  Hizmet
                                </Badge>
                              )}
                            </div>
                            <Button
                              size="sm"
                              onClick={() => addToCart(product)}
                              disabled={
                                business.onlineStatus !== "ONLINE" ||
                                !product.active
                              }
                              className="bg-[#FF6000] hover:bg-[#FF5500] text-white"
                            >
                              <ShoppingCart className="w-4 h-4 mr-1" />
                              Ekle
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Reviews Preview */}
        {business.reviewCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900">
                Değerlendirmeler
              </h2>
              <Link href={`/business/${params.id}/reviews`}>
                <Button variant="outline" size="sm">
                  Tüm Yorumlar
                </Button>
              </Link>
            </div>
            {reviews.length === 0 ? (
              <Card className="border-2 border-slate-200">
                <CardContent className="py-8 text-center text-slate-500">
                  Yorum yükleniyor...
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id} className="border-2 border-slate-200">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-slate-900">
                            {review.reviewer?.name || "Anonim"}
                          </p>
                          <p className="text-xs text-slate-500">
                            {new Date(review.createdAt).toLocaleDateString(
                              "tr-TR",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              },
                            )}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-slate-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      {review.comment && (
                        <p className="text-slate-700 mt-2 leading-relaxed">
                          {review.comment}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
