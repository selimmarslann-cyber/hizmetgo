const fs = require('fs');

const filesToFix = [
  'app/(customer)/account/profile/AccountProfilePageClient.tsx',
  'app/(customer)/account/settings/AccountSettingsPageClient.tsx',
  'app/(customer)/account/wallet/AccountWalletPageClient.tsx',
  'app/(customer)/earn/EarnPageClient.tsx',
  'app/(public)/admin/login/AdminLoginPageClient.tsx',
  'app/(customer)/request/ServicesPageClient.tsx',
  'app/(public)/support/help/SupportHelpPageClient.tsx',
  'app/(public)/auth/phone-login/PhoneLoginPageClient.tsx',
  'app/(customer)/jobs/CustomerJobsPageClient.tsx',
  'components/home/RotatingHeadline.tsx',
  'components/support/SupportCategoryForm.tsx',
  'app/(customer)/request/success/page.tsx',
  'components/home/MobileDemo.tsx',
];

let fixedCount = 0;
let errorCount = 0;

function removeWrongGuards(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Pattern 1: Guard in function/callback (before return statement)
    // Match: "if (!MotionComponents) return null;\n\n      return;"
    const pattern1 = /if \(!MotionComponents\) return null;\s*\n\s*return;/g;
    if (pattern1.test(content)) {
      content = content.replace(pattern1, 'return;');
      modified = true;
    }

    // Pattern 2: Guard in useEffect cleanup
    // Match: "if (!MotionComponents) return null;\n\n    return () =>"
    const pattern2 = /if \(!MotionComponents\) return null;\s*\n\s*return \(\) =>/g;
    if (pattern2.test(content)) {
      content = content.replace(pattern2, 'return () =>');
      modified = true;
    }

    // Pattern 3: Guard in map callback
    // Match: "if (!MotionComponents) return null;\n\n            return {"
    const pattern3 = /if \(!MotionComponents\) return null;\s*\n\s*return \{/g;
    if (pattern3.test(content)) {
      content = content.replace(pattern3, 'return {');
      modified = true;
    }

    // Pattern 4: Guard in useEffect before return
    // Match: "if (!MotionComponents) return null;\n\n      return; // TS"
    const pattern4 = /if \(!MotionComponents\) return null;\s*\n\s*return; \/\/ TS/g;
    if (pattern4.test(content)) {
      content = content.replace(pattern4, 'return; // TS');
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed: ${filePath}`);
      fixedCount++;
    } else {
      console.log(`⏭️  No changes needed: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    errorCount++;
  }
}

console.log('🚀 Removing wrong guards from functions/callbacks...');
filesToFix.forEach(removeWrongGuards);
console.log(`\n✨ Done! Fixed: ${fixedCount}, Errors: ${errorCount}`);

