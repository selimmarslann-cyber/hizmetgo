// diagnose-routes.js
// Next.js 14 App Router için route / layout / use client diagnostik scripti

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const APP_DIR = path.join(ROOT, "app");

console.log("🏁 Next Route Diagnostik başlıyor...");
console.log("📂 ROOT:", ROOT);
console.log("📂 APP_DIR:", APP_DIR);

// --------------------------------------------------
// Yardımcı fonksiyonlar
// --------------------------------------------------

if (!fs.existsSync(APP_DIR)) {
  console.error("❌ 'app' klasörü bulunamadı! Komutu proje kökünde çalıştırdığından emin ol.");
  process.exit(1);
}

function walkFiles(dir, filterExt = [".tsx", ".ts"]) {
  const out = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      out.push(...walkFiles(full, filterExt));
    } else if (e.isFile()) {
      if (filterExt.some((ext) => e.name.endsWith(ext))) {
        out.push(full);
      }
    }
  }
  return out;
}

// app/... içinden route path çıkar (group segmentleri (public) gibi URL'de yok say)
function routeFromAppPath(filePath) {
  const rel = path.relative(APP_DIR, filePath).replace(/\\/g, "/");
  const parts = rel.split("/");
  // son eleman page.tsx veya layout.tsx vs.
  parts.pop();
  const urlSegments = parts.filter((seg) => !seg.startsWith("(") && !seg.endsWith(")"));
  if (urlSegments.length === 0) return "/";
  return "/" + urlSegments.join("/");
}

// server file mı? (route/api/middleware)
function isServerFile(filePath) {
  const p = filePath.replace(/\\/g, "/");
  return (
    p.includes("/api/") ||
    p.endsWith("/route.ts") ||
    p.endsWith("/route.tsx") ||
    p.endsWith("/middleware.ts") ||
    p.endsWith("/middleware.tsx")
  );
}

function hasGenerateMetadata(code) {
  return (
    code.includes("export async function generateMetadata") ||
    code.includes("export const metadata")
  );
}

const HOOK_PATTERNS = [
  /useState\s*\(/,
  /useEffect\s*\(/,
  /useContext\s*\(/,
  /useReducer\s*\(/,
  /useRef\s*\(/,
  /useLayoutEffect\s*\(/,
  /useMemo\s*\(/,
  /useCallback\s*\(/,
  /useRouter\s*\(/,
  /useSearchParams\s*\(/,
  /usePathname\s*\(/,
];

function usesClientHooks(code) {
  return HOOK_PATTERNS.some((re) => re.test(code));
}

function hasUseClientTop(code) {
  const lines = code.split("\n").slice(0, 5);
  return lines.some((l) => {
    const t = l.trim();
    return t === `"use client";` || t === `'use client';`;
  });
}

function hasDefaultExportReactComponent(code) {
  // basit kontrol: export default function veya export default Something
  return /export\s+default\s+function/.test(code) || /export\s+default\s+\w+/.test(code);
}

// --------------------------------------------------
// Tarama
// --------------------------------------------------

const allFiles = walkFiles(APP_DIR, [".tsx", ".ts"]);
const pageFiles = allFiles.filter((p) => p.endsWith("page.tsx"));
const layoutFiles = allFiles.filter((p) => p.endsWith("layout.tsx"));

console.log(`\n🔎 Bulunan page.tsx sayısı: ${pageFiles.length}`);
console.log(`🔎 Bulunan layout.tsx sayısı: ${layoutFiles.length}`);

// Route -> page dosyaları eşlemesi
const routeMap = new Map();
for (const p of pageFiles) {
  const route = routeFromAppPath(p);
  if (!routeMap.has(route)) routeMap.set(route, []);
  routeMap.get(route).push(p);
}

// --------------------------------------------------
// 1) Route çakışmaları
// --------------------------------------------------
console.log("\n=== 1) Route Çakışmaları (Aynı route'a birden fazla page.tsx) ===");
let hasRouteConflict = false;
for (const [route, files] of routeMap.entries()) {
  if (files.length > 1) {
    hasRouteConflict = true;
    console.log(`⚠️  Route çakışması: "${route}" için ${files.length} adet page.tsx var:`);
    files.forEach((f) => console.log("    - " + path.relative(ROOT, f)));
  }
}
if (!hasRouteConflict) {
  console.log("✅ Route çakışması yok (her route için tek page.tsx).");
}

// Özellikle root (/) için hangi dosya kullanılıyor?
console.log("\n=== 2) Root '/' hangi dosyalardan geliyor? ===");
const rootPages = routeMap.get("/") || [];
if (rootPages.length === 0) {
  console.log("⚠️  '/' için hiç page.tsx bulunamadı. Anasayfa tanımlı olmayabilir.");
} else if (rootPages.length === 1) {
  console.log("✅ '/' rotası şu dosyadan geliyor:");
  console.log("   - " + path.relative(ROOT, rootPages[0]));
} else {
  console.log("⚠️  '/' rotası için birden fazla page.tsx bulundu:");
  rootPages.forEach((f) => console.log("   - " + path.relative(ROOT, f)));
}

// --------------------------------------------------
// 3) Layout kontrolleri (children var mı, use client vs.)
// --------------------------------------------------
console.log("\n=== 3) layout.tsx kontrolleri ===");
for (const layoutPath of layoutFiles) {
  const rel = path.relative(ROOT, layoutPath).replace(/\\/g, "/");
  const code = fs.readFileSync(layoutPath, "utf8");
  const route = routeFromAppPath(layoutPath);

  console.log(`\n📄 Layout: ${rel} (route base: "${route}")`);

  if (!code.includes("{children}")) {
    console.log("  ⚠️  Bu layout içinde {children} bulunamadı. Alt sayfalar render olmayabilir.");
  } else {
    console.log("  ✅ {children} bulundu.");
  }

  if (hasUseClientTop(code)) {
    console.log("  ⚠️  Bu layout 'use client' ile işaretlenmiş. Root/layout genelde server olmalı, dikkat.");
  } else {
    console.log("  ✅ 'use client' directive'i yok (server layout gibi davranır).");
  }
}

// --------------------------------------------------
// 4) page.tsx dosyalarında default export & hook/use client kontrolü
// --------------------------------------------------
console.log("\n=== 4) page.tsx client/server ve default export kontrolleri ===");

for (const pagePath of pageFiles) {
  const rel = path.relative(ROOT, pagePath).replace(/\\/g, "/");
  const code = fs.readFileSync(pagePath, "utf8");
  const route = routeFromAppPath(pagePath);

  console.log(`\n📄 Page: ${rel} (route: "${route}")`);

  // default export var mı?
  if (!hasDefaultExportReactComponent(code)) {
    console.log("  ❌ Bu page.tsx içinde 'export default' React component bulunamadı. Anasayfa/bu sayfa boş kalabilir.");
  } else {
    console.log("  ✅ export default bulundu.");
  }

  const server = isServerFile(pagePath);
  const meta = hasGenerateMetadata(code);
  const usesHooks = usesClientHooks(code);
  const hasUC = hasUseClientTop(code);

  if (server) {
    console.log("  ℹ️ Bu dosya server file gibi görünüyor (route/api/middleware), normal page değil.");
    continue;
  }

  if (meta && usesHooks && hasUC) {
    console.log("  ⚠️ generateMetadata + 'use client' + client hook aynı dosyada. Next buna izin vermez, metadata'yı ayırman gerek.");
  } else if (meta && hasUC) {
    console.log("  ⚠️ Hem generateMetadata hem 'use client' aynı dosyada. Metadata server'da çalışmalı, bu dosyayı böl.");
  }

  if (usesHooks && !hasUC && !meta) {
    console.log("  ⚠️ Client hook kullanıyor (useState/useRouter vs.) ama 'use client' yok.");
  } else if (usesHooks && hasUC) {
    console.log("  ✅ Client hook + 'use client' uyumlu görünüyor.");
  } else if (!usesHooks) {
    console.log("  ℹ️ Client hook kullanılmıyor (muhtemelen server component).");
  }
}

// --------------------------------------------------
// 5) Genel özet
// --------------------------------------------------
console.log("\n=== 5) Özet ===");
if (rootPages.length === 0) {
  console.log("⚠️  Anasayfa için '/' rotasına bağlı herhangi bir page.tsx bulunamadı.");
}
if (hasRouteConflict) {
  console.log("⚠️  Bazı route'lar birden fazla page.tsx ile tanımlanmış. Bunlar çakışmaya sebep olabilir.");
}
console.log("✅ Diagnostik tamamlandı. Yukarıdaki uyarılara göre dosyaları düzenleyebilirsin.");
