"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/lib/hooks/useToast";
import { Briefcase, CheckCircle2, Clock, HelpCircle, Mail, MessageSquare, ShoppingBag } from "lucide-react";



// Static generation'ı engelle
interface InboxItem {
  id: string;
  type: "support" | "order" | "job" | "lead";
  title: string;
  preview: string;
  sender?: string;
  unread: boolean;
  createdAt: string;
  status?: string;
  category?: string;
}

export default function InboxPageClient() {
  const router = useRouter();
  const { error } = useToast();
  const [items, setItems] = useState<InboxItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<
    "all" | "support" | "orders" | "jobs" | "unread"
  >("all");

  const loadInbox = useCallback(async () => {
    try {
      const res = await fetch(`/api/inbox?filter=${filter}`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
      }
    } catch (err) {
      error("Mesajlar yüklenemedi");
    } finally {
      setLoading(false);
    }
  }, [filter, error]);

  useEffect(() => {
    loadInbox();
    // Her 30 saniyede bir güncelle
    const interval = setInterval(loadInbox, 30000);
    return () => clearInterval(interval);
  }, [loadInbox]);

  const getIcon = (type: string) => {
    switch (type) {
      case "support":
        return <HelpCircle className="w-5 h-5" />;
      case "order":
        return <ShoppingBag className="w-5 h-5" />;
      case "job":
      case "lead":
        return <Briefcase className="w-5 h-5" />;
      default:
        return <MessageSquare className="w-5 h-5" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "support":
        return "Destek";
      case "order":
        return "Sipariş";
      case "job":
        return "İş Teklifi";
      case "lead":
        return "Lead";
      default:
        return "Mesaj";
    }
  };

  const handleItemClick = (item: InboxItem) => {
    if (item.type === "support") {
      router.push(`/inbox/support/${item.id}`);
    } else if (item.type === "order") {
      router.push(`/orders/${item.id}/chat`);
    } else if (item.type === "job" || item.type === "lead") {
      router.push(`/jobs/${item.id}`);
    }
  };

  const filteredItems = items.filter((item) => {
    if (filter === "unread") return item.unread;
    if (filter === "all") return true;
    return item.type === filter.slice(0, -1); // 'orders' -> 'order'
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gelen Kutusu
          </h1>
          <p className="text-gray-600">
            Tüm mesajlarınızı buradan görüntüleyebilirsiniz
          </p>
        </div>

        {/* Filtreler */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            Tümü
          </Button>
          <Button
            variant={filter === "support" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("support")}
          >
            <HelpCircle className="w-4 h-4 mr-2" />
            Destek
          </Button>
          <Button
            variant={filter === "orders" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("orders")}
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            Siparişler
          </Button>
          <Button
            variant={filter === "jobs" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("jobs")}
          >
            <Briefcase className="w-4 h-4 mr-2" />
            Teklifler
          </Button>
          <Button
            variant={filter === "unread" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("unread")}
          >
            <Mail className="w-4 h-4 mr-2" />
            Okunmamış
            {items.filter((i) => i.unread).length > 0 && (
              <Badge className="ml-2 bg-[#FF6000]">
                {items.filter((i) => i.unread).length}
              </Badge>
            )}
          </Button>
        </div>

        {/* Liste */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF6000]"></div>
            <p className="mt-4 text-gray-500">Yükleniyor...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <Card className="p-12 text-center">
            <MessageSquare className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Mesaj yok
            </h3>
            <p className="text-gray-600">
              {filter === "unread"
                ? "Okunmamış mesajınız yok"
                : "Henüz mesajınız bulunmuyor"}
            </p>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className={`p-4 cursor-pointer hover:shadow-md transition-shadow ${
                  item.unread
                    ? "border-l-4 border-l-[#FF6000] bg-orange-50/50"
                    : ""
                }`}
                onClick={() => handleItemClick(item)}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-2 rounded-lg ${
                      item.type === "support"
                        ? "bg-blue-100 text-blue-600"
                        : item.type === "order"
                          ? "bg-green-100 text-green-600"
                          : "bg-purple-100 text-purple-600"
                    }`}
                  >
                    {getIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3
                            className={`font-semibold text-gray-900 ${item.unread ? "font-bold" : ""}`}
                          >
                            {item.title}
                          </h3>
                          {item.unread && (
                            <Badge
                              variant="outline"
                              className="bg-[#FF6000] text-white border-0"
                            >
                              Yeni
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {item.preview}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                      <Badge variant="outline" className="text-xs">
                        {getTypeLabel(item.type)}
                      </Badge>
                      {item.category && (
                        <Badge variant="outline" className="text-xs">
                          {item.category}
                        </Badge>
                      )}
                      {item.status && (
                        <div className="flex items-center gap-1">
                          {item.status === "resolved" ||
                          item.status === "closed" ? (
                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                          ) : (
                            <Clock className="w-3 h-3 text-orange-600" />
                          )}
                          <span className="capitalize">{item.status}</span>
                        </div>
                      )}
                      <span>
                        {new Date(item.createdAt).toLocaleDateString("tr-TR")}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
