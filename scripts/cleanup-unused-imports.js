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
      
      // Type error: All imports in import declaration are unused.
      const allImportsMatch = line.match(/Type error: All imports in import declaration are unused/);
      if (allImportsMatch) {
        // Önceki satırda dosya yolu var mı kontrol et
        if (i > 0) {
          const fileMatch = lines[i - 1].match(/\.\/(.+\.tsx?):(\d+):(\d+)/);
          if (fileMatch) {
            const filePath = fileMatch[1];
            const lineNum = parseInt(fileMatch[2]);
            errors.push({ filePath, lineNum, unusedName: 'ALL_IMPORTS' });
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
      
      // Type error: All imports in import declaration are unused.
      const allImportsMatch = line.match(/Type error: All imports in import declaration are unused/);
      if (allImportsMatch) {
        // Önceki satırda dosya yolu var mı kontrol et
        if (i > 0) {
          const fileMatch = lines[i - 1].match(/\.\/(.+\.tsx?):(\d+):(\d+)/);
          if (fileMatch) {
            const filePath = fileMatch[1];
            const lineNum = parseInt(fileMatch[2]);
            errors.push({ filePath, lineNum, unusedName: 'ALL_IMPORTS' });
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
    let line = lines[i];
    let isMultiLine = false;
    let importStartLine = i;
    
    // Multi-line import kontrolü - sonraki satırları da kontrol et
    if (line.includes('import') && !line.includes('from')) {
      // Multi-line import başlangıcı
      let j = i;
      let fullImportLine = line;
      while (j < lines.length && !lines[j].includes('from')) {
        j++;
        if (j < lines.length) {
          fullImportLine += ' ' + lines[j].trim();
        }
      }
      if (j < lines.length && lines[j].includes('from')) {
        fullImportLine += ' ' + lines[j];
        line = fullImportLine;
        isMultiLine = true;
      }
    }
    
    // Import satırını bul
    if (line.includes('import') && line.includes('from')) {
      // Default import: import X from ...
      const defaultImportMatch = line.match(/import\s+(\w+)\s+from/);
      if (defaultImportMatch && defaultImportMatch[1] === unusedName) {
        // Default import'u kaldır
        if (isMultiLine) {
          // Multi-line import'u kaldır
          for (let k = importStartLine; k <= i + (line.match(/\n/g) || []).length; k++) {
            if (k < lines.length) lines[k] = '';
          }
        } else {
          lines[i] = '';
        }
        const newContent = lines.filter((l, idx) => {
          if (l.trim() === '' && idx > 0 && lines[idx - 1].trim() === '') {
            return false;
          }
          return true;
        }).join('\n');
        fs.writeFileSync(fullPath, newContent, 'utf-8');
        console.log(`✅ ${filePath}:${importStartLine + 1} - '${unusedName}' (default import) kaldırıldı`);
        return true;
      }
      
      // Named imports: import { X, Y, Z } from ...
      // Type imports: import { type X } from ... veya import type { X } from ...
      const namedImportMatch = line.match(/import\s+(?:type\s+)?\{([^}]+)\}\s+from/);
      if (namedImportMatch) {
        // Import listesini parse et (type keyword'ünü de handle et)
        const importList = namedImportMatch[1];
        const imports = importList
          .split(',')
          .map(imp => {
            // type X veya X formatını handle et
            const trimmed = imp.trim();
            // type keyword'ünü kaldır, sadece ismi al
            return trimmed.replace(/^\s*type\s+/, '').trim();
          })
          .filter(imp => {
            // Kullanılmayan import'u filtrele
            const cleanName = imp.split(' as ')[0].trim(); // alias'ı handle et
            return cleanName !== unusedName;
          });
        
        if (imports.length < importList.split(',').length) {
          // Kullanılmayan import bulundu, kaldır
          if (imports.length === 0) {
            // Tüm import'lar kullanılmıyor, satırı kaldır
            if (isMultiLine) {
              for (let k = importStartLine; k <= i + (line.match(/\n/g) || []).length; k++) {
                if (k < lines.length) lines[k] = '';
              }
            } else {
              lines[i] = '';
            }
          } else {
            // Sadece kullanılmayan import'u kaldır
            // Orijinal formatı korumaya çalış (type keyword varsa koru)
            const originalImports = importList.split(',').map(imp => imp.trim());
            const keptImports = originalImports.filter(imp => {
              const cleanName = imp.replace(/^\s*type\s+/, '').trim().split(' as ')[0].trim();
              return cleanName !== unusedName;
            });
            
            const newImports = keptImports.join(', ');
            if (isMultiLine) {
              // Multi-line import'u tek satıra çevir
              const fromPart = line.match(/from\s+['"]([^'"]+)['"]/);
              if (fromPart) {
                lines[importStartLine] = `import { ${newImports} } from ${fromPart[0].replace('from ', '')}`;
                // Diğer satırları temizle
                for (let k = importStartLine + 1; k <= i + (line.match(/\n/g) || []).length; k++) {
                  if (k < lines.length) lines[k] = '';
                }
              }
            } else {
              lines[i] = line.replace(
                /\{([^}]+)\}/,
                `{ ${newImports} }`
              );
            }
          }
          
          // Boş satırları temizle
          const newContent = lines.filter((l, idx) => {
            if (l.trim() === '' && idx > 0 && lines[idx - 1].trim() === '') {
              return false;
            }
            return true;
          }).join('\n');
          fs.writeFileSync(fullPath, newContent, 'utf-8');
          console.log(`✅ ${filePath}:${importStartLine + 1} - '${unusedName}' kaldırıldı`);
          return true;
        }
      }
      
      // Mixed import: import X, { Y, Z } from ...
      const mixedImportMatch = line.match(/import\s+(\w+)\s*,\s*\{([^}]+)\}\s+from/);
      if (mixedImportMatch) {
        const defaultName = mixedImportMatch[1];
        const namedList = mixedImportMatch[2];
        
        if (defaultName === unusedName) {
          // Default import kullanılmıyor, sadece named import'ları bırak
          const fromPart = line.match(/from\s+['"]([^'"]+)['"]/);
          if (fromPart) {
            lines[i] = `import { ${namedList} } from ${fromPart[0].replace('from ', '')}`;
            const newContent = lines.join('\n');
            fs.writeFileSync(fullPath, newContent, 'utf-8');
            console.log(`✅ ${filePath}:${i + 1} - '${unusedName}' (default import) kaldırıldı`);
            return true;
          }
        } else {
          // Named import'lardan birini kaldır
          const imports = namedList
            .split(',')
            .map(imp => imp.trim().replace(/^\s*type\s+/, '').trim())
            .filter(imp => {
              const cleanName = imp.split(' as ')[0].trim();
              return cleanName !== unusedName;
            });
          
          if (imports.length < namedList.split(',').length) {
            const newImports = imports.join(', ');
            const fromPart = line.match(/from\s+['"]([^'"]+)['"]/);
            if (fromPart) {
              lines[i] = `import ${defaultName}, { ${newImports} } from ${fromPart[0].replace('from ', '')}`;
              const newContent = lines.join('\n');
              fs.writeFileSync(fullPath, newContent, 'utf-8');
              console.log(`✅ ${filePath}:${i + 1} - '${unusedName}' kaldırıldı`);
              return true;
            }
          }
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
    
    // ALL_IMPORTS durumu - tüm import satırını kaldır
    if (error.unusedName === 'ALL_IMPORTS') {
      const fullPath = path.join(process.cwd(), error.filePath);
      if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        const lines = content.split('\n');
        const line = lines[error.lineNum - 1] || '';
        
        if (line.includes('import')) {
          // Multi-line import kontrolü
          let startLine = error.lineNum - 1;
          let endLine = startLine;
          
          // Eğer satırda 'from' yoksa, multi-line import
          if (!line.includes('from')) {
            // 'from' satırını bul
            for (let j = startLine + 1; j < lines.length; j++) {
              if (lines[j].includes('from')) {
                endLine = j;
                break;
              }
            }
          }
          
          // Tüm import satırlarını kaldır
          for (let k = startLine; k <= endLine; k++) {
            if (k < lines.length) {
              lines[k] = '';
            }
          }
          
          const newContent = lines.filter((l, idx) => {
            if (l.trim() === '' && idx > 0 && lines[idx - 1].trim() === '') {
              return false;
            }
            return true;
          }).join('\n');
          fs.writeFileSync(fullPath, newContent, 'utf-8');
          console.log(`✅ ${error.filePath}:${error.lineNum} - Tüm import satırı kaldırıldı (${endLine - startLine + 1} satır)`);
          fixed++;
          totalFixed++;
          continue;
        }
      }
    }
    
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

