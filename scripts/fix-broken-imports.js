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
  // Pattern: import ... from "re\n// Static...\nact";
  content = content.replace(
    /from "re\n\/\/ Static generation'ı engelle\nexport const dynamic = "force-dynamic";\nact";/g,
    'from "react";\n\n// Static generation\'ı engelle\nexport const dynamic = "force-dynamic";'
  );
  
  // Pattern: import ... from "\n// Static...\nlucide-react";
  content = content.replace(
    /from "\n\/\/ Static generation'ı engelle\nexport const dynamic = "force-dynamic";\nlucide-react";/g,
    'from "lucide-react";\n\n// Static generation\'ı engelle\nexport const dynamic = "force-dynamic";'
  );
  
  // Pattern: import ... from "@/components/ui/but\n// Static...\nton";
  content = content.replace(
    /from "@\/components\/ui\/but\n\/\/ Static generation'ı engelle\nexport const dynamic = "force-dynamic";\nton";/g,
    'from "@/components/ui/button";\n\n// Static generation\'ı engelle\nexport const dynamic = "force-dynamic";'
  );
  
  // Genel pattern: import ... from "X\n// Static...\nY";
  // Bu pattern'i daha genel bir şekilde yakalayalım
  content = content.replace(
    /from "([^"]*)\n\/\/ Static generation'ı engelle\nexport const dynamic = "force-dynamic";\n([^"]*)";/g,
    (match, part1, part2) => {
      // Eğer part1 ve part2 birleşince mantıklı bir import path oluşturuyorsa
      const fullPath = part1 + part2;
      return `from "${fullPath}";\n\n// Static generation'ı engelle\nexport const dynamic = "force-dynamic";`;
    }
  );
  
  // Eğer değişiklik yapıldıysa dosyayı kaydet
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    fixedCount++;
    console.log(`✅ Fixed: ${path.relative(appDir, filePath)}`);
  }
});

console.log(`\n📊 Toplam ${fixedCount} dosya düzeltildi.`);

