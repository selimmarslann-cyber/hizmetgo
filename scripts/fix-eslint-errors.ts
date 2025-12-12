/**
 * ESLint ve TypeScript Hatalarını Otomatik Düzeltme Scripti
 * 
 * Bu script:
 * 1. Tüm if statement'lara curly braces ekler
 * 2. Kritik any type kullanımlarını düzeltir
 */

import * as fs from 'fs';
import * as path from 'path';

interface FixStats {
  filesProcessed: number;
  curlyBracesFixed: number;
  anyTypesFixed: number;
  errors: string[];
}

const EXCLUDE_DIRS = ['node_modules', 'mobile', 'scripts', 'expert', 'tests', '.next', 'dist', 'build'];
const EXCLUDE_PATTERNS = ['.spec.ts', '.test.ts', '.d.ts'];

function shouldProcessFile(filePath: string): boolean {
  // Exclude directories
  for (const dir of EXCLUDE_DIRS) {
    if (filePath.includes(`/${dir}/`) || filePath.includes(`\\${dir}\\`)) {
      return false;
    }
  }
  
  // Exclude patterns
  for (const pattern of EXCLUDE_PATTERNS) {
    if (filePath.endsWith(pattern)) {
      return false;
    }
  }
  
  return true;
}

function findFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);
  
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (shouldProcessFile(filePath)) {
        findFiles(filePath, fileList);
      }
    } else if ((file.endsWith('.ts') || file.endsWith('.tsx')) && shouldProcessFile(filePath)) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

/**
 * If statement'lara curly braces ekler
 * Pattern'ler:
 * - if (condition) statement; -> if (condition) { statement; }
 * - if (condition) return value; -> if (condition) { return value; }
 * - if (condition) continue; -> if (condition) { continue; }
 * - if (condition) break; -> if (condition) { break; }
 */
function fixCurlyBraces(content: string): { fixed: string; count: number } {
  let fixed = content;
  let count = 0;
  
  // Satır satır işle
  const lines = fixed.split('\n');
  const fixedLines: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // If statement pattern'lerini kontrol et
    // if (condition) statement; pattern'i
    const ifPattern = /^(\s*)if\s*\([^)]+\)\s+([^{;\n]+);?\s*$/;
    const match = trimmed.match(ifPattern);
    
    if (match) {
      const indent = match[1];
      const condition = trimmed.match(/if\s*\(([^)]+)\)/)?.[1] || '';
      const statement = trimmed.match(/if\s*\([^)]+\)\s+(.+)$/)?.[1]?.trim() || '';
      
      // JSX içindeki conditional rendering'i atla
      if (statement.includes('&&') || statement.includes('||') || statement.includes('?')) {
        fixedLines.push(line);
        continue;
      }
      
      // Zaten curly braces varsa atla
      if (trimmed.includes('{')) {
        fixedLines.push(line);
        continue;
      }
      
      // Return statement
      if (statement.startsWith('return')) {
        fixedLines.push(`${indent}if (${condition}) {`);
        fixedLines.push(`${indent}  ${statement};`);
        fixedLines.push(`${indent}}`);
        count++;
        continue;
      }
      
      // Continue, break, throw gibi statement'lar
      if (statement.startsWith('continue') || 
          statement.startsWith('break') || 
          statement.startsWith('throw')) {
        fixedLines.push(`${indent}if (${condition}) {`);
        fixedLines.push(`${indent}  ${statement};`);
        fixedLines.push(`${indent}}`);
        count++;
        continue;
      }
      
      // Diğer tek satırlık statement'lar (score++, variable = value, etc.)
      if (statement && !statement.includes('{') && !statement.includes('(')) {
        fixedLines.push(`${indent}if (${condition}) {`);
        fixedLines.push(`${indent}  ${statement};`);
        fixedLines.push(`${indent}}`);
        count++;
        continue;
      }
    }
    
    // if (condition) return value; (tek satır, return ile başlayan)
    const ifReturnPattern = /^(\s*)if\s*\(([^)]+)\)\s+return\s+([^;]+);\s*$/;
    const returnMatch = trimmed.match(ifReturnPattern);
    if (returnMatch) {
      const indent = returnMatch[1];
      const condition = returnMatch[2];
      const returnValue = returnMatch[3];
      fixedLines.push(`${indent}if (${condition}) {`);
      fixedLines.push(`${indent}  return ${returnValue};`);
      fixedLines.push(`${indent}}`);
      count++;
      continue;
    }
    
    // if (condition) return; (return değersiz)
    const ifReturnVoidPattern = /^(\s*)if\s*\(([^)]+)\)\s+return;\s*$/;
    const returnVoidMatch = trimmed.match(ifReturnVoidPattern);
    if (returnVoidMatch) {
      const indent = returnVoidMatch[1];
      const condition = returnVoidMatch[2];
      fixedLines.push(`${indent}if (${condition}) {`);
      fixedLines.push(`${indent}  return;`);
      fixedLines.push(`${indent}}`);
      count++;
      continue;
    }
    
    fixedLines.push(line);
  }
  
  return { fixed: fixedLines.join('\n'), count };
}

/**
 * Any type kullanımlarını düzeltir
 */
function fixAnyTypes(content: string): { fixed: string; count: number } {
  let fixed = content;
  let count = 0;
  
  // const variable: any = ... -> const variable: unknown = ...
  // Ancak Record<string, any> gibi durumlar için özel işlem
  const anyPatterns = [
    // const sanitized: any = {} -> const sanitized: Record<string, unknown> = {}
    {
      pattern: /const\s+(\w+):\s*any\s*=\s*\{\}/g,
      replacement: 'const $1: Record<string, unknown> = {}',
      description: 'Object initialization'
    },
    // (obj as any)[key] -> (obj as Record<string, unknown>)[key]
    {
      pattern: /\(([^)]+)\s+as\s+any\)\[/g,
      replacement: '($1 as Record<string, unknown>)[',
      description: 'Object property access'
    },
    // catch (err: any) -> catch (err: unknown)
    {
      pattern: /catch\s*\(\s*(\w+):\s*any\s*\)/g,
      replacement: 'catch ($1: unknown)',
      description: 'Error handler'
    },
  ];
  
  for (const { pattern, replacement, description } of anyPatterns) {
    const matches = fixed.match(pattern);
    if (matches) {
      fixed = fixed.replace(pattern, replacement);
      count += matches.length;
    }
  }
  
  return { fixed, count };
}

function processFile(filePath: string, stats: FixStats): void {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Curly braces düzelt
    const curlyResult = fixCurlyBraces(content);
    let updatedContent = curlyResult.fixed;
    stats.curlyBracesFixed += curlyResult.count;
    
    // Any type düzelt (sadece kritik dosyalar için)
    if (filePath.includes('lib/utils/sanitize.ts') || 
        filePath.includes('lib/') || 
        filePath.includes('app/')) {
      const anyResult = fixAnyTypes(updatedContent);
      updatedContent = anyResult.fixed;
      stats.anyTypesFixed += anyResult.count;
    }
    
    // Değişiklik varsa dosyayı kaydet
    if (updatedContent !== content) {
      fs.writeFileSync(filePath, updatedContent, 'utf-8');
      stats.filesProcessed++;
    }
  } catch (error) {
    stats.errors.push(`Error processing ${filePath}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function main() {
  console.log('🔍 ESLint ve TypeScript hatalarını düzeltme başlatılıyor...\n');
  
  const stats: FixStats = {
    filesProcessed: 0,
    curlyBracesFixed: 0,
    anyTypesFixed: 0,
    errors: [],
  };
  
  // İşlenecek dizinler
  const directories = ['app', 'lib', 'components'];
  
  for (const dir of directories) {
    if (fs.existsSync(dir)) {
      console.log(`📁 ${dir} dizini taranıyor...`);
      const files = findFiles(dir);
      console.log(`   ${files.length} dosya bulundu`);
      
      for (const file of files) {
        processFile(file, stats);
      }
    }
  }
  
  // Sonuçları göster
  console.log('\n✅ Düzeltme tamamlandı!\n');
  console.log('📊 İstatistikler:');
  console.log(`   İşlenen dosya: ${stats.filesProcessed}`);
  console.log(`   Curly braces düzeltmesi: ${stats.curlyBracesFixed}`);
  console.log(`   Any type düzeltmesi: ${stats.anyTypesFixed}`);
  
  if (stats.errors.length > 0) {
    console.log(`\n⚠️  ${stats.errors.length} hata oluştu:`);
    stats.errors.forEach((error) => console.log(`   - ${error}`));
  }
  
  console.log('\n💡 Şimdi `npm run lint` ve `npm run build` komutlarını çalıştırarak doğrulayın.');
}

main();

