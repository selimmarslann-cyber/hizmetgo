#!/bin/bash

# Hizmetgo AAB Build Script
# Google Play Store için Android App Bundle (AAB) oluşturur

set -e

echo "🚀 Hizmetgo AAB Build Başlatılıyor..."
echo ""

# EAS CLI kontrolü
if ! command -v eas &> /dev/null; then
    echo "❌ EAS CLI bulunamadı!"
    echo "📦 Yükleniyor: npm install -g eas-cli"
    npm install -g eas-cli
fi

# EAS login kontrolü
echo "🔐 EAS hesabı kontrol ediliyor..."
if ! eas whoami &> /dev/null; then
    echo "⚠️  EAS hesabına giriş yapılmamış!"
    echo "🔑 Lütfen giriş yapın: eas login"
    exit 1
fi

# Mobile klasörüne geç
cd "$(dirname "$0")"

# app.json kontrolü
if [ ! -f "app.json" ]; then
    echo "❌ app.json bulunamadı!"
    exit 1
fi

# EAS Project ID kontrolü
PROJECT_ID=$(grep -o '"projectId": "[^"]*"' app.json | cut -d'"' -f4)
if [ -z "$PROJECT_ID" ] || [ "$PROJECT_ID" = "REPLACE_WITH_EAS_PROJECT_ID" ]; then
    echo "⚠️  EAS Project ID bulunamadı veya placeholder!"
    echo "🔧 EAS projesi oluşturuluyor..."
    eas init --id
    echo "✅ EAS projesi oluşturuldu. app.json'u kontrol edin."
fi

# Assets kontrolü
echo "📦 Assets kontrol ediliyor..."
MISSING_ASSETS=0

if [ ! -f "assets/icon.png" ]; then
    echo "⚠️  assets/icon.png bulunamadı!"
    MISSING_ASSETS=1
fi

if [ ! -f "assets/splash.png" ]; then
    echo "⚠️  assets/splash.png bulunamadı!"
    MISSING_ASSETS=1
fi

if [ ! -f "assets/adaptive-icon.png" ]; then
    echo "⚠️  assets/adaptive-icon.png bulunamadı!"
    MISSING_ASSETS=1
fi

if [ $MISSING_ASSETS -eq 1 ]; then
    echo "❌ Bazı assets dosyaları eksik!"
    echo "📖 Lütfen STORE_PUBLICATION_GUIDE.md dosyasına bakın."
    exit 1
fi

echo "✅ Tüm assets dosyaları mevcut."
echo ""

# Version kontrolü
VERSION=$(grep -o '"version": "[^"]*"' app.json | cut -d'"' -f4)
VERSION_CODE=$(grep -o '"versionCode": [0-9]*' app.json | grep -o '[0-9]*')
echo "📱 Mevcut Versiyon: $VERSION (Code: $VERSION_CODE)"
echo ""

# Build başlat
echo "🔨 Production AAB build başlatılıyor..."
echo "📦 Build Type: app-bundle (AAB)"
echo "🌐 API URL: https://hizmetgo.app"
echo ""

eas build --profile production --platform android --non-interactive

echo ""
echo "✅ Build başlatıldı!"
echo "📊 Build durumunu kontrol etmek için: eas build:list"
echo "🔗 Build URL'si yukarıda gösterilecektir."
echo ""
echo "📝 Sonraki Adımlar:"
echo "1. Build tamamlanmasını bekleyin (5-30 dakika)"
echo "2. Build tamamlandığında AAB dosyası indirilebilir olacak"
echo "3. Google Play Console'a yüklemek için: eas submit --profile production --platform android"
echo ""

