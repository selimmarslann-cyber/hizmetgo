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

let fixedCount = 0;

pageFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  // Eğer export const dynamic import'ların arasındaysa, tüm import'ların sonuna taşı
  // Pattern: import ...\n// Static...\nexport const dynamic...\nimport ...
  if (content.includes('export const dynamic = "force-dynamic"')) {
    // Tüm import satırlarını bul
    const importRegex = /^import\s+.*$/gm;
    const imports = content.match(importRegex) || [];
    
    if (imports.length > 0) {
      // İlk import'tan önceki kısmı al
      const firstImportIndex = content.indexOf(imports[0]);
      const beforeImports = content.substring(0, firstImportIndex);
      
      // Son import'tan sonraki kısmı al
      const lastImport = imports[imports.length - 1];
      const lastImportIndex = content.lastIndexOf(lastImport);
      const afterLastImport = content.substring(lastImportIndex + lastImport.length);
      
      // Export const dynamic'i bul ve kaldır
      const dynamicExport = content.match(/\/\/ Static generation'ı engelle\s*\nexport const dynamic = "force-dynamic";/);
      
      if (dynamicExport) {
        // Dynamic export'u kaldır
        content = content.replace(/\/\/ Static generation'ı engelle\s*\nexport const dynamic = "force-dynamic";\s*\n?/g, '');
        
        // Tüm import'ları birleştir
        const allImports = imports.join('\n');
        
        // Import'lardan sonra boş satır ve dynamic export ekle
        const newContent = beforeImports + allImports + '\n\n// Static generation\'ı engelle\nexport const dynamic = "force-dynamic";' + afterLastImport;
        
        // Eğer değişiklik yapıldıysa kaydet
        if (newContent !== originalContent) {
          fs.writeFileSync(filePath, newContent, 'utf8');
          fixedCount++;
          console.log(`✅ Fixed: ${path.relative(appDir, filePath)}`);
        }
      }
    }
  }
});

console.log(`\n📊 Toplam ${fixedCount} dosya düzeltildi.`);

