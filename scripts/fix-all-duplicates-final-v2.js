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
  let inComment = false;
  
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // Yorum kontrolü
    if (trimmed.startsWith('/*')) {
      inComment = true;
      newLines.push(line);
      i++;
      continue;
    }
    if (trimmed.endsWith('*/') || trimmed.includes('*/')) {
      inComment = false;
      newLines.push(line);
      i++;
      continue;
    }
    if (trimmed.startsWith('//')) {
      newLines.push(line);
      i++;
      continue;
    }
    
    // Import satırını kontrol et
    const singleLineImport = line.match(/^import\s+\{([^}]+)\}\s+from\s+["']([^"']+)["'];?$/);
    
    if (singleLineImport && !inComment) {
      const imports = singleLineImport[1].split(',').map(imp => imp.trim()).filter(imp => imp);
      const module = singleLineImport[2];
      
      if (!importsByModule.has(module)) {
        importsByModule.set(module, new Set());
      }
      
      imports.forEach(imp => importsByModule.get(module).add(imp));
      i++;
      continue; // Bu satırı atla, sonra ekleyeceğiz
    }
    
    // Çok satırlı import kontrolü
    if (trimmed.startsWith('import ') && trimmed.includes('{') && !trimmed.includes('}') && !inComment) {
      // Çok satırlı import başlangıcı
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
      
      if (foundEnd) {
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
          continue; // Bu satırları atla
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
    let useClientIndex = -1;
    
    // "use client" direktifini bul
    for (let i = 0; i < newLines.length; i++) {
      if (newLines[i].trim() === '"use client"' || newLines[i].trim() === "'use client'") {
        useClientIndex = i;
        break;
      }
    }
    
    for (let i = 0; i < newLines.length; i++) {
      const line = newLines[i];
      const trimmed = line.trim();
      
      // "use client" direktifini ekle
      if (useClientIndex === i) {
        finalLines.push(line);
        // Import'ları hemen sonra ekle
        importsByModule.forEach((imports, module) => {
          const sortedImports = Array.from(imports).sort();
          if (sortedImports.length > 0) {
            finalLines.push(`import { ${sortedImports.join(', ')} } from "${module}";`);
          }
        });
        importsAdded = true;
        continue;
      }
      
      // Import satırlarını atla
      if (trimmed.startsWith('import ')) {
        if (!foundFirstImport) {
          foundFirstImport = true;
          // Eğer "use client" yoksa, import'ları buraya ekle
          if (useClientIndex === -1 && !importsAdded) {
            importsByModule.forEach((imports, module) => {
              const sortedImports = Array.from(imports).sort();
              if (sortedImports.length > 0) {
                finalLines.push(`import { ${sortedImports.join(', ')} } from "${module}";`);
              }
            });
            importsAdded = true;
          }
        }
        continue;
      }
      
      // İlk import'tan önce import'ları ekle (eğer "use client" yoksa)
      if (!foundFirstImport && !importsAdded && trimmed !== '' && !trimmed.startsWith('//') && !trimmed.startsWith('/*') && useClientIndex === -1) {
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

