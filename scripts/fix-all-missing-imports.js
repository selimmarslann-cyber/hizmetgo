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

// Icon mapping - kullanılan icon'lar
const iconMap = {
  'User': 'lucide-react',
  'Phone': 'lucide-react',
  'MapPin': 'lucide-react',
  'Clock': 'lucide-react',
  'CheckCircle2': 'lucide-react',
  'MessageSquare': 'lucide-react',
  'Bell': 'lucide-react',
  'Building2': 'lucide-react',
  'AlertTriangle': 'lucide-react',
  'Calendar': 'lucide-react',
  'TrendingUp': 'lucide-react',
  'XCircle': 'lucide-react',
  'Save': 'lucide-react',
  'Store': 'lucide-react',
  'Edit': 'lucide-react',
  'Trash2': 'lucide-react',
  'X': 'lucide-react',
  'Upload': 'lucide-react',
  'Wallet': 'lucide-react',
  'Briefcase': 'lucide-react',
  'Gift': 'lucide-react',
  'ArrowRight': 'lucide-react',
  'Plus': 'lucide-react',
  'Camera': 'lucide-react',
  'Coins': 'lucide-react',
  'Users': 'lucide-react',
  'LinkIcon': 'lucide-react',
  'Copy': 'lucide-react',
  'Share2': 'lucide-react',
  'Twitter': 'lucide-react',
  'Zap': 'lucide-react',
};

// Component mapping
const componentMap = {
  'Select': '@/components/ui/select',
  'SelectTrigger': '@/components/ui/select',
  'SelectValue': '@/components/ui/select',
  'SelectContent': '@/components/ui/select',
  'SelectItem': '@/components/ui/select',
  'Dialog': '@/components/ui/dialog',
  'DialogContent': '@/components/ui/dialog',
  'DialogHeader': '@/components/ui/dialog',
  'DialogTitle': '@/components/ui/dialog',
  'DialogDescription': '@/components/ui/dialog',
  'DialogFooter': '@/components/ui/dialog',
  'Accordion': '@/components/ui/accordion',
  'AccordionContent': '@/components/ui/accordion',
  'AccordionItem': '@/components/ui/accordion',
  'AccordionTrigger': '@/components/ui/accordion',
  'Card': '@/components/ui/card',
  'CardContent': '@/components/ui/card',
  'CardHeader': '@/components/ui/card',
  'CardTitle': '@/components/ui/card',
  'CardDescription': '@/components/ui/card',
};

// App dizinindeki tüm page.tsx dosyalarını bul
const appDir = path.join(__dirname, '..', 'app');
const pageFiles = findPageFiles(appDir);

let fixedCount = 0;

pageFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  // Kullanılan icon'ları bul
  const usedIcons = new Set();
  Object.keys(iconMap).forEach(icon => {
    const regex = new RegExp(`<${icon}\\s|\\b${icon}\\s+className`, 'g');
    if (regex.test(content)) {
      const importRegex = new RegExp(`import.*${icon}.*from.*lucide-react`, 'g');
      if (!importRegex.test(content)) {
        usedIcons.add(icon);
      }
    }
  });
  
  // Kullanılan component'leri bul
  const usedComponents = new Map();
  Object.keys(componentMap).forEach(component => {
    const regex = new RegExp(`<${component}\\s|\\b${component}\\s+`, 'g');
    if (regex.test(content)) {
      const importRegex = new RegExp(`import.*${component}.*from.*${componentMap[component].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g');
      if (!importRegex.test(content)) {
        const module = componentMap[component];
        if (!usedComponents.has(module)) {
          usedComponents.set(module, new Set());
        }
        usedComponents.get(module).add(component);
      }
    }
  });
  
  if (usedIcons.size === 0 && usedComponents.size === 0) {
    return; // Eksik import yok
  }
  
  // Import'ları ekle
  const lines = content.split('\n');
  let lastImportIndex = -1;
  let lucideImportIndex = -1;
  let lucideImportLine = '';
  
  // Mevcut import'ları bul
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith('import ')) {
      lastImportIndex = i;
      if (lines[i].includes('from "lucide-react"') || lines[i].includes("from 'lucide-react'")) {
        lucideImportIndex = i;
        lucideImportLine = lines[i];
      }
    }
  }
  
  // Lucide icon'ları ekle
  if (usedIcons.size > 0) {
    const iconsArray = Array.from(usedIcons).sort();
    if (lucideImportIndex !== -1) {
      // Mevcut import'a ekle
      const match = lucideImportLine.match(/import\s+\{([^}]+)\}\s+from\s+["']lucide-react["']/);
      if (match) {
        const existingIcons = match[1].split(',').map(i => i.trim()).filter(i => i);
        const allIcons = [...new Set([...existingIcons, ...iconsArray])].sort();
        lines[lucideImportIndex] = `import { ${allIcons.join(', ')} } from "lucide-react";`;
      }
    } else {
      // Yeni import ekle
      const newImport = `import { ${iconsArray.join(', ')} } from "lucide-react";`;
      if (lastImportIndex !== -1) {
        lines.splice(lastImportIndex + 1, 0, newImport);
      } else {
        lines.splice(0, 0, newImport);
      }
    }
  }
  
  // UI component'lerini ekle
  if (usedComponents.size > 0) {
    usedComponents.forEach((components, module) => {
      const componentsArray = Array.from(components).sort();
      const newImport = `import { ${componentsArray.join(', ')} } from "${module}";`;
      
      // Aynı module'den import var mı kontrol et
      let existingImportIndex = -1;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(`from "${module}"`)) {
          existingImportIndex = i;
          break;
        }
      }
      
      if (existingImportIndex !== -1) {
        // Mevcut import'a ekle
        const match = lines[existingImportIndex].match(/import\s+\{([^}]+)\}\s+from\s+["']([^"']+)["']/);
        if (match) {
          const existingComponents = match[1].split(',').map(c => c.trim()).filter(c => c);
          const allComponents = [...new Set([...existingComponents, ...componentsArray])].sort();
          lines[existingImportIndex] = `import { ${allComponents.join(', ')} } from "${module}";`;
        }
      } else {
        // Yeni import ekle
        const insertIndex = lastImportIndex !== -1 ? lastImportIndex + 1 : 0;
        lines.splice(insertIndex, 0, newImport);
        lastImportIndex = insertIndex;
      }
    });
  }
  
  const newContent = lines.join('\n');
  if (newContent !== originalContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    fixedCount++;
    console.log(`✅ Fixed: ${path.relative(appDir, filePath)}`);
  }
});

console.log(`\n📊 Toplam ${fixedCount} dosya düzeltildi.`);

