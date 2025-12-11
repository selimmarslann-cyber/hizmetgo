# Hizmetgo AAB Build Script (PowerShell)
# Google Play Store için Android App Bundle (AAB) oluşturur

Write-Host "🚀 Hizmetgo AAB Build Başlatılıyor..." -ForegroundColor Cyan
Write-Host ""

# EAS CLI kontrolü
$easInstalled = Get-Command eas -ErrorAction SilentlyContinue
if (-not $easInstalled) {
    Write-Host "❌ EAS CLI bulunamadı!" -ForegroundColor Red
    Write-Host "📦 Yükleniyor: npm install -g eas-cli" -ForegroundColor Yellow
    npm install -g eas-cli
}

# EAS login kontrolü
Write-Host "🔐 EAS hesabı kontrol ediliyor..." -ForegroundColor Cyan
try {
    $whoami = eas whoami 2>&1
    if ($LASTEXITCODE -ne 0) {
        throw "Not logged in"
    }
} catch {
    Write-Host "⚠️  EAS hesabına giriş yapılmamış!" -ForegroundColor Yellow
    Write-Host "🔑 Lütfen giriş yapın: eas login" -ForegroundColor Yellow
    exit 1
}

# Mobile klasörüne geç
Set-Location $PSScriptRoot

# app.json kontrolü
if (-not (Test-Path "app.json")) {
    Write-Host "❌ app.json bulunamadı!" -ForegroundColor Red
    exit 1
}

# EAS Project ID kontrolü
$appJson = Get-Content "app.json" -Raw | ConvertFrom-Json
$projectId = $appJson.expo.extra.eas.projectId

if ([string]::IsNullOrEmpty($projectId) -or $projectId -eq "REPLACE_WITH_EAS_PROJECT_ID") {
    Write-Host "⚠️  EAS Project ID bulunamadı veya placeholder!" -ForegroundColor Yellow
    Write-Host "🔧 EAS projesi oluşturuluyor..." -ForegroundColor Cyan
    eas init --id
    Write-Host "✅ EAS projesi oluşturuldu. app.json'u kontrol edin." -ForegroundColor Green
}

# Assets kontrolü
Write-Host "📦 Assets kontrol ediliyor..." -ForegroundColor Cyan
$missingAssets = @()

if (-not (Test-Path "assets/icon.png")) {
    Write-Host "⚠️  assets/icon.png bulunamadı!" -ForegroundColor Yellow
    $missingAssets += "icon.png"
}

if (-not (Test-Path "assets/splash.png")) {
    Write-Host "⚠️  assets/splash.png bulunamadı!" -ForegroundColor Yellow
    $missingAssets += "splash.png"
}

if (-not (Test-Path "assets/adaptive-icon.png")) {
    Write-Host "⚠️  assets/adaptive-icon.png bulunamadı!" -ForegroundColor Yellow
    $missingAssets += "adaptive-icon.png"
}

if ($missingAssets.Count -gt 0) {
    Write-Host "❌ Bazı assets dosyaları eksik!" -ForegroundColor Red
    Write-Host "📖 Lütfen STORE_PUBLICATION_GUIDE.md dosyasına bakın." -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Tüm assets dosyaları mevcut." -ForegroundColor Green
Write-Host ""

# Version kontrolü
$version = $appJson.expo.version
$versionCode = $appJson.expo.android.versionCode
Write-Host "📱 Mevcut Versiyon: $version (Code: $versionCode)" -ForegroundColor Cyan
Write-Host ""

# Build başlat
Write-Host "🔨 Production AAB build başlatılıyor..." -ForegroundColor Cyan
Write-Host "📦 Build Type: app-bundle (AAB)" -ForegroundColor Cyan
Write-Host "🌐 API URL: https://hizmetgo.app" -ForegroundColor Cyan
Write-Host ""

eas build --profile production --platform android --non-interactive

Write-Host ""
Write-Host "✅ Build başlatıldı!" -ForegroundColor Green
Write-Host "📊 Build durumunu kontrol etmek için: eas build:list" -ForegroundColor Cyan
Write-Host "🔗 Build URL'si yukarıda gösterilecektir." -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 Sonraki Adımlar:" -ForegroundColor Yellow
Write-Host "1. Build tamamlanmasını bekleyin (5-30 dakika)" -ForegroundColor White
Write-Host "2. Build tamamlandığında AAB dosyası indirilebilir olacak" -ForegroundColor White
Write-Host "3. Google Play Console'a yüklemek için: eas submit --profile production --platform android" -ForegroundColor White
Write-Host ""

