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

const errors = [];

pageFiles.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const relativePath = path.relative(appDir, filePath);
  
  let hasUseClient = false;
  let useClientIndex = -1;
  let firstImportIndex = -1;
  let hasDuplicateImports = false;
  let hasBrokenImport = false;
  let dynamicExportIndex = -1;
  let hasFunctionBeforeDynamic = false;
  
  const imports = new Map(); // module -> Set of imports
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // "use client" kontrolü
    if (line === '"use client"' || line === "'use client'") {
      hasUseClient = true;
      useClientIndex = i;
    }
    
    // İlk import'u bul
    if (firstImportIndex === -1 && line.startsWith('import ')) {
      firstImportIndex = i;
    }
    
    // Import satırlarını kontrol et
    if (line.startsWith('import ')) {
      // Bozuk import kontrolü
      if (line.includes('import {') && line.includes('} from') && !line.includes('"') && !line.includes("'")) {
        hasBrokenImport = true;
      }
      
      // Duplicate import kontrolü (basit)
      const importMatch = line.match(/import\s+\{([^}]+)\}\s+from\s+["']([^"']+)["']/);
      if (importMatch) {
        const module = importMatch[2];
        const importsList = importMatch[1].split(',').map(i => i.trim());
        
        if (!imports.has(module)) {
          imports.set(module, new Set());
        }
        
        importsList.forEach(imp => {
          if (imports.get(module).has(imp)) {
            hasDuplicateImports = true;
          }
          imports.get(module).add(imp);
        });
      }
    }
    
    // Dynamic export kontrolü
    if (line.includes('export const dynamic')) {
      dynamicExportIndex = i;
    }
    
    // Function tanımı kontrolü
    if (line.includes('export default function') || line.includes('function ') || line.includes('const ') && line.includes('= ()')) {
      if (dynamicExportIndex === -1 || i < dynamicExportIndex) {
        // Function dynamic'ten önce tanımlanmış, bu sorun değil
      }
    }
  }
  
  // Hataları topla
  if (hasUseClient && firstImportIndex !== -1 && useClientIndex > firstImportIndex) {
    errors.push({
      file: relativePath,
      error: '"use client" direktifi import\'lardan sonra geliyor',
      line: useClientIndex + 1
    });
  }
  
  if (hasDuplicateImports) {
    errors.push({
      file: relativePath,
      error: 'Duplicate import\'lar var',
      line: -1
    });
  }
  
  if (hasBrokenImport) {
    errors.push({
      file: relativePath,
      error: 'Bozuk import satırı var',
      line: -1
    });
  }
});

if (errors.length > 0) {
  console.log(`\n❌ ${errors.length} dosyada hata bulundu:\n`);
  errors.forEach(err => {
    console.log(`  - ${err.file}`);
    console.log(`    ${err.error}`);
    if (err.line > 0) {
      console.log(`    Satır: ${err.line}`);
    }
    console.log('');
  });
} else {
  console.log('\n✅ Hiç hata bulunamadı! Tüm dosyalar temiz.');
}

