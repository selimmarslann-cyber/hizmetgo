"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import nextDynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Info, MapPin, Plus, Save, Trash2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  findProductByName,
  getProductSuggestions,
  type ProductData,
} from "@/lib/data/product-database";

const LeafletMap = nextDynamic(
  () => import("@/components/map/LeafletMapRegister"),
  { ssr: false },
);

const CATEGORIES = [
  { value: "RESTORAN", label: "Restoran" },
  { value: "MARKET", label: "Market" },
  { value: "KUAFOR", label: "Kuaför" },
  { value: "TESISAT", label: "Tesisat" },
  { value: "ELEKTRIK", label: "Elektrik" },
  { value: "TEMIZLIK", label: "Temizlik" },
  { value: "BOYA", label: "Boya" },
  { value: "MARANGOZ", label: "Marangoz" },
  { value: "DIGER", label: "Diğer" },
];

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  ingredients?: string[];
}

export default function BusinessRegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<"location" | "info" | "menu">("location");
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [addressText, setAddressText] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    coverImageUrl: "",
  });

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [productSuggestions, setProductSuggestions] = useState<ProductData[]>(
    [],
  );
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(loc);
          if (!selectedLocation) {
            setSelectedLocation(loc);
          }
        },
        () => {
          // Fallback to İstanbul
          const loc = { lat: 41.0082, lng: 28.9784 };
          setUserLocation(loc);
          if (!selectedLocation) {
            setSelectedLocation(loc);
          }
        },
      );
    } else {
      const loc = { lat: 41.0082, lng: 28.9784 };
      setUserLocation(loc);
      if (!selectedLocation) {
        setSelectedLocation(loc);
      }
    }
  }, [selectedLocation]);

  const handleLocationSelect = (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng });
  };

  const handleNextFromLocation = () => {
    if (!selectedLocation) {
      setError("Lütfen haritada konumunuzu seçin");
      return;
    }
    setStep("info");
    setError("");
  };

  const handleNextFromInfo = () => {
    if (!formData.name || !formData.category) {
      setError("Lütfen işletme adı ve kategori seçin");
      return;
    }
    setStep("menu");
    setError("");
  };

  const handleProductNameChange = (name: string) => {
    setNewItem({ ...newItem, name });

    // Otomatik ürün bulma
    if (name.trim().length > 2) {
      const product = findProductByName(name, formData.category);
      const suggestions = getProductSuggestions(
        formData.category || "RESTORAN",
        name,
      );

      if (product) {
        // Otomatik doldur
        setNewItem({
          name: product.name,
          description: product.description || "",
          price: newItem.price, // Fiyatı koru
        });
        // Resim ve malzemeleri ekle
        if (editingItem) {
          setMenuItems(
            menuItems.map((i) =>
              i.id === editingItem.id
                ? {
                    ...i,
                    imageUrl: product.imageUrl,
                    ingredients: product.ingredients,
                  }
                : i,
            ),
          );
        }
      }

      setProductSuggestions(suggestions);
      setShowSuggestions(suggestions.length > 0);
    } else {
      setShowSuggestions(false);
      setProductSuggestions([]);
    }
  };

  const handleSelectSuggestion = (product: ProductData) => {
    setNewItem({
      name: product.name,
      description: product.description || "",
      price: newItem.price, // Fiyatı koru
    });
    setShowSuggestions(false);

    // Eğer düzenleme modundaysak, mevcut item'ı güncelle
    if (editingItem) {
      setMenuItems(
        menuItems.map((i) =>
          i.id === editingItem.id
            ? {
                ...i,
                name: product.name,
                description: product.description || i.description,
                imageUrl: product.imageUrl,
                ingredients: product.ingredients,
              }
            : i,
        ),
      );
    }
  };

  const handleAddMenuItem = () => {
    if (!newItem.name || !newItem.price) {
      setError("Lütfen ürün adı ve fiyat girin");
      return;
    }

    // Ürün veritabanından bilgileri al
    const product = findProductByName(newItem.name, formData.category);

    const item: MenuItem = {
      id: Date.now().toString(),
      name: newItem.name,
      description: newItem.description || product?.description || "",
      price: parseFloat(newItem.price),
      imageUrl: product?.imageUrl,
      ingredients: product?.ingredients,
    };

    if (editingItem) {
      setMenuItems(menuItems.map((i) => (i.id === editingItem.id ? item : i)));
      setEditingItem(null);
    } else {
      setMenuItems([...menuItems, item]);
    }

    setNewItem({ name: "", description: "", price: "" });
    setShowSuggestions(false);
    setError("");
  };

  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setNewItem({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
    });
  };

  const handleDeleteItem = (id: string) => {
    setMenuItems(menuItems.filter((i) => i.id !== id));
  };

  const handleSubmit = async () => {
    if (!selectedLocation || !formData.name || !formData.category) {
      setError("Lütfen tüm gerekli alanları doldurun");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const userRes = await fetch("/api/auth/me", { credentials: "include" });
      if (!userRes.ok) {
        router.push("/auth/login?redirect=/business/register");
        return;
      }
      const userData = await userRes.json();

      const res = await fetch("/api/businesses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          category: formData.category,
          lat: selectedLocation.lat,
          lng: selectedLocation.lng,
          addressText: addressText || "Konum seçildi",
          coverImageUrl: formData.coverImageUrl,
          ownerUserId: userData.user.id,
        }),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "İşletme kaydedilemedi");
        return;
      }

      // If menu items exist, save them
      if (menuItems.length > 0 && data.business?.id) {
        // TODO: Save menu items to products API
        // await fetch(`/api/businesses/${data.business.id}/products`, { ... })
      }

      router.push(`/business/store`);
    } catch (err) {
      setError("Bir hata oluştu");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Esnaf Kayıt</h1>
          <p className="text-gray-600 mt-2">
            Dükkanınızı haritada işaretleyin, bilgilerinizi girin ve menünüzü
            ekleyin
          </p>
        </div>

        {/* Steps Indicator */}
        <div className="mb-6 flex items-center gap-4">
          <div
            className={cn(
              "flex items-center gap-2",
              step === "location"
                ? "text-primary font-semibold"
                : step === "info" || step === "menu"
                  ? "text-primary"
                  : "text-gray-400",
            )}
          >
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                step === "location"
                  ? "bg-primary text-white"
                  : step === "info" || step === "menu"
                    ? "bg-primary/20 text-primary"
                    : "bg-gray-200",
              )}
            >
              1
            </div>
            <span>Konum Seç</span>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400" />
          <div
            className={cn(
              "flex items-center gap-2",
              step === "info"
                ? "text-primary font-semibold"
                : step === "menu"
                  ? "text-primary"
                  : "text-gray-400",
            )}
          >
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                step === "info"
                  ? "bg-primary text-white"
                  : step === "menu"
                    ? "bg-primary/20 text-primary"
                    : "bg-gray-200",
              )}
            >
              2
            </div>
            <span>Bilgiler</span>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400" />
          <div
            className={cn(
              "flex items-center gap-2",
              step === "menu" ? "text-primary font-semibold" : "text-gray-400",
            )}
          >
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                step === "menu" ? "bg-primary text-white" : "bg-gray-200",
              )}
            >
              3
            </div>
            <span>Menü</span>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 rounded-md">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Form */}
          <div className="space-y-6">
            {step === "location" && (
              <Card>
                <CardHeader>
                  <CardTitle>1. Konumunuzu Seçin</CardTitle>
                  <CardDescription>
                    Haritada dükkanınızın konumunu işaretleyin. Haritaya
                    tıklayarak konum seçebilirsiniz.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div className="text-sm text-blue-900">
                        <p className="font-semibold mb-1">Nasıl Çalışır?</p>
                        <ol className="list-decimal list-inside space-y-1 text-blue-800">
                          <li>Haritada dükkanınızın bulunduğu yeri bulun</li>
                          <li>Haritaya tıklayarak konumunuzu seçin</li>
                          <li>
                            Seçilen konum turuncu bir işaret ile gösterilecek
                          </li>
                          <li>"Devam Et" butonuna tıklayın</li>
                        </ol>
                      </div>
                    </div>
                  </div>

                  {selectedLocation && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-sm text-green-900">
                        <strong>Seçilen Konum:</strong>{" "}
                        {selectedLocation.lat.toFixed(6)},{" "}
                        {selectedLocation.lng.toFixed(6)}
                      </p>
                    </div>
                  )}

                  <Button
                    onClick={handleNextFromLocation}
                    className="w-full"
                    disabled={!selectedLocation}
                  >
                    Devam Et <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            )}

            {step === "info" && (
              <Card>
                <CardHeader>
                  <CardTitle>2. İşletme Bilgileri</CardTitle>
                  <CardDescription>
                    İşletmenizin adını, kategorisini ve açıklamasını girin
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">İşletme Adı *</Label>
                    <Input
                      id="name"
                      placeholder="Örn: Mehmet Usta Restoran"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Kategori *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData({ ...formData, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Kategori seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Açıklama</Label>
                    <Textarea
                      id="description"
                      placeholder="İşletmeniz hakkında kısa bir açıklama..."
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Adres</Label>
                    <Input
                      id="address"
                      placeholder="Mahalle, sokak, bina no"
                      value={addressText}
                      onChange={(e) => setAddressText(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setStep("location")}
                      className="flex-1"
                    >
                      Geri
                    </Button>
                    <Button onClick={handleNextFromInfo} className="flex-1">
                      Devam Et <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === "menu" && (
              <Card>
                <CardHeader>
                  <CardTitle>3. Menü / Ürünler</CardTitle>
                  <CardDescription>
                    İşletmenizin menüsünü veya hizmetlerini ekleyin (Yemeksepeti
                    tarzı)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Add/Edit Item Form */}
                  <div className="border rounded-lg p-4 space-y-3 bg-gray-50">
                    <h4 className="font-semibold">
                      {editingItem ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}
                    </h4>
                    <div className="space-y-2 relative">
                      <Label htmlFor="itemName">Ürün/Hizmet Adı *</Label>
                      <Input
                        id="itemName"
                        placeholder="Örn: Tavuk Döner, Mercimek Çorbası, Saç Kesimi"
                        value={newItem.name}
                        onChange={(e) =>
                          handleProductNameChange(e.target.value)
                        }
                        onFocus={() => {
                          if (newItem.name.length > 2) {
                            const suggestions = getProductSuggestions(
                              formData.category || "RESTORAN",
                              newItem.name,
                            );
                            setProductSuggestions(suggestions);
                            setShowSuggestions(suggestions.length > 0);
                          }
                        }}
                        onBlur={() => {
                          // Delay to allow click on suggestion
                          setTimeout(() => setShowSuggestions(false), 200);
                        }}
                      />
                      {showSuggestions && productSuggestions.length > 0 && (
                        <div className="absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                          {productSuggestions.map((product) => (
                            <button
                              key={product.id}
                              type="button"
                              onClick={() => handleSelectSuggestion(product)}
                              className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-3"
                            >
                              {product.imageUrl && (
                                <img
                                  src={product.imageUrl}
                                  alt={product.name}
                                  className="w-10 h-10 rounded object-cover"
                                />
                              )}
                              <div className="flex-1">
                                <div className="font-medium text-sm">
                                  {product.name}
                                </div>
                                {product.description && (
                                  <div className="text-xs text-gray-500">
                                    {product.description}
                                  </div>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="itemDesc">Açıklama</Label>
                      <Textarea
                        id="itemDesc"
                        placeholder="Ürün/hizmet açıklaması..."
                        value={newItem.description}
                        onChange={(e) =>
                          setNewItem({
                            ...newItem,
                            description: e.target.value,
                          })
                        }
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="itemPrice">Fiyat (₺) *</Label>
                      <Input
                        id="itemPrice"
                        type="number"
                        placeholder="0.00"
                        value={newItem.price}
                        onChange={(e) =>
                          setNewItem({ ...newItem, price: e.target.value })
                        }
                        step="0.01"
                        min="0"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={handleAddMenuItem}
                        className="flex-1"
                        disabled={!newItem.name || !newItem.price}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        {editingItem ? "Güncelle" : "Ekle"}
                      </Button>
                      {editingItem && (
                        <Button
                          variant="outline"
                          onClick={() => {
                            setEditingItem(null);
                            setNewItem({
                              name: "",
                              description: "",
                              price: "",
                            });
                          }}
                        >
                          İptal
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Menu Items List */}
                  <div className="space-y-2">
                    <Label>Menü Öğeleri ({menuItems.length})</Label>
                    {menuItems.length === 0 ? (
                      <div className="border-2 border-dashed rounded-lg p-8 text-center text-gray-500">
                        <p>Henüz ürün eklenmedi</p>
                        <p className="text-sm mt-1">
                          Yukarıdaki formdan ürün ekleyebilirsiniz
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {menuItems.map((item) => (
                          <div
                            key={item.id}
                            className="border rounded-lg p-3 flex items-start gap-3 hover:bg-gray-50"
                          >
                            {item.imageUrl && (
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="w-20 h-20 rounded object-cover flex-shrink-0"
                              />
                            )}
                            <div className="flex-1">
                              <div className="font-semibold">{item.name}</div>
                              {item.description && (
                                <div className="text-sm text-gray-600 mt-1">
                                  {item.description}
                                </div>
                              )}
                              {item.ingredients &&
                                item.ingredients.length > 0 && (
                                  <div className="mt-2">
                                    <div className="text-xs text-gray-500 mb-1">
                                      Malzemeler:
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                      {item.ingredients.map((ing, idx) => (
                                        <Badge
                                          key={idx}
                                          variant="outline"
                                          className="text-xs"
                                        >
                                          {ing}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              <div className="text-primary font-semibold mt-2">
                                {item.price.toFixed(2)} ₺
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditItem(item)}
                              >
                                Düzenle
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteItem(item.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={() => setStep("info")}
                      className="flex-1"
                    >
                      Geri
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      className="flex-1"
                      disabled={loading}
                    >
                      {loading ? (
                        "Kaydediliyor..."
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Kaydet ve Bitir
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right: Map */}
          <div className="lg:sticky lg:top-24 h-[600px] lg:h-[calc(100vh-8rem)]">
            <Card className="h-full">
              <CardContent className="p-0 h-full">
                {userLocation && (
                  <LeafletMap
                    center={[userLocation.lat, userLocation.lng]}
                    zoom={13}
                    selectedLocation={selectedLocation}
                    onLocationSelect={handleLocationSelect}
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
