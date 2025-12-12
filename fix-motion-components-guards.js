const fs = require('fs');
const path = require('path');

const targetFiles = [
  'components/home/MobileDemo.tsx',
  'app/(customer)/request/success/page.tsx',
  'components/support/SupportCategoryForm.tsx',
  'components/home/RotatingHeadline.tsx',
  'app/(business)/business/jobs/BusinessJobsPageClient.tsx',
  'app/(business)/business/jobs/available/AvailableJobsPageClient.tsx',
  'app/(customer)/jobs/CustomerJobsPageClient.tsx',
  'app/(public)/download/DownloadPageClient.tsx',
  'app/orders/[id]/success/OrderSuccessPageClient.tsx',
  'app/(customer)/jobs/job/[id]/JobDetailPageClient.tsx',
  'app/(public)/support/help/SupportHelpPageClient.tsx',
  'app/(public)/auth/required/AuthRequiredPageClient.tsx',
  'app/(public)/auth/phone-login/PhoneLoginPageClient.tsx',
  'app/(public)/auth/login/LoginPageClient.tsx',
  'app/(public)/auth/email-login/EmailLoginPageClient.tsx',
  'app/(public)/admin/login/AdminLoginPageClient.tsx',
  'app/(customer)/request/ServicesPageClient.tsx',
  'app/(customer)/partner/PartnerPageClient.tsx',
  'app/(customer)/notifications/NotificationsPageClient.tsx',
  'app/(customer)/earn/EarnPageClient.tsx',
  'app/(customer)/account/wallet/AccountWalletPageClient.tsx',
  'app/(customer)/account/settings/AccountSettingsPageClient.tsx',
  'app/(customer)/account/profile/AccountProfilePageClient.tsx',
];

let fixedCount = 0;
let skippedCount = 0;
let errorCount = 0;

function applyFix(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');

    // Check if MotionComponents is used
    if (!content.includes('MotionComponents.')) {
      skippedCount++;
      return;
    }

    // Check if guard already exists
    if (content.includes('if (!MotionComponents) return null;')) {
      skippedCount++;
      return;
    }

    // Find the main return statement (not inside if/function blocks)
    // Look for patterns like: "  return (" or "  return <" or "  return null;" or "  return ("
    // We need to find the top-level return in the component
    
    // Strategy: Find all return statements and check if they're at the component level
    // We'll look for return statements that come after function definitions but before closing braces
    
    // More specific: Find return statements that are at the same indentation level as the component function body
    // Pattern: lines starting with spaces followed by "return"
    
    // Better approach: Find the last "return (" before the closing brace of the component
    // We'll insert the guard right before the first return statement that uses MotionComponents
    
    // Find all return statements
    const returnMatches = [];
    const lines = content.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // Match return statements (but not in comments)
      if (line.trim().startsWith('return') && !line.trim().startsWith('//')) {
        returnMatches.push({ line: i, content: line });
      }
    }
    
    // Find the first return that uses MotionComponents after it
    let insertIndex = -1;
    for (let i = 0; i < returnMatches.length; i++) {
      const returnLine = returnMatches[i].line;
      // Check if MotionComponents is used after this return
      const afterReturn = lines.slice(returnLine + 1).join('\n');
      if (afterReturn.includes('MotionComponents.')) {
        insertIndex = returnLine;
        break;
      }
    }
    
    if (insertIndex === -1) {
      // Fallback: find the last return statement
      if (returnMatches.length > 0) {
        insertIndex = returnMatches[returnMatches.length - 1].line;
      }
    }
    
    if (insertIndex === -1) {
      console.log(`⚠️  Could not find return statement in ${filePath}`);
      skippedCount++;
      return;
    }
    
    // Get the indentation of the return statement
    const returnLine = lines[insertIndex];
    const indentMatch = returnLine.match(/^(\s*)/);
    const indent = indentMatch ? indentMatch[1] : '';
    
    // Insert the guard before the return statement
    const guardLine = `${indent}if (!MotionComponents) return null;\n`;
    
    // Check if there's already a similar guard nearby
    const beforeReturn = lines.slice(Math.max(0, insertIndex - 5), insertIndex).join('\n');
    if (beforeReturn.includes('if (!MotionComponents') || beforeReturn.includes('if (!mounted || !MotionComponents')) {
      console.log(`⚠️  Guard already exists near return in ${filePath}`);
      skippedCount++;
      return;
    }
    
    // Insert the guard
    lines.splice(insertIndex, 0, guardLine);
    
    fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
    console.log(`✅ Fixed: ${filePath}`);
    fixedCount++;
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    errorCount++;
  }
}

console.log('🚀 Starting MotionComponents guard fixes...');
targetFiles.forEach(applyFix);
console.log(`\n✨ Done! Fixed: ${fixedCount}, Skipped: ${skippedCount}, Errors: ${errorCount}`);

