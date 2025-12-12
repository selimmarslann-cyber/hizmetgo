const fs = require('fs');
const path = require('path');

const targetFiles = [
  'components/home/MobileDemo.tsx',
  'app/(customer)/request/success/page.tsx',
  'components/support/SupportCategoryForm.tsx',
  'components/home/RotatingHeadline.tsx',
  'app/(customer)/jobs/CustomerJobsPageClient.tsx',
  'app/(public)/support/help/SupportHelpPageClient.tsx',
  'app/(public)/auth/phone-login/PhoneLoginPageClient.tsx',
  'app/(customer)/request/ServicesPageClient.tsx',
  'app/(public)/admin/login/AdminLoginPageClient.tsx',
  'app/(customer)/earn/EarnPageClient.tsx',
  'app/(customer)/account/wallet/AccountWalletPageClient.tsx',
];

let fixedCount = 0;
let skippedCount = 0;
let errorCount = 0;

function checkAndAddGuard(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');

    // Check if MotionComponents is used
    if (!content.includes('MotionComponents.')) {
      skippedCount++;
      return;
    }

    // Check if guard already exists at component level (before main return)
    // Look for pattern: "if (!MotionComponents) return null;" before "return ("
    const lines = content.split('\n');
    
    // Find all return statements
    let mainReturnIndex = -1;
    let guardBeforeReturn = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Find main return (not in nested functions)
      if (line.trim().startsWith('return (') && mainReturnIndex === -1) {
        // Check if this is likely the main return (has proper indentation)
        const indent = line.match(/^(\s*)/)[1];
        if (indent.length <= 2) { // Component level return
          mainReturnIndex = i;
          
          // Check if guard exists before this return (within 5 lines)
          for (let j = Math.max(0, i - 5); j < i; j++) {
            if (lines[j].includes('if (!MotionComponents) return null;')) {
              guardBeforeReturn = true;
              break;
            }
          }
          break;
        }
      }
    }
    
    if (mainReturnIndex === -1) {
      console.log(`⚠️  Could not find main return in ${filePath}`);
      skippedCount++;
      return;
    }
    
    if (guardBeforeReturn) {
      console.log(`⏭️  Guard already exists: ${filePath}`);
      skippedCount++;
      return;
    }
    
    // Add guard before main return
    const returnLine = lines[mainReturnIndex];
    const indentMatch = returnLine.match(/^(\s*)/);
    const indent = indentMatch ? indentMatch[1] : '';
    
    lines.splice(mainReturnIndex, 0, `${indent}if (!MotionComponents) return null;`);
    
    fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
    console.log(`✅ Fixed: ${filePath}`);
    fixedCount++;
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    errorCount++;
  }
}

console.log('🚀 Checking and adding guards...');
targetFiles.forEach(checkAndAddGuard);
console.log(`\n✨ Done! Fixed: ${fixedCount}, Skipped: ${skippedCount}, Errors: ${errorCount}`);

