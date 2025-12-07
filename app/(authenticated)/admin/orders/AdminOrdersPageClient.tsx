"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar, DollarSign, Search, ShoppingCart } from "lucide-react";



// Static generation'ı engelle
export default function AdminOrdersPageClient() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const res = await fetch("/api/admin/orders", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
      }
    } catch (err) {
      console.error("Orders load error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-700";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-700";
      case "ACCEPTED":
        return "bg-yellow-100 text-yellow-700";
      case "CANCELLED_BY_CUSTOMER":
      case "CANCELLED_BY_PROVIDER":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer?.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-[#FF6000] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Siparişler</h2>
        <p className="text-gray-600 mt-1">
          Tüm siparişleri görüntüleyin ve yönetin
        </p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Sipariş ara (ID, müşteri adı)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Sipariş Listesi ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Sipariş ID
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Müşteri
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    İşletme
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Tutar
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Durum
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Tarih
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 font-mono text-sm">
                      {order.id.substring(0, 8)}...
                    </td>
                    <td className="py-3 px-4">
                      {order.customer?.name || "İsimsiz"}
                    </td>
                    <td className="py-3 px-4">{order.business?.name || "-"}</td>
                    <td className="py-3 px-4 font-semibold">
                      {Number(order.totalAmount).toFixed(2)} ₺
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString("tr-TR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
