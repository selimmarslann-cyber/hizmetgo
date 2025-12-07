# Tüm page.tsx dosyalarını bul ve duplicate "use client" düzelt
$files = Get-ChildItem -Path "app" -Recurse -Filter "page.tsx"

$fixedCount = 0

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $lines = Get-Content $file.FullName
    
    # İlk 10 satırda "use client" sayısını kontrol et
    $useClientCount = 0
    $useClientIndices = @()
    
    for ($i = 0; $i -lt [Math]::Min(10, $lines.Count); $i++) {
        $trimmed = $lines[$i].Trim()
        if ($trimmed -eq '"use client"' -or $trimmed -eq "'use client'") {
            $useClientCount++
            $useClientIndices += $i
        }
    }
    
    # Duplicate varsa düzelt
    if ($useClientCount -gt 1) {
        $newLines = [System.Collections.ArrayList]::new()
        $newLines.AddRange($lines)
        
        # Tüm "use client" satırlarını kaldır (sondan başa)
        for ($i = $useClientIndices.Count - 1; $i -ge 0; $i--) {
            $newLines.RemoveAt($useClientIndices[$i])
        }
        
        # İlk boş satırları temizle
        while ($newLines.Count -gt 0 -and $newLines[0].Trim() -eq '') {
            $newLines.RemoveAt(0)
        }
        
        # Tek bir "use client" ekle
        $newLines.Insert(0, '"use client";')
        
        # İkinci satır boş değilse, boş satır ekle
        if ($newLines.Count -gt 1 -and $newLines[1].Trim() -ne '') {
            $newLines.Insert(1, '')
        }
        
        # Dosyayı kaydet
        $newContent = $newLines -join "`n"
        [System.IO.File]::WriteAllText($file.FullName, $newContent, [System.Text.Encoding]::UTF8)
        
        $fixedCount++
        Write-Host "✅ $($file.FullName) - $useClientCount duplicate kaldırıldı"
    }
}

Write-Host "`n📊 Toplam $fixedCount dosya düzeltildi."

