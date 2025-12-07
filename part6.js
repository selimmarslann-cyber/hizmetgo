// use-client-fix.js
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const APP_DIR = path.join(ROOT, "app");

console.log("🏁 use-client fixer başlıyor...");
console.log("📂 ROOT:", ROOT);
console.log("📂 APP_DIR:", APP_DIR);

// app klasörü var mı?
if (!fs.existsSync(APP_DIR)) {
  console.error("❌ 'app' klasörü bulunamadı! Yanlış dizindesin.");
  process.exit(1);
}

function walkTSX(dir, out = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkTSX(full, out);
    } else if (entry.isFile() && entry.name.endsWith(".tsx")) {
      out.push(full);
    }
  }
  return out;
}

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

function hasGenerateMetadata(text) {
  return (
    text.includes("export async function generateMetadata") ||
    text.includes("export const metadata")
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

function usesClientHooks(text) {
  return HOOK_PATTERNS.some((re) => re.test(text));
}

function hasUseClientDirectiveAtTop(text) {
  // İlk birkaç satırda kontrol et
  const lines = text.split("\n").slice(0, 5);
  return lines.some((l) => l.trim() === `"use client";` || l.trim() === `'use client';`);
}

function normalizeUseClient(text) {
  if (!text.includes("use client")) return { text, changed: false };

  const lines = text.split("\n");
  const filtered = lines.filter(
    (l) => !l.trim().startsWith(`"use client"`) && !l.trim().startsWith(`'use client'`)
  );

  const newText = `"use client";\n\n` + filtered.join("\n");
  return { text: newText, changed: true };
}

function fixFile(filePath) {
  let code = fs.readFileSync(filePath, "utf8");
  const original = code;

  console.log("\n📄 Dosya:", filePath);

  const server = isServerFile(filePath);
  const hasMeta = hasGenerateMetadata(code);
  const usesHooks = usesClientHooks(code);
  const hasUseClientTop = hasUseClientDirectiveAtTop(code);

  if (server) {
    console.log("  ℹ️ Server dosyası (route/api/middleware), dokunulmadı.");
    return;
  }

  // generateMetadata varsa client yapamayız, sadece uyar
  if (hasMeta && usesHooks) {
    console.warn(
      "  ⚠️ generateMetadata + client hook aynı dosyada. Buraya 'use client' EKLENMEDİ, manuel ayırman lazım."
    );
    return;
  }

  let changed = false;

  // Eğer zaten directive var ama üstte düzgün değilse → normalize
  if (!server && code.includes("use client")) {
    const { text, changed: c } = normalizeUseClient(code);
    code = text;
    changed = changed || c;
    if (c) console.log("  🔧 'use client' en üste taşındı.");
  }

  // Client hook kullanıp hiç use client yoksa → ekle
  if (!hasUseClientTop && usesHooks && !hasMeta && !server) {
    code = `"use client";\n\n` + code;
    changed = true;
    console.log("  🔧 client hook tespit edildi, 'use client' eklendi.");
  }

  if (changed && code !== original) {
    fs.writeFileSync(filePath, code, "utf8");
    console.log("  ✅ Değişiklik kaydedildi.");
  } else {
    console.log("  ℹ️ Değişiklik gerekmedi.");
  }
}

function run() {
  console.log("🔎 app içindeki tüm .tsx dosyaları taranıyor...");
  const files = walkTSX(APP_DIR);
  console.log(`📦 Bulunan .tsx dosyası: ${files.length}`);

  files.forEach(fixFile);

  console.log("\n🎉 use-client fixer bitti.");
}

run();
