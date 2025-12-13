"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import nextDynamic from "next/dynamic";
import { ArrowRight, Info, MapPin, Plus, Save, Trash2, X, Upload, Image as ImageIcon, Phone, Mail, Globe, Clock, Truck, FileText, CreditCard } from "lucide-react";
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
  const [step, setStep] = useState<"location" | "info" | "contact" | "delivery" | "legal" | "financial" | "menu">("location");
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
    // İletişim Bilgileri
    phone: "",
    email: "",
    whatsapp: "",
    website: "",
    // Çalışma Saatleri
    workingHours: {} as Record<string, { open: string; close: string } | null>,
    // Teslimat Bilgileri
    hasDelivery: false,
    minOrderAmount: "",
    deliveryRadius: "",
    deliveryFee: "",
    deliveryTime: "",
    freeDeliveryThreshold: "",
    // Yasal Belgeler
    taxDocumentUrl: "",
    idDocumentUrl: "",
    licenseUrl: "",
    // Finansal Bilgiler
    iban: "",
    accountHolder: "",
    bankName: "",
    taxNumber: "",
    taxOffice: "",
  });
  const [taxDocumentFile, setTaxDocumentFile] = useState<File | null>(null);
  const [idDocumentFile, setIdDocumentFile] = useState<File | null>(null);
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const taxDocumentInputRef = useRef<HTMLInputElement>(null);
  const idDocumentInputRef = useRef<HTMLInputElement>(null);
  const licenseInputRef = useRef<HTMLInputElement>(null);

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [itemImageFile, setItemImageFile] = useState<File | null>(null);
  const coverImageInputRef = useRef<HTMLInputElement>(null);
  const itemImageInputRef = useRef<HTMLInputElement>(null);
  const [productSuggestions, setProductSuggestions] = useState<ProductData[]>(
    [],
  );
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Get user location - but don't auto-select, user must click on map
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(loc);
          // Don't auto-select location - user must click on map
        },
        () => {
          // Fallback to İstanbul
          const loc = { lat: 41.0082, lng: 28.9784 };
          setUserLocation(loc);
          // Don't auto-select location - user must click on map
        },
      );
    } else {
      const loc = { lat: 41.0082, lng: 28.9784 };
      setUserLocation(loc);
      // Don't auto-select location - user must click on map
    }
  }, []);

  const handleLocationSelect = (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng });
  };

  const handleNextFromLocation = () => {
    if (!selectedLocation) {
      setError("Lütfen haritadan konum seçin. Haritaya tıklayarak dükkanınızın konumunu işaretleyin.");
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
    setStep("contact");
    setError("");
  };

  const handleNextFromContact = () => {
    if (!formData.phone || !formData.email) {
      setError("Lütfen telefon numarası ve e-posta adresi girin");
      return;
    }
    setStep("delivery");
    setError("");
  };

  const handleNextFromDelivery = () => {
    setStep("legal");
    setError("");
  };

  const handleNextFromLegal = () => {
    if (!formData.taxDocumentUrl || !formData.idDocumentUrl) {
      setError("Lütfen vergi levhası ve kimlik belgesi yükleyin");
      return;
    }
    setStep("financial");
    setError("");
  };

  const handleNextFromFinancial = () => {
    if (!formData.iban || !formData.accountHolder || !formData.taxNumber || !formData.taxOffice) {
      setError("Lütfen tüm finansal bilgileri doldurun");
      return;
    }
    setStep("menu");
    setError("");
  };

  const handleWorkingHoursChange = (day: string, field: "open" | "close", value: string) => {
    setFormData((prev) => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [day]: {
          ...(prev.workingHours[day] || { open: "09:00", close: "18:00" }),
          [field]: value,
        },
      },
    }));
  };

  const handleWorkingHoursToggle = (day: string, enabled: boolean) => {
    setFormData((prev) => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [day]: enabled ? { open: "09:00", close: "18:00" } : null,
      },
    }));
  };

  const handleTaxDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTaxDocumentFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, taxDocumentUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIdDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIdDocumentFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, idDocumentUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLicenseUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLicenseFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, licenseUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProductNameChange = (name: string) => {
    setNewItem({ ...newItem, name });

    // Otomatik ürün bulma - sadece ilgili kategori için
    if (name.trim().length > 2) {
      // Market kategorisi için ürün önerilerini devre dışı bırak (sadece restoran için)
      const shouldShowSuggestions = formData.category === "RESTORAN" || formData.category === "KUAFOR";
      
      if (shouldShowSuggestions) {
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
            imageUrl: product.imageUrl || newItem.imageUrl,
          });
          // Resim ve malzemeleri ekle
          if (editingItem) {
            setMenuItems(
              menuItems.map((i) =>
                i.id === editingItem.id
                  ? {
                      ...i,
                      imageUrl: product.imageUrl || i.imageUrl,
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
      imageUrl: product.imageUrl || newItem.imageUrl,
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
                imageUrl: product.imageUrl || i.imageUrl,
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
      imageUrl: newItem.imageUrl || product?.imageUrl,
      ingredients: product?.ingredients,
    };

    if (editingItem) {
      setMenuItems(menuItems.map((i) => (i.id === editingItem.id ? item : i)));
      setEditingItem(null);
    } else {
      setMenuItems([...menuItems, item]);
    }

    setNewItem({ name: "", description: "", price: "", imageUrl: "" });
    setItemImageFile(null);
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
          // İletişim Bilgileri
          phone: formData.phone,
          email: formData.email,
          whatsapp: formData.whatsapp || undefined,
          website: formData.website || undefined,
          // Çalışma Saatleri
          workingHoursJson: formData.workingHours,
          // Teslimat Bilgileri
          hasDelivery: formData.hasDelivery,
          minOrderAmount: formData.minOrderAmount ? parseFloat(formData.minOrderAmount) : null,
          deliveryRadius: formData.deliveryRadius ? parseFloat(formData.deliveryRadius) : null,
          deliveryFee: formData.deliveryFee ? parseFloat(formData.deliveryFee) : null,
          deliveryTime: formData.deliveryTime ? parseInt(formData.deliveryTime) : null,
          freeDeliveryThreshold: formData.freeDeliveryThreshold ? parseFloat(formData.freeDeliveryThreshold) : null,
          // Yasal Belgeler
          taxDocumentUrl: formData.taxDocumentUrl || undefined,
          idDocumentUrl: formData.idDocumentUrl || undefined,
          licenseUrl: formData.licenseUrl || undefined,
          // Finansal Bilgiler
          iban: formData.iban || undefined,
          accountHolder: formData.accountHolder || undefined,
          bankName: formData.bankName || undefined,
          taxNumber: formData.taxNumber || undefined,
          taxOffice: formData.taxOffice || undefined,
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

                  {selectedLocation ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-sm text-green-900">
                        <strong>✓ Konum Seçildi:</strong>{" "}
                        {selectedLocation.lat.toFixed(6)},{" "}
                        {selectedLocation.lng.toFixed(6)}
                      </p>
                      <p className="text-xs text-green-700 mt-1">
                        Haritada dükkanınızın konumu işaretlendi. Devam edebilirsiniz.
                      </p>
                    </div>
                  ) : (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="text-sm text-yellow-900">
                        <strong>⚠ Konum Seçilmedi</strong>
                      </p>
                      <p className="text-xs text-yellow-700 mt-1">
                        Lütfen haritaya tıklayarak dükkanınızın konumunu seçin.
                      </p>
                    </div>
                  )}

                  <Button
                    onClick={handleNextFromLocation}
                    className="w-full"
                    disabled={!selectedLocation}
                  >
                    {selectedLocation ? (
                      <>
                        Devam Et <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    ) : (
                      "Konum Seçin (Zorunlu)"
                    )}
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

                  <div className="space-y-2">
                    <Label>Dükkan Resmi / Logo</Label>
                    <div className="flex items-center gap-4">
                      {formData.coverImageUrl ? (
                        <div className="relative">
                          <img
                            src={formData.coverImageUrl}
                            alt="Dükkan resmi"
                            className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, coverImageUrl: "" });
                              setCoverImageFile(null);
                              if (coverImageInputRef.current) {
                                coverImageInputRef.current.value = "";
                              }
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                          <ImageIcon className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                      <div>
                        <input
                          ref={coverImageInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleCoverImageUpload}
                          className="hidden"
                          id="coverImage"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => coverImageInputRef.current?.click()}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Resim Yükle
                        </Button>
                        <p className="text-xs text-gray-500 mt-1">
                          Dükkanınızın resmi veya logosu
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Çalışma Saatleri
                    </Label>
                    <div className="border rounded-lg p-4 space-y-3">
                      {[
                        { key: "mon", label: "Pazartesi" },
                        { key: "tue", label: "Salı" },
                        { key: "wed", label: "Çarşamba" },
                        { key: "thu", label: "Perşembe" },
                        { key: "fri", label: "Cuma" },
                        { key: "sat", label: "Cumartesi" },
                        { key: "sun", label: "Pazar" },
                      ].map((day) => {
                        const dayData = formData.workingHours[day.key];
                        const isEnabled = dayData !== null && dayData !== undefined;
                        
                        return (
                          <div key={day.key} className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={isEnabled}
                              onChange={(e) => handleWorkingHoursToggle(day.key, e.target.checked)}
                              className="w-4 h-4"
                            />
                            <Label className="w-24 flex-shrink-0">{day.label}</Label>
                            {isEnabled ? (
                              <div className="flex items-center gap-2 flex-1">
                                <Input
                                  type="time"
                                  value={dayData?.open || "09:00"}
                                  onChange={(e) => handleWorkingHoursChange(day.key, "open", e.target.value)}
                                  className="flex-1"
                                />
                                <span>-</span>
                                <Input
                                  type="time"
                                  value={dayData?.close || "18:00"}
                                  onChange={(e) => handleWorkingHoursChange(day.key, "close", e.target.value)}
                                  className="flex-1"
                                />
                              </div>
                            ) : (
                              <span className="text-sm text-gray-500">Kapalı</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
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

            {step === "contact" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    3. İletişim Bilgileri
                  </CardTitle>
                  <CardDescription>
                    Müşterilerin sizinle iletişime geçebilmesi için iletişim bilgilerinizi girin
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon Numarası *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="05XX XXX XX XX"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-posta Adresi *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="ornek@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">WhatsApp Numarası</Label>
                    <Input
                      id="whatsapp"
                      type="tel"
                      placeholder="05XX XXX XX XX (Opsiyonel)"
                      value={formData.whatsapp}
                      onChange={(e) =>
                        setFormData({ ...formData, whatsapp: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Web Sitesi</Label>
                    <Input
                      id="website"
                      type="url"
                      placeholder="https://www.ornek.com (Opsiyonel)"
                      value={formData.website}
                      onChange={(e) =>
                        setFormData({ ...formData, website: e.target.value })
                      }
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setStep("info")}
                      className="flex-1"
                    >
                      Geri
                    </Button>
                    <Button onClick={handleNextFromContact} className="flex-1">
                      Devam Et <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === "delivery" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    4. Teslimat Bilgileri
                  </CardTitle>
                  <CardDescription>
                    Teslimat hizmeti sunuyorsanız bilgilerinizi girin
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="hasDelivery"
                        checked={formData.hasDelivery}
                        onChange={(e) =>
                          setFormData({ ...formData, hasDelivery: e.target.checked })
                        }
                        className="w-4 h-4"
                      />
                      <Label htmlFor="hasDelivery">Teslimat hizmeti sunuyorum</Label>
                    </div>
                  </div>

                  {formData.hasDelivery && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="minOrderAmount">Minimum Sipariş Tutarı (₺)</Label>
                        <Input
                          id="minOrderAmount"
                          type="number"
                          placeholder="0.00"
                          value={formData.minOrderAmount}
                          onChange={(e) =>
                            setFormData({ ...formData, minOrderAmount: e.target.value })
                          }
                          step="0.01"
                          min="0"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="deliveryRadius">Teslimat Yarıçapı (km)</Label>
                        <Input
                          id="deliveryRadius"
                          type="number"
                          placeholder="5"
                          value={formData.deliveryRadius}
                          onChange={(e) =>
                            setFormData({ ...formData, deliveryRadius: e.target.value })
                          }
                          step="0.1"
                          min="0"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="deliveryFee">Teslimat Ücreti (₺)</Label>
                        <Input
                          id="deliveryFee"
                          type="number"
                          placeholder="0.00"
                          value={formData.deliveryFee}
                          onChange={(e) =>
                            setFormData({ ...formData, deliveryFee: e.target.value })
                          }
                          step="0.01"
                          min="0"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="freeDeliveryThreshold">Ücretsiz Teslimat Eşiği (₺)</Label>
                        <Input
                          id="freeDeliveryThreshold"
                          type="number"
                          placeholder="100.00"
                          value={formData.freeDeliveryThreshold}
                          onChange={(e) =>
                            setFormData({ ...formData, freeDeliveryThreshold: e.target.value })
                          }
                          step="0.01"
                          min="0"
                        />
                        <p className="text-xs text-gray-500">
                          Bu tutarın üzerindeki siparişlerde teslimat ücretsiz olur
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="deliveryTime">Ortalama Teslimat Süresi (dakika)</Label>
                        <Input
                          id="deliveryTime"
                          type="number"
                          placeholder="30"
                          value={formData.deliveryTime}
                          onChange={(e) =>
                            setFormData({ ...formData, deliveryTime: e.target.value })
                          }
                          min="0"
                        />
                      </div>
                    </>
                  )}

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setStep("contact")}
                      className="flex-1"
                    >
                      Geri
                    </Button>
                    <Button onClick={handleNextFromDelivery} className="flex-1">
                      Devam Et <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === "legal" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    5. Yasal Belgeler
                  </CardTitle>
                  <CardDescription>
                    Yasal belgelerinizi yükleyin. Bu belgeler doğrulama için gereklidir.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Vergi Levhası *</Label>
                    <div className="flex items-center gap-4">
                      {formData.taxDocumentUrl ? (
                        <div className="relative">
                          <img
                            src={formData.taxDocumentUrl}
                            alt="Vergi levhası"
                            className="w-32 h-40 object-cover rounded-lg border-2 border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, taxDocumentUrl: "" });
                              setTaxDocumentFile(null);
                              if (taxDocumentInputRef.current) {
                                taxDocumentInputRef.current.value = "";
                              }
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="w-32 h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                          <FileText className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                      <div>
                        <input
                          ref={taxDocumentInputRef}
                          type="file"
                          accept="image/*,.pdf"
                          onChange={handleTaxDocumentUpload}
                          className="hidden"
                          id="taxDocument"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => taxDocumentInputRef.current?.click()}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Vergi Levhası Yükle
                        </Button>
                        <p className="text-xs text-gray-500 mt-1">
                          JPG, PNG veya PDF formatında
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Kimlik Belgesi *</Label>
                    <div className="flex items-center gap-4">
                      {formData.idDocumentUrl ? (
                        <div className="relative">
                          <img
                            src={formData.idDocumentUrl}
                            alt="Kimlik belgesi"
                            className="w-32 h-40 object-cover rounded-lg border-2 border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, idDocumentUrl: "" });
                              setIdDocumentFile(null);
                              if (idDocumentInputRef.current) {
                                idDocumentInputRef.current.value = "";
                              }
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="w-32 h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                          <FileText className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                      <div>
                        <input
                          ref={idDocumentInputRef}
                          type="file"
                          accept="image/*,.pdf"
                          onChange={handleIdDocumentUpload}
                          className="hidden"
                          id="idDocument"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => idDocumentInputRef.current?.click()}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Kimlik Belgesi Yükle
                        </Button>
                        <p className="text-xs text-gray-500 mt-1">
                          Kimlik ön yüz görseli
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>İşletme Ruhsatı (Opsiyonel)</Label>
                    <div className="flex items-center gap-4">
                      {formData.licenseUrl ? (
                        <div className="relative">
                          <img
                            src={formData.licenseUrl}
                            alt="İşletme ruhsatı"
                            className="w-32 h-40 object-cover rounded-lg border-2 border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, licenseUrl: "" });
                              setLicenseFile(null);
                              if (licenseInputRef.current) {
                                licenseInputRef.current.value = "";
                              }
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="w-32 h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                          <FileText className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                      <div>
                        <input
                          ref={licenseInputRef}
                          type="file"
                          accept="image/*,.pdf"
                          onChange={handleLicenseUpload}
                          className="hidden"
                          id="license"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => licenseInputRef.current?.click()}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Ruhsat Yükle
                        </Button>
                        <p className="text-xs text-gray-500 mt-1">
                          Varsa işletme ruhsatı
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setStep("delivery")}
                      className="flex-1"
                    >
                      Geri
                    </Button>
                    <Button onClick={handleNextFromLegal} className="flex-1">
                      Devam Et <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === "financial" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    6. Finansal Bilgiler
                  </CardTitle>
                  <CardDescription>
                    Ödemelerin yapılacağı banka hesap bilgilerinizi girin
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="iban">IBAN *</Label>
                    <Input
                      id="iban"
                      placeholder="TR00 0000 0000 0000 0000 0000 00"
                      value={formData.iban}
                      onChange={(e) =>
                        setFormData({ ...formData, iban: e.target.value.toUpperCase() })
                      }
                      required
                    />
                    <p className="text-xs text-gray-500">
                      Ödemelerin yapılacağı IBAN numarası
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accountHolder">Hesap Sahibi Adı *</Label>
                    <Input
                      id="accountHolder"
                      placeholder="Ad Soyad veya Şirket Unvanı"
                      value={formData.accountHolder}
                      onChange={(e) =>
                        setFormData({ ...formData, accountHolder: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bankName">Banka Adı</Label>
                    <Input
                      id="bankName"
                      placeholder="Örn: Ziraat Bankası"
                      value={formData.bankName}
                      onChange={(e) =>
                        setFormData({ ...formData, bankName: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="taxNumber">Vergi Numarası *</Label>
                    <Input
                      id="taxNumber"
                      placeholder="10 haneli vergi numarası"
                      value={formData.taxNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, taxNumber: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="taxOffice">Vergi Dairesi *</Label>
                    <Input
                      id="taxOffice"
                      placeholder="Örn: Kadıköy Vergi Dairesi"
                      value={formData.taxOffice}
                      onChange={(e) =>
                        setFormData({ ...formData, taxOffice: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setStep("legal")}
                      className="flex-1"
                    >
                      Geri
                    </Button>
                    <Button onClick={handleNextFromFinancial} className="flex-1">
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
                    <div className="space-y-2">
                      <Label>Ürün Resmi</Label>
                      <div className="flex items-center gap-4">
                        {newItem.imageUrl ? (
                          <div className="relative">
                            <img
                              src={newItem.imageUrl}
                              alt="Ürün resmi"
                              className="w-24 h-24 object-cover rounded-lg border-2 border-gray-200"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setNewItem({ ...newItem, imageUrl: "" });
                                setItemImageFile(null);
                                if (itemImageInputRef.current) {
                                  itemImageInputRef.current.value = "";
                                }
                              }}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                            <ImageIcon className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                        <div>
                          <input
                            ref={itemImageInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleItemImageUpload}
                            className="hidden"
                            id="itemImage"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => itemImageInputRef.current?.click()}
                          >
                            <Upload className="w-3 h-3 mr-2" />
                            Resim Yükle
                          </Button>
                        </div>
                      </div>
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
                              imageUrl: "",
                            });
                            setItemImageFile(null);
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
                  <LeafletMapRegister
                    center={[userLocation.lat, userLocation.lng]}
                    zoom={13}
                    selectedLocation={selectedLocation}
                    onLocationSelect={handleLocationSelect}
                    businessLogo={formData.coverImageUrl}
                    businessName={formData.name}
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
