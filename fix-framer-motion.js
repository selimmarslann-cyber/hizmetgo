const fs = require('fs');
const path = require('path');

// Düzeltilecek dosyalar
const filesToFix = [
  'app/(customer)/notifications/NotificationsPageClient.tsx',
  'app/(customer)/account/profile/AccountProfilePageClient.tsx',
  'app/(customer)/jobs/job/[id]/JobDetailPageClient.tsx',
  'app/(business)/business/jobs/BusinessJobsPageClient.tsx',
  'app/(customer)/jobs/CustomerJobsPageClient.tsx',
  'app/(public)/auth/phone-login/PhoneLoginPageClient.tsx',
  'app/(customer)/earn/EarnPageClient.tsx',
  'app/(customer)/account/wallet/AccountWalletPageClient.tsx',
  'app/(customer)/account/AccountDashboardPageClient.tsx',
  'app/(public)/support/help/SupportHelpPageClient.tsx',
  'app/(business)/business/jobs/available/AvailableJobsPageClient.tsx',
  'app/(public)/admin/login/AdminLoginPageClient.tsx',
  'app/(public)/auth/email-login/EmailLoginPageClient.tsx',
  'app/(public)/auth/login/LoginPageClient.tsx',
  'app/(customer)/partner/PartnerPageClient.tsx',
  'app/(customer)/request/ServicesPageClient.tsx',
  'app/orders/[id]/success/OrderSuccessPageClient.tsx',
  'app/(public)/download/DownloadPageClient.tsx',
  'app/(public)/auth/required/AuthRequiredPageClient.tsx',
  'app/(customer)/account/settings/AccountSettingsPageClient.tsx',
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

    // 1. framer-motion import'unu kaldır
    content = content.replace(
      /import\s+.*from\s+["']framer-motion["'];?\s*\n/g,
      ''
    );

    // 2. useState ve useEffect import'larını kontrol et ve ekle
    const hasUseState = content.includes('useState');
    const hasUseEffect = content.includes('useEffect');

    if (!hasUseState || !hasUseEffect) {
      // React import'unu bul ve güncelle
      const reactImportMatch = content.match(/import\s+.*from\s+["']react["'];?/);
      if (reactImportMatch) {
        const reactImport = reactImportMatch[0];
        let newImports = [];
        if (reactImport.includes('useState') || hasUseState) {
          newImports.push('useState');
        }
        if (reactImport.includes('useEffect') || hasUseEffect) {
          newImports.push('useEffect');
        }
        if (!hasUseState) newImports.push('useState');
        if (!hasUseEffect) newImports.push('useEffect');
        
        if (newImports.length > 0) {
          const existingImports = reactImport.match(/\{([^}]+)\}/)?.[1] || '';
          const allImports = [...new Set([...existingImports.split(',').map(i => i.trim()).filter(Boolean), ...newImports])];
          content = content.replace(
            reactImport,
            `import { ${allImports.join(', ')} } from "react";`
          );
        }
      } else {
        // React import'u yoksa ekle
        const firstImportIndex = content.indexOf('import');
        if (firstImportIndex !== -1) {
          content = content.slice(0, firstImportIndex) + 
            `import { useState, useEffect } from "react";\n` + 
            content.slice(firstImportIndex);
        }
      }
    }

    // 3. Component fonksiyonunu bul ve state'leri ekle
    const componentMatch = content.match(/(export\s+(default\s+)?function\s+\w+[^{]*\{)/);
    if (componentMatch) {
      const componentStart = componentMatch.index + componentMatch[0].length;
      const nextBrace = content.indexOf('{', componentStart);
      const afterBrace = content.indexOf('\n', nextBrace);
      
      // State'lerin zaten var olup olmadığını kontrol et
      const hasMountedState = content.includes('const [mounted');
      const hasMotionComponents = content.includes('MotionComponents');
      
      if (!hasMountedState || !hasMotionComponents) {
        const stateCode = `
  const [mounted, setMounted] = useState(false);
  const [MotionComponents, setMotionComponents] = useState<{
    MotionDiv: any;
    MotionSpan?: any;
    MotionButton?: any;
    MotionP?: any;
    AnimatePresence?: any;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
    import("framer-motion").then((mod) => {
      setMotionComponents({
        MotionDiv: mod.motion.div,
        MotionSpan: mod.motion.span,
        MotionButton: mod.motion.button,
        MotionP: mod.motion.p,
        AnimatePresence: mod.AnimatePresence,
      });
    });
  }, []);`;

        // İlk useState veya useEffect'ten önce ekle
        const firstStateMatch = content.match(/(const\s+\[|useEffect|useState)/);
        if (firstStateMatch && firstStateMatch.index > componentStart) {
          content = content.slice(0, firstStateMatch.index) + stateCode + '\n' + content.slice(firstStateMatch.index);
        } else {
          // Component'in başına ekle
          content = content.slice(0, afterBrace + 1) + stateCode + content.slice(afterBrace + 1);
        }
      }
    }

    // 4. motion.* kullanımlarını MotionComponents.* ile değiştir
    // motion.div -> MotionComponents.MotionDiv
    content = content.replace(/\bmotion\.div\b/g, 'MotionComponents.MotionDiv');
    content = content.replace(/\bmotion\.span\b/g, 'MotionComponents.MotionSpan');
    content = content.replace(/\bmotion\.button\b/g, 'MotionComponents.MotionButton');
    content = content.replace(/\bmotion\.p\b/g, 'MotionComponents.MotionP');
    content = content.replace(/\bAnimatePresence\b/g, 'MotionComponents.AnimatePresence');

    // 5. <motion. ve </motion. tag'lerini düzelt
    content = content.replace(/<motion\.div/g, '<MotionComponents.MotionDiv');
    content = content.replace(/<\/motion\.div>/g, '</MotionComponents.MotionDiv>');
    content = content.replace(/<motion\.span/g, '<MotionComponents.MotionSpan');
    content = content.replace(/<\/motion\.span>/g, '</MotionComponents.MotionSpan>');
    content = content.replace(/<motion\.button/g, '<MotionComponents.MotionButton');
    content = content.replace(/<\/motion\.button>/g, '</MotionComponents.MotionButton>');
    content = content.replace(/<motion\.p/g, '<MotionComponents.MotionP');
    content = content.replace(/<\/motion\.p>/g, '</MotionComponents.MotionP>');

    // 6. suppressHydrationWarning ekle (motion component'lerine)
    content = content.replace(
      /(<MotionComponents\.Motion\w+[^>]*)(>)/g,
      '$1 suppressHydrationWarning$2'
    );

    // 7. Early return ekle (mounted kontrolü)
    // Bu kısım manuel olarak yapılmalı çünkü her component'in yapısı farklı
    // Ama genel bir pattern ekleyebiliriz: return statement'ından önce kontrol ekle
    const returnMatch = content.match(/(\s+)(return\s+\()/);
    if (returnMatch && !content.includes('if (!mounted || !MotionComponents)')) {
      const indent = returnMatch[1];
      const earlyReturn = `${indent}if (!mounted || !MotionComponents) {\n${indent}  return null; // or appropriate fallback\n${indent}}\n\n`;
      content = content.replace(returnMatch[0], earlyReturn + returnMatch[0]);
    }

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
console.log('🚀 Starting framer-motion fixes...\n');
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

