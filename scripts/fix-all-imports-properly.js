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
  
  // Bozuk import satırlarını düzelt
  // Pattern 1: import { ... } from "re\nimport { ... } from "..."
  content = content.replace(/from "re\nimport/g, 'from "react";\nimport');
  
  // Pattern 2: import {\n// Static...\nexport...\n  ...\n} from "..."
  content = content.replace(/import \{\n\/\/ Static generation'ı engelle\nexport const dynamic = "force-dynamic";\n([^}]+)\} from "([^"]+)";/g, 
    (match, imports, module) => {
      return `import {${imports}} from "${module}";`;
    }
  );
  
  // Pattern 3: import {\n\n// Static...\nexport...\n  ...\n} from "..."
  content = content.replace(/import \{\n\n\/\/ Static generation'ı engelle\nexport const dynamic = "force-dynamic";\n([^}]+)\} from "([^"]+)";/g, 
    (match, imports, module) => {
      return `import {${imports}} from "${module}";`;
    }
  );
  
  // Pattern 4: import {\nimport ... (yanlış yerleşim)
  content = content.replace(/import \{\nimport /g, 'import ');
  
  // Pattern 5: import { ... } from "but\n// Static...\nton";
  content = content.replace(/from "@\/components\/ui\/but\n\/\/ Static generation'ı engelle\nexport const dynamic = "force-dynamic";\nton";/g, 
    'from "@/components/ui/button";');
  
  // Pattern 6: import { ... } from "\n// Static...\nlucide-react";
  content = content.replace(/from "\n\/\/ Static generation'ı engelle\nexport const dynamic = "force-dynamic";\nlucide-react";/g, 
    'from "lucide-react";');
  
  // Şimdi export const dynamic'i tüm import'lardan SONRA taşı
  // Önce tüm import'ları topla
  const lines = content.split('\n');
  const importLines = [];
  const otherLines = [];
  let inImports = false;
  let importBlockEnd = -1;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Import satırı mı?
    if (line.trim().startsWith('import ')) {
      inImports = true;
      importLines.push(i);
      
      // Çok satırlı import mu kontrol et
      if (line.includes('{') && !line.includes('}')) {
        // Açık import bloğu, kapanışını bul
        let braceCount = (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
        for (let j = i + 1; j < lines.length; j++) {
          const nextLine = lines[j];
          braceCount += (nextLine.match(/\{/g) || []).length - (nextLine.match(/\}/g) || []).length;
          if (braceCount === 0 && nextLine.includes('from')) {
            importLines.push(j);
            i = j;
            break;
          }
        }
      }
    } else if (inImports && line.trim() === '' && lines[i+1] && !lines[i+1].trim().startsWith('import')) {
      // Boş satır ve sonraki satır import değil, import bloğu bitti
      importBlockEnd = i;
      inImports = false;
    } else if (!inImports) {
      otherLines.push({ index: i, line });
    }
  }
  
  // Eğer export const dynamic import'ların arasındaysa, taşı
  const dynamicExportIndex = lines.findIndex(line => line.includes('export const dynamic = "force-dynamic"'));
  const dynamicCommentIndex = lines.findIndex(line => line.includes('// Static generation'));
  
  if (dynamicExportIndex !== -1 && importBlockEnd !== -1 && dynamicExportIndex < importBlockEnd) {
    // Dynamic export import'ların arasında, taşı
    const dynamicExport = lines[dynamicExportIndex];
    const dynamicComment = dynamicCommentIndex !== -1 ? lines[dynamicCommentIndex] : '';
    
    // Eski dynamic export'u kaldır
    lines.splice(dynamicExportIndex, 1);
    if (dynamicCommentIndex !== -1 && dynamicCommentIndex !== dynamicExportIndex) {
      lines.splice(dynamicCommentIndex, 1);
    }
    
    // Import bloğunun sonuna ekle
    const newContent = lines.slice(0, importBlockEnd + 1).join('\n') + 
      '\n' + dynamicComment + '\n' + dynamicExport + 
      '\n' + lines.slice(importBlockEnd + 1).join('\n');
    
    content = newContent;
  }
  
  // Eğer değişiklik yapıldıysa dosyayı kaydet
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    fixedCount++;
    console.log(`✅ Fixed: ${path.relative(appDir, filePath)}`);
  }
});

console.log(`\n📊 Toplam ${fixedCount} dosya düzeltildi.`);

