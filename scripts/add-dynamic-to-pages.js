const fs = require('fs');
const path = require('path');

// Tüm page.tsx dosyalarını bul
function findPageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findPageFiles(filePath, fileList);
    } else if (file === 'page.tsx' || file === 'page.js') {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// App dizinindeki tüm page.tsx dosyalarını bul
const appDir = path.join(__dirname, '..', 'app');
const pageFiles = findPageFiles(appDir);

let updatedCount = 0;

pageFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Zaten dynamic export varsa atla
  if (content.includes('export const dynamic')) {
    return;
  }
  
  // "use client" veya "use server" içeren sayfaları dynamic yap
  // Veya useSearchParams kullanan sayfaları dynamic yap
  const hasUseClient = content.includes('"use client"') || content.includes("'use client'");
  const hasUseSearchParams = content.includes('useSearchParams');
  const hasUseServer = content.includes('"use server"') || content.includes("'use server'");
  
  if (!hasUseClient && !hasUseSearchParams && !hasUseServer) {
    // Server component ve useSearchParams yok, atla
    return;
  }
  
  // İlk import satırını bul
  const importMatch = content.match(/^(import[^\n]+\n)+/m);
  
  if (importMatch) {
    const afterImports = importMatch[0];
    const rest = content.substring(importMatch[0].length);
    
    // Eğer zaten başka export const varsa ondan önce ekle
    const exportConstMatch = rest.match(/^export const (dynamic|runtime|revalidate)/m);
    
    if (exportConstMatch) {
      // Zaten var, atla
      return;
    }
    
    // "use client" veya "use server" satırından sonra ekle
    const useDirectiveMatch = content.match(/^("use client"|'use client'|"use server"|'use server')\s*\n/);
    
    if (useDirectiveMatch) {
      const insertPosition = useDirectiveMatch[0].length;
      const newContent = 
        content.substring(0, insertPosition) +
        "\n// Static generation'ı engelle\n" +
        "export const dynamic = \"force-dynamic\";\n" +
        content.substring(insertPosition);
      
      fs.writeFileSync(filePath, newContent, 'utf8');
      updatedCount++;
      console.log(`✅ Updated: ${path.relative(appDir, filePath)}`);
    } else if (importMatch) {
      // Import'lardan sonra ekle
      const insertPosition = importMatch[0].length;
      const newContent = 
        content.substring(0, insertPosition) +
        "\n// Static generation'ı engelle\n" +
        "export const dynamic = \"force-dynamic\";\n" +
        content.substring(insertPosition);
      
      fs.writeFileSync(filePath, newContent, 'utf8');
      updatedCount++;
      console.log(`✅ Updated: ${path.relative(appDir, filePath)}`);
    }
  }
});

console.log(`\n📊 Toplam ${updatedCount} sayfa güncellendi.`);

