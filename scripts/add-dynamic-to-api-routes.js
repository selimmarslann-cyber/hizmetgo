const fs = require('fs');
const path = require('path');

// Tüm route.ts dosyalarını bul
function findRouteFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findRouteFiles(filePath, fileList);
    } else if (file === 'route.ts' || file === 'route.js') {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// API route'larını bul
const apiDir = path.join(__dirname, '..', 'app', 'api');
const routeFiles = findRouteFiles(apiDir);

let updatedCount = 0;

routeFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Zaten dynamic export varsa atla
  if (content.includes('export const dynamic')) {
    return;
  }
  
  // Import satırlarından sonra dynamic export ekle
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
    
    // Import'lardan sonra, ilk export'tan önce ekle
    const firstExportMatch = rest.match(/^(export (async )?function|export default|export const)/m);
    
    if (firstExportMatch) {
      const insertPosition = importMatch[0].length + firstExportMatch.index;
      const newContent = 
        content.substring(0, insertPosition) +
        "\n// Cookie kullandığı için dynamic olmalı\n" +
        "export const dynamic = \"force-dynamic\";\n" +
        content.substring(insertPosition);
      
      fs.writeFileSync(filePath, newContent, 'utf8');
      updatedCount++;
      console.log(`✅ Updated: ${path.relative(apiDir, filePath)}`);
    }
  }
});

console.log(`\n📊 Toplam ${updatedCount} dosya güncellendi.`);

