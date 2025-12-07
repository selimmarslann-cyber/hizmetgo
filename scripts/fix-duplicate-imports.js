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
  
  // Her import satırını kontrol et
  const importMap = new Map(); // module -> Set of imports
  const newLines = [];
  let hasChanges = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const importMatch = line.match(/^import\s+\{([^}]+)\}\s+from\s+["']([^"']+)["'];?$/);
    
    if (importMatch) {
      const imports = importMatch[1].split(',').map(i => i.trim()).filter(i => i);
      const module = importMatch[2];
      
      if (!importMap.has(module)) {
        importMap.set(module, new Set());
      }
      
      // Duplicate kontrolü
      const existingImports = importMap.get(module);
      const newImports = imports.filter(imp => !existingImports.has(imp));
      
      if (newImports.length === 0) {
        // Tüm import'lar zaten var, bu satırı atla
        hasChanges = true;
        continue;
      }
      
      // Yeni import'ları ekle
      newImports.forEach(imp => existingImports.add(imp));
      
      // Birleştirilmiş import satırı oluştur
      const allImports = Array.from(existingImports).sort();
      newLines.push(`import { ${allImports.join(', ')} } from "${module}";`);
      hasChanges = true;
    } else {
      newLines.push(line);
    }
  }
  
  if (hasChanges) {
    const newContent = newLines.join('\n');
    fs.writeFileSync(filePath, newContent, 'utf8');
    fixedCount++;
    console.log(`✅ Fixed: ${path.relative(appDir, filePath)}`);
  }
});

console.log(`\n📊 Toplam ${fixedCount} dosya düzeltildi.`);

