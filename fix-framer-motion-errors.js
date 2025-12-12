const fs = require('fs');
const path = require('path');

// Düzeltilecek dosyalar
const filesToFix = [
  'app/(business)/business/jobs/BusinessJobsPageClient.tsx',
  'app/(customer)/account/settings/AccountSettingsPageClient.tsx',
  'app/(public)/auth/required/AuthRequiredPageClient.tsx',
  'app/(public)/download/DownloadPageClient.tsx',
  'app/orders/[id]/success/OrderSuccessPageClient.tsx',
  'app/(customer)/request/ServicesPageClient.tsx',
  'app/(customer)/partner/PartnerPageClient.tsx',
  'app/(public)/auth/login/LoginPageClient.tsx',
  'app/(public)/admin/login/AdminLoginPageClient.tsx',
  'app/(public)/auth/email-login/EmailLoginPageClient.tsx',
  'app/(business)/business/jobs/available/AvailableJobsPageClient.tsx',
  'app/(public)/support/help/SupportHelpPageClient.tsx',
  'app/(customer)/account/wallet/AccountWalletPageClient.tsx',
  'app/(customer)/earn/EarnPageClient.tsx',
  'app/(public)/auth/phone-login/PhoneLoginPageClient.tsx',
  'app/(customer)/jobs/CustomerJobsPageClient.tsx',
  'app/(customer)/jobs/job/[id]/JobDetailPageClient.tsx',
  'app/(customer)/account/profile/AccountProfilePageClient.tsx',
  'app/(customer)/notifications/NotificationsPageClient.tsx',
];

function fixFile(filePath) {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  File not found: ${filePath}`);
      return false;
    }

    let content = fs.readFileSync(fullPath, 'utf8');
    const originalContent = content;

    // 1. MotionComponents.AnimatePresence -> AnimatePresence (type annotation'da)
    content = content.replace(
      /MotionComponents\.AnimatePresence\?/g,
      'AnimatePresence?'
    );

    // 2. mod.MotionComponents.* -> mod.motion.* veya mod.*
    content = content.replace(
      /mod\.MotionComponents\.MotionDiv/g,
      'mod.motion.div'
    );
    content = content.replace(
      /mod\.MotionComponents\.MotionSpan/g,
      'mod.motion.span'
    );
    content = content.replace(
      /mod\.MotionComponents\.MotionButton/g,
      'mod.motion.button'
    );
    content = content.replace(
      /mod\.MotionComponents\.MotionP/g,
      'mod.motion.p'
    );
    content = content.replace(
      /mod\.MotionComponents\.AnimatePresence/g,
      'mod.AnimatePresence'
    );

    if (content !== originalContent) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`✅ Fixed: ${filePath}`);
      return true;
    } else {
      console.log(`⏭️  No changes needed: ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    return false;
  }
}

// Tüm dosyaları düzelt
console.log('🚀 Starting framer-motion error fixes...\n');
let fixed = 0;
let skipped = 0;
let errors = 0;

filesToFix.forEach(file => {
  const result = fixFile(file);
  if (result === true) fixed++;
  else if (result === false) skipped++;
  else errors++;
});

console.log(`\n✨ Done! Fixed: ${fixed}, Skipped: ${skipped}, Errors: ${errors}`);

