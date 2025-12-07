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

const issues = [];

pageFiles.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  // export const dynamic sayısını bul
  const dynamicMatches = content.match(/export const dynamic = "force-dynamic";/g);
  const dynamicCount = dynamicMatches ? dynamicMatches.length : 0;
  
  // export const dynamic satır numaralarını bul
  const dynamicLines = [];
  lines.forEach((line, index) => {
    if (line.includes('export const dynamic = "force-dynamic"')) {
      dynamicLines.push(index + 1);
    }
  });
  
  // Sorunları kontrol et
  if (dynamicCount > 1) {
    issues.push({
      file: path.relative(appDir, filePath),
      problem: 'DUPLICATE',
      count: dynamicCount,
      lines: dynamicLines
    });
  }
  
  // export const dynamic'in fonksiyon/interface içinde olup olmadığını kontrol et
  if (dynamicCount > 0) {
    const firstDynamicLine = dynamicLines[0];
    const beforeDynamic = lines.slice(0, firstDynamicLine - 1).join('\n');
    
    // Fonksiyon içinde mi?
    const functionMatch = beforeDynamic.match(/(export\s+default\s+function|function\s+\w+|const\s+\w+\s*=\s*(\(|async\s*\())/);
    if (functionMatch) {
      const functionLine = beforeDynamic.substring(0, functionMatch.index).split('\n').length;
      if (functionLine < firstDynamicLine - 1) {
        issues.push({
          file: path.relative(appDir, filePath),
          problem: 'INSIDE_FUNCTION',
          line: firstDynamicLine
        });
      }
    }
    
    // Interface içinde mi?
    const interfaceMatch = beforeDynamic.match(/interface\s+\w+\s*\{/);
    if (interfaceMatch) {
      const interfaceLine = beforeDynamic.substring(0, interfaceMatch.index).split('\n').length;
      if (interfaceLine < firstDynamicLine - 1) {
        issues.push({
          file: path.relative(appDir, filePath),
          problem: 'INSIDE_INTERFACE',
          line: firstDynamicLine
        });
      }
    }
  }
  
  // Bozuk import satırlarını kontrol et
  const brokenImportPatterns = [
    /import\s+[^"]*"\n\/\/ Static/,
    /from\s+"[^"]*\n\/\/ Static/,
    /import\s+[^"]*"\n\nexport\s+const\s+dynamic/,
    /import\s+[^"]*"\nimport/,
  ];
  
  brokenImportPatterns.forEach(pattern => {
    if (pattern.test(content)) {
      issues.push({
        file: path.relative(appDir, filePath),
        problem: 'BROKEN_IMPORT'
      });
    }
  });
});

console.log('🔍 Tüm sayfalar kontrol ediliyor...\n');

if (issues.length === 0) {
  console.log('✅ Hiç sorun bulunamadı!');
} else {
  console.log(`❌ ${issues.length} sorun bulundu:\n`);
  issues.forEach(issue => {
    console.log(`📄 ${issue.file}`);
    if (issue.problem === 'DUPLICATE') {
      console.log(`   ❌ DUPLICATE: ${issue.count} kez tanımlanmış (satırlar: ${issue.lines.join(', ')})`);
    } else if (issue.problem === 'INSIDE_FUNCTION') {
      console.log(`   ❌ INSIDE_FUNCTION: Satır ${issue.line}'de fonksiyon içinde`);
    } else if (issue.problem === 'INSIDE_INTERFACE') {
      console.log(`   ❌ INSIDE_INTERFACE: Satır ${issue.line}'de interface içinde`);
    } else if (issue.problem === 'BROKEN_IMPORT') {
      console.log(`   ❌ BROKEN_IMPORT: Bozuk import satırı`);
    }
    console.log('');
  });
}

