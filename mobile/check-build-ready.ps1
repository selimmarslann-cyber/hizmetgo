# Hizmetgo AAB Build Hazırlık Kontrol Script
# Bu script, AAB build yapmadan önce tüm gereksinimlerin karşılandığını kontrol eder

Write-Host "🔍 Hizmetgo AAB Build Hazırlık Kontrolü Başlatılıyor..." -ForegroundColor Cyan
Write-Host ""

$errors = 0
$warnings = 0

# 1. EAS CLI kontrolü
Write-Host "1️⃣ EAS CLI kontrol ediliyor..." -ForegroundColor Cyan
$easInstalled = Get-Command eas -ErrorAction SilentlyContinue
if (-not $easInstalled) {
    Write-Host "   ❌ EAS CLI bulunamadı!" -ForegroundColor Red
    Write-Host "   💡 Çözüm: npm install -g eas-cli" -ForegroundColor Yellow
    $errors++
} else {
    Write-Host "   ✅ EAS CLI yüklü" -ForegroundColor Green
}

# 2. EAS login kontrolü
Write-Host "2️⃣ EAS hesabı kontrol ediliyor..." -ForegroundColor Cyan
try {
    $whoami = eas whoami 2>&1
    if ($LASTEXITCODE -ne 0) {
        throw "Not logged in"
    }
    Write-Host "   ✅ EAS hesabına giriş yapılmış" -ForegroundColor Green
} catch {
    Write-Host "   ❌ EAS hesabına giriş yapılmamış!" -ForegroundColor Red
    Write-Host "   💡 Çözüm: eas login" -ForegroundColor Yellow
    $errors++
}

# 3. Mobile klasörüne geç
Set-Location $PSScriptRoot

# 4. app.json kontrolü
Write-Host "3️⃣ app.json kontrol ediliyor..." -ForegroundColor Cyan
if (-not (Test-Path "app.json")) {
    Write-Host "   ❌ app.json bulunamadı!" -ForegroundColor Red
    $errors++
} else {
    Write-Host "   ✅ app.json mevcut" -ForegroundColor Green
    
    # app.json içeriğini oku
    $appJson = Get-Content "app.json" -Raw | ConvertFrom-Json
    
    # EAS Project ID kontrolü
    $projectId = $appJson.expo.extra.eas.projectId
    if ([string]::IsNullOrEmpty($projectId) -or $projectId -eq "REPLACE_WITH_EAS_PROJECT_ID") {
        Write-Host "   ⚠️  EAS Project ID bulunamadı veya placeholder!" -ForegroundColor Yellow
        Write-Host "   💡 Çözüm: eas init (veya app.json'da projectId'yi güncelle)" -ForegroundColor Yellow
        $warnings++
    } else {
        Write-Host "   ✅ EAS Project ID: $projectId" -ForegroundColor Green
    }
    
    # Version kontrolü
    $version = $appJson.expo.version
    $versionCode = $appJson.expo.android.versionCode
    Write-Host "   📱 Versiyon: $version (Code: $versionCode)" -ForegroundColor Cyan
    
    # Package name kontrolü
    $packageName = $appJson.expo.android.package
    if ($packageName -eq "com.hizmetgo.app") {
        Write-Host "   ✅ Package name: $packageName" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  Package name: $packageName (beklenen: com.hizmetgo.app)" -ForegroundColor Yellow
        $warnings++
    }
}

# 5. Assets kontrolü
Write-Host "4️⃣ Assets dosyaları kontrol ediliyor..." -ForegroundColor Cyan
$requiredAssets = @(
    @{Name="icon.png"; Size="1024x1024"},
    @{Name="splash.png"; Size="1284x2778"},
    @{Name="adaptive-icon.png"; Size="1024x1024"},
    @{Name="notification-icon.png"; Size="96x96"},
    @{Name="favicon.png"; Size="48x48"}
)

$missingAssets = @()
foreach ($asset in $requiredAssets) {
    $assetPath = "assets\$($asset.Name)"
    if (-not (Test-Path $assetPath)) {
        Write-Host "   ❌ $($asset.Name) bulunamadı! (Gerekli boyut: $($asset.Size))" -ForegroundColor Red
        $missingAssets += $asset.Name
        $errors++
    } else {
        Write-Host "   ✅ $($asset.Name) mevcut" -ForegroundColor Green
    }
}

# 6. eas.json kontrolü
Write-Host "5️⃣ eas.json kontrol ediliyor..." -ForegroundColor Cyan
if (-not (Test-Path "eas.json")) {
    Write-Host "   ⚠️  eas.json bulunamadı!" -ForegroundColor Yellow
    Write-Host "   💡 Çözüm: eas init (veya eas.json oluştur)" -ForegroundColor Yellow
    $warnings++
} else {
    Write-Host "   ✅ eas.json mevcut" -ForegroundColor Green
}

# 7. Özet
Write-Host ""
Write-Host "════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "📊 KONTROL ÖZETİ" -ForegroundColor Cyan
Write-Host "════════════════════════════════════════" -ForegroundColor Cyan

if ($errors -eq 0 -and $warnings -eq 0) {
    Write-Host "✅ Tüm kontroller başarılı! Build yapmaya hazırsınız." -ForegroundColor Green
    Write-Host ""
    Write-Host "🚀 Build başlatmak için:" -ForegroundColor Cyan
    Write-Host "   .\build-aab-production.ps1" -ForegroundColor White
    exit 0
} elseif ($errors -eq 0) {
    Write-Host "⚠️  Bazı uyarılar var, ancak build yapılabilir." -ForegroundColor Yellow
    Write-Host "   Uyarı sayısı: $warnings" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "🚀 Build başlatmak için:" -ForegroundColor Cyan
    Write-Host "   .\build-aab-production.ps1" -ForegroundColor White
    exit 0
} else {
    Write-Host "❌ Build yapılamaz! Lütfen hataları düzeltin." -ForegroundColor Red
    Write-Host "   Hata sayısı: $errors" -ForegroundColor Red
    if ($warnings -gt 0) {
        Write-Host "   Uyarı sayısı: $warnings" -ForegroundColor Yellow
    }
    Write-Host ""
    if ($missingAssets.Count -gt 0) {
        Write-Host "📦 Eksik assets dosyaları:" -ForegroundColor Yellow
        foreach ($asset in $missingAssets) {
            Write-Host "   - $asset" -ForegroundColor Yellow
        }
        Write-Host ""
        Write-Host "💡 Assets oluşturma rehberi için:" -ForegroundColor Cyan
        Write-Host "   ASSETS_CREATION_GUIDE.md dosyasına bakın" -ForegroundColor White
    }
    exit 1
}

