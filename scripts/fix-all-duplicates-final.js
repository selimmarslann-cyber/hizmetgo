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
  
  // Her module için import'ları topla
  const importsByModule = new Map(); // module -> Set of imports
  const newLines = [];
  let i = 0;
  
  while (i < lines.length) {
    const line = lines[i];
    
    // Import satırını kontrol et
    const singleLineImport = line.match(/^import\s+\{([^}]+)\}\s+from\s+["']([^"']+)["'];?$/);
    
    if (singleLineImport) {
      const imports = singleLineImport[1].split(',').map(imp => imp.trim()).filter(imp => imp);
      const module = singleLineImport[2];
      
      if (!importsByModule.has(module)) {
        importsByModule.set(module, new Set());
      }
      
      imports.forEach(imp => importsByModule.get(module).add(imp));
      i++;
      continue;
    }
    
    // Çok satırlı import kontrolü
    const multiLineStart = line.match(/^import\s+\{([^}]*)$/);
    if (multiLineStart) {
      const moduleMatch = lines.slice(i).join('\n').match(/^import\s+\{([^}]+)\}\s+from\s+["']([^"']+)["'];?$/m);
      if (moduleMatch) {
        // Tüm satırları oku
        let importLines = [line];
        let j = i + 1;
        let foundEnd = false;
        
        while (j < lines.length && !foundEnd) {
          importLines.push(lines[j]);
          if (lines[j].includes('}') && lines[j].includes('from')) {
            foundEnd = true;
          }
          j++;
        }
        
        const fullImport = importLines.join('\n');
        const match = fullImport.match(/import\s+\{([^}]+)\}\s+from\s+["']([^"']+)["']/s);
        
        if (match) {
          const imports = match[1].split(/[,\n]/).map(imp => imp.trim()).filter(imp => imp);
          const module = match[2];
          
          if (!importsByModule.has(module)) {
            importsByModule.set(module, new Set());
          }
          
          imports.forEach(imp => importsByModule.get(module).add(imp));
          i = j;
          continue;
        }
      }
    }
    
    newLines.push(line);
    i++;
  }
  
  // Import'ları ekle
  if (importsByModule.size > 0) {
    // Mevcut import satırlarını kaldır ve yeniden ekle
    const finalLines = [];
    let foundFirstImport = false;
    let importsAdded = false;
    
    for (let i = 0; i < newLines.length; i++) {
      const line = newLines[i];
      
      // Import satırlarını atla
      if (line.trim().startsWith('import ')) {
        if (!foundFirstImport) {
          foundFirstImport = true;
          // Import'ları ekle
          importsByModule.forEach((imports, module) => {
            const sortedImports = Array.from(imports).sort();
            if (sortedImports.length > 0) {
              finalLines.push(`import { ${sortedImports.join(', ')} } from "${module}";`);
            }
          });
          importsAdded = true;
        }
        continue;
      }
      
      // İlk import'tan önce import'ları ekle
      if (!foundFirstImport && !importsAdded && line.trim() !== '' && !line.trim().startsWith('//')) {
        importsByModule.forEach((imports, module) => {
          const sortedImports = Array.from(imports).sort();
          if (sortedImports.length > 0) {
            finalLines.push(`import { ${sortedImports.join(', ')} } from "${module}";`);
          }
        });
        importsAdded = true;
      }
      
      finalLines.push(line);
    }
    
    // Eğer hiç import satırı yoksa başa ekle
    if (!importsAdded) {
      const importLines = [];
      importsByModule.forEach((imports, module) => {
        const sortedImports = Array.from(imports).sort();
        if (sortedImports.length > 0) {
          importLines.push(`import { ${sortedImports.join(', ')} } from "${module}";`);
        }
      });
      finalLines.unshift(...importLines);
    }
    
    const newContent = finalLines.join('\n');
    
    if (newContent !== originalContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      fixedCount++;
      console.log(`✅ Fixed: ${path.relative(appDir, filePath)}`);
    }
  }
});

console.log(`\n📊 Toplam ${fixedCount} dosya düzeltildi.`);

