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

// Lucide-react icon'ları
const lucideIcons = [
  'User', 'Phone', 'MapPin', 'Clock', 'CheckCircle2', 'MessageSquare',
  'Bell', 'Building2', 'AlertTriangle', 'Calendar', 'TrendingUp', 'XCircle',
  'Save', 'Store', 'Edit', 'Trash2', 'X', 'Upload', 'Wallet', 'Briefcase',
  'Gift', 'ArrowRight', 'Plus', 'Camera', 'Coins', 'Users', 'LinkIcon',
  'Copy', 'Share2', 'Twitter', 'Dialog', 'DialogContent', 'DialogHeader',
  'DialogTitle', 'DialogDescription', 'DialogFooter', 'Select', 'SelectTrigger',
  'SelectValue', 'SelectContent', 'SelectItem', 'Card', 'CardContent',
  'CardHeader', 'CardTitle', 'CardDescription'
];

// Component'ler
const uiComponents = [
  'Card', 'CardContent', 'CardHeader', 'CardTitle', 'CardDescription',
  'Select', 'SelectTrigger', 'SelectValue', 'SelectContent', 'SelectItem',
  'Dialog', 'DialogContent', 'DialogHeader', 'DialogTitle', 'DialogDescription',
  'DialogFooter', 'Accordion', 'AccordionContent', 'AccordionItem', 'AccordionTrigger'
];

// App dizinindeki tüm page.tsx dosyalarını bul
const appDir = path.join(__dirname, '..', 'app');
const pageFiles = findPageFiles(appDir);

const issues = [];

pageFiles.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf8');
  const relativePath = path.relative(appDir, filePath);
  
  // JSX'te kullanılan ama import edilmemiş component'leri bul
  const usedComponents = new Set();
  
  // Lucide icon'ları kontrol et
  lucideIcons.forEach(icon => {
    const regex = new RegExp(`<${icon}\\s|\\b${icon}\\s+className`, 'g');
    if (regex.test(content)) {
      // Import edilmiş mi kontrol et
      const importRegex = new RegExp(`import.*${icon}.*from.*lucide-react`, 'g');
      if (!importRegex.test(content)) {
        usedComponents.add(`lucide-react:${icon}`);
      }
    }
  });
  
  // UI component'leri kontrol et
  uiComponents.forEach(component => {
    const regex = new RegExp(`<${component}\\s|\\b${component}\\s+`, 'g');
    if (regex.test(content)) {
      // Import edilmiş mi kontrol et
      const importRegex = new RegExp(`import.*${component}.*from.*@/components/ui`, 'g');
      if (!importRegex.test(content)) {
        usedComponents.add(`ui:${component}`);
      }
    }
  });
  
  if (usedComponents.size > 0) {
    issues.push({
      file: relativePath,
      missing: Array.from(usedComponents)
    });
  }
});

console.log('🔍 Eksik import\'lar kontrol ediliyor...\n');

if (issues.length === 0) {
  console.log('✅ Hiç eksik import bulunamadı!');
} else {
  console.log(`❌ ${issues.length} dosyada eksik import bulundu:\n`);
  issues.forEach(issue => {
    console.log(`📄 ${issue.file}`);
    const lucide = issue.missing.filter(m => m.startsWith('lucide-react:')).map(m => m.replace('lucide-react:', ''));
    const ui = issue.missing.filter(m => m.startsWith('ui:')).map(m => m.replace('ui:', ''));
    
    if (lucide.length > 0) {
      console.log(`   ❌ lucide-react: ${lucide.join(', ')}`);
    }
    if (ui.length > 0) {
      console.log(`   ❌ ui components: ${ui.join(', ')}`);
    }
    console.log('');
  });
}

