const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// TypeScript build çıktısından kullanılmayan import hatalarını parse et
function findUnusedImports() {
  try {
    const buildOutput = execSync('npm run build 2>&1', { 
      encoding: 'utf-8',
      cwd: process.cwd(),
      maxBuffer: 10 * 1024 * 1024 // 10MB
    });
    
    const errors = [];
    const lines = buildOutput.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Type error: 'X' is declared but its value is never read.
      const match = line.match(/Type error: '(\w+)' is declared but its value is never read/);
      if (match) {
        const unusedName = match[1];
        
        // Önceki satırda dosya yolu var mı kontrol et
        if (i > 0) {
          const fileMatch = lines[i - 1].match(/\.\/(.+\.tsx?):(\d+):(\d+)/);
          if (fileMatch) {
            const filePath = fileMatch[1];
            const lineNum = parseInt(fileMatch[2]);
            errors.push({ filePath, lineNum, unusedName });
          }
        }
      }
    }
    
    return errors;
  } catch (error) {
    // Build hatası bekleniyor, output'u parse et
    const buildOutput = error.stdout || error.stderr || error.message || '';
    const errors = [];
    const lines = buildOutput.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      const match = line.match(/Type error: '(\w+)' is declared but its value is never read/);
      if (match) {
        const unusedName = match[1];
        
        if (i > 0) {
          const fileMatch = lines[i - 1].match(/\.\/(.+\.tsx?):(\d+):(\d+)/);
          if (fileMatch) {
            const filePath = fileMatch[1];
            const lineNum = parseInt(fileMatch[2]);
            errors.push({ filePath, lineNum, unusedName });
          }
        }
      }
    }
    
    return errors;
  }
}

// Dosyadan kullanılmayan import'u kaldır
function removeUnusedImport(filePath, unusedName) {
  const fullPath = path.join(process.cwd(), filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  Dosya bulunamadı: ${fullPath}`);
    return false;
  }
  
  const content = fs.readFileSync(fullPath, 'utf-8');
  const lines = content.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Import satırını bul
    if (line.includes('import') && line.includes('from')) {
      // { X, Y, Z } formatı
      const namedImportMatch = line.match(/import\s*\{([^}]+)\}\s*from/);
      if (namedImportMatch) {
        const imports = namedImportMatch[1]
          .split(',')
          .map(imp => imp.trim())
          .filter(imp => imp !== unusedName);
        
        if (imports.length < namedImportMatch[1].split(',').length) {
          // Kullanılmayan import bulundu, kaldır
          if (imports.length === 0) {
            // Tüm import'lar kullanılmıyor, satırı kaldır
            lines[i] = '';
          } else {
            // Sadece kullanılmayan import'u kaldır
            const newImports = imports.join(', ');
            lines[i] = line.replace(
              /\{([^}]+)\}/,
              `{ ${newImports} }`
            );
          }
          
          // Boş satırları temizle
          const newContent = lines.filter(line => line.trim() !== '' || line.includes('import')).join('\n');
          fs.writeFileSync(fullPath, newContent, 'utf-8');
          console.log(`✅ ${filePath}:${i + 1} - '${unusedName}' kaldırıldı`);
          return true;
        }
      }
    }
  }
  
  return false;
}

// Kullanılmayan değişkenleri temizle
function removeUnusedVariable(filePath, lineNum, varName) {
  const fullPath = path.join(process.cwd(), filePath);
  
  if (!fs.existsSync(fullPath)) {
    return false;
  }
  
  const content = fs.readFileSync(fullPath, 'utf-8');
  const lines = content.split('\n');
  
  if (lineNum > lines.length) {
    return false;
  }
  
  const line = lines[lineNum - 1];
  
  // const router = useRouter(); gibi satırları bul ve kaldır
  if (line.includes(`const ${varName}`) || line.includes(`let ${varName}`) || line.includes(`var ${varName}`)) {
    // useRouter import'unu da kontrol et
    if (line.includes('useRouter()')) {
      // useRouter import'unu da kaldır
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('useRouter') && lines[i].includes('from')) {
          lines[i] = '';
          break;
        }
      }
    }
    lines[lineNum - 1] = '';
    
    const newContent = lines.filter((l, idx) => {
      // Boş satırları koru ama gereksiz boşlukları temizle
      if (l.trim() === '' && idx > 0 && lines[idx - 1].trim() === '') {
        return false;
      }
      return true;
    }).join('\n');
    
    fs.writeFileSync(fullPath, newContent, 'utf-8');
    console.log(`✅ ${filePath}:${lineNum} - '${varName}' değişkeni kaldırıldı`);
    return true;
  }
  
  return false;
}

// Ana işlem - döngü ile tüm kullanılmayan import'ları temizle
console.log('🔍 Kullanılmayan importlar ve değişkenler aranıyor...\n');

let totalFixed = 0;
let iteration = 0;
const maxIterations = 20;

while (iteration < maxIterations) {
  iteration++;
  const errors = findUnusedImports();

  if (errors.length === 0) {
    console.log(`\n✅ Tüm kullanılmayan importlar temizlendi! (${totalFixed} toplam)`);
    break;
  }

  console.log(`\n📋 İterasyon ${iteration}: ${errors.length} kullanılmayan bulundu:\n`);

  let fixed = 0;
  for (const error of errors) {
    console.log(`  - ${error.filePath}:${error.lineNum} - '${error.unusedName}'`);
    
    // Import mu değişken mi kontrol et
    const fullPath = path.join(process.cwd(), error.filePath);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const lines = content.split('\n');
      const line = lines[error.lineNum - 1] || '';
      
      if (line.includes('import') && line.includes('from')) {
        // Import temizle
        if (removeUnusedImport(error.filePath, error.unusedName)) {
          fixed++;
          totalFixed++;
        }
      } else if (line.includes('const ') || line.includes('let ') || line.includes('var ')) {
        // Değişken temizle
        if (removeUnusedVariable(error.filePath, error.lineNum, error.unusedName)) {
          fixed++;
          totalFixed++;
        }
      }
    }
  }

  console.log(`\n✅ ${fixed}/${errors.length} temizlendi.`);
  
  if (errors.length > 0 && fixed === 0) {
    // Hiçbir şey temizlenmedi, döngüden çık
    break;
  }
  
  // Kısa bekleme
  if (fixed > 0) {
    continue;
  } else {
    break;
  }
}

console.log('\n🔄 Final build kontrol ediliyor...\n');

// Final build kontrol
try {
  const buildOutput = execSync('npm run build 2>&1', { 
    encoding: 'utf-8',
    cwd: process.cwd(),
    maxBuffer: 10 * 1024 * 1024,
    shell: 'powershell.exe'
  });
  
  // TypeScript hataları var mı kontrol et
  if (buildOutput.includes('Type error') && buildOutput.includes('is declared but its value is never read')) {
    console.log('⚠️  Hala bazı kullanılmayan importlar/değişkenler var:');
    const errorLines = buildOutput.split('\n').filter(line => 
      line.includes('Type error') && line.includes('is declared but its value is never read')
    );
    errorLines.slice(0, 5).forEach(line => console.log('  ' + line.trim()));
    if (errorLines.length > 5) {
      console.log(`  ... ve ${errorLines.length - 5} tane daha`);
    }
  } else if (buildOutput.includes('Failed to compile')) {
    console.log('⚠️  Build hataları var (kullanılmayan import dışında):');
    console.log(buildOutput.split('\n').slice(-5).join('\n'));
  } else {
    console.log('✅ Build başarılı! Tüm kullanılmayan importlar/değişkenler temizlendi.');
  }
} catch (error) {
  const output = error.stdout || error.stderr || error.message || '';
  
  if (output.includes('Type error') && output.includes('is declared but its value is never read')) {
    console.log('⚠️  Hala bazı kullanılmayan importlar/değişkenler var:');
    const errorLines = output.split('\n').filter(line => 
      line.includes('Type error') && line.includes('is declared but its value is never read')
    );
    errorLines.slice(0, 5).forEach(line => console.log('  ' + line.trim()));
    if (errorLines.length > 5) {
      console.log(`  ... ve ${errorLines.length - 5} tane daha`);
    }
  } else {
    console.log('⚠️  Build hatası:');
    console.log(output.split('\n').slice(-10).join('\n'));
  }
}

