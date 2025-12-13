# Hizmetgo Production AAB Build Script
# Google Play Store için Android App Bundle (AAB) oluşturur

Write-Host "🚀 Hizmetgo Production AAB Build Başlatılıyor..." -ForegroundColor Cyan
Write-Host ""

# Önce hazırlık kontrolü yap
Write-Host "🔍 Hazırlık kontrolü yapılıyor..." -ForegroundColor Cyan
& "$PSScriptRoot\check-build-ready.ps1"
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "❌ Hazırlık kontrolü başarısız! Lütfen hataları düzeltin." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "🔨 PRODUCTION BUILD BAŞLATILIYOR" -ForegroundColor Cyan
Write-Host "════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Mobile klasörüne geç
Set-Location $PSScriptRoot

# app.json'dan bilgileri oku
$appJson = Get-Content "app.json" -Raw | ConvertFrom-Json
$version = $appJson.expo.version
$versionCode = $appJson.expo.android.versionCode
$packageName = $appJson.expo.android.package

Write-Host "📱 App Bilgileri:" -ForegroundColor Cyan
Write-Host "   Name: $($appJson.expo.name)" -ForegroundColor White
Write-Host "   Version: $version" -ForegroundColor White
Write-Host "   Version Code: $versionCode" -ForegroundColor White
Write-Host "   Package: $packageName" -ForegroundColor White
Write-Host ""

Write-Host "📦 Build Ayarları:" -ForegroundColor Cyan
Write-Host "   Platform: Android" -ForegroundColor White
Write-Host "   Build Type: app-bundle (AAB)" -ForegroundColor White
Write-Host "   Profile: production" -ForegroundColor White
Write-Host "   API URL: https://hizmetgo.app" -ForegroundColor White
Write-Host ""

Write-Host "⏳ Build başlatılıyor..." -ForegroundColor Yellow
Write-Host "   (Bu işlem 5-30 dakika sürebilir)" -ForegroundColor Yellow
Write-Host ""

# Production build başlat
try {
    eas build --profile production --platform android --non-interactive
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "════════════════════════════════════════" -ForegroundColor Green
        Write-Host "✅ BUILD BAŞARIYLA BAŞLATILDI!" -ForegroundColor Green
        Write-Host "════════════════════════════════════════" -ForegroundColor Green
        Write-Host ""
        Write-Host "📊 Build durumunu kontrol etmek için:" -ForegroundColor Cyan
        Write-Host "   eas build:list" -ForegroundColor White
        Write-Host ""
        Write-Host "🔗 Build URL'si yukarıda gösterilmiştir." -ForegroundColor Cyan
        Write-Host ""
        Write-Host "📝 Sonraki Adımlar:" -ForegroundColor Yellow
        Write-Host "   1. Build tamamlanmasını bekleyin (5-30 dakika)" -ForegroundColor White
        Write-Host "   2. Build tamamlandığında AAB dosyası indirilebilir olacak" -ForegroundColor White
        Write-Host "   3. Google Play Console'a yüklemek için:" -ForegroundColor White
        Write-Host "      eas submit --profile production --platform android" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "   VEYA manuel olarak:" -ForegroundColor White
        Write-Host "   1. https://expo.dev adresinden build sayfasına gidin" -ForegroundColor White
        Write-Host "   2. Build'in yanındaki 'Download' butonuna tıklayın" -ForegroundColor White
        Write-Host "   3. İndirdiğiniz .aab dosyasını Google Play Console'a yükleyin" -ForegroundColor White
        Write-Host ""
    } else {
        Write-Host ""
        Write-Host "❌ Build başlatılamadı!" -ForegroundColor Red
        Write-Host "   Lütfen hata mesajlarını kontrol edin." -ForegroundColor Yellow
        exit 1
    }
} catch {
    Write-Host ""
    Write-Host "❌ Build sırasında hata oluştu!" -ForegroundColor Red
    Write-Host "   Hata: $_" -ForegroundColor Red
    exit 1
}

