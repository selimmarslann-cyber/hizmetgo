"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Database, Settings, Shield } from "lucide-react";



// Static generation'ı engelle
export default function AdminSettingsPageClient() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Ayarlar</h2>
        <p className="text-gray-600 mt-1">Sistem ayarlarını yönetin</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-[#FF6000]" />
              <CardTitle>Güvenlik Ayarları</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Güvenlik ayarları yakında eklenecek...
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-[#FF6000]" />
              <CardTitle>Bildirim Ayarları</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Bildirim ayarları yakında eklenecek...
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-[#FF6000]" />
              <CardTitle>Veritabanı Yönetimi</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Veritabanı yönetimi yakında eklenecek...
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-[#FF6000]" />
              <CardTitle>Genel Ayarlar</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Genel ayarlar yakında eklenecek...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
