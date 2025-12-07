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
  const originalContent = content;
  const lines = content.split('\n');
  
  // "use client" direktifini bul
  let useClientIndex = -1;
  let firstImportIndex = -1;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line === '"use client"' || line === "'use client'") {
      useClientIndex = i;
    }
    
    if (firstImportIndex === -1 && line.startsWith('import ')) {
      firstImportIndex = i;
    }
  }
  
  // Eğer "use client" var ve import'lardan sonra geliyorsa düzelt
  if (useClientIndex !== -1 && firstImportIndex !== -1 && useClientIndex > firstImportIndex) {
    // "use client" satırını kaldır
    const useClientLine = lines[useClientIndex];
    lines.splice(useClientIndex, 1);
    
    // En başa ekle (yorumlardan sonra, import'lardan önce)
    let insertIndex = 0;
    
    // Dosyanın başındaki yorumları atla
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('//') || line.startsWith('/*') || line.startsWith('*') || line === '') {
        insertIndex = i + 1;
      } else {
        break;
      }
    }
    
    // "use client" direktifini ekle
    lines.splice(insertIndex, 0, useClientLine);
    
    const newContent = lines.join('\n');
    fs.writeFileSync(filePath, newContent, 'utf8');
    fixedCount++;
    console.log(`✅ Fixed: ${path.relative(appDir, filePath)}`);
  }
});

console.log(`\n📊 Toplam ${fixedCount} dosya düzeltildi.`);

