// scripts/fix-use-client-clean-all.js
// "use client" satırının ÜSTÜNDE ve ALTINDAKİ TÜM boş satırları temizler.

const fs = require("fs");
const path = require("path");

const ROOT = path.join(process.cwd(), "app");

function walk(dir, list = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, list);
    else if (entry.isFile() && full.endsWith(".tsx")) list.push(full);
  }
  return list;
}

function processFile(file) {
  let original = fs.readFileSync(file, "utf8");
  let lines = original.split(/\r?\n/);

  // "use client" satırını bul
  const index = lines.findIndex((l) =>
    /^\s*["']use client["'];?\s*$/.test(l)
  );
  if (index === -1) return;

  let changed = false;

  // 🔥 ÜSTTEKİ tüm boş satırları temizle
  let i = index - 1;
  while (i >= 0 && lines[i].trim() === "") {
    lines.splice(i, 1);
    changed = true;
    i--;
  }

  // 🔥 ALTTAKİ tüm boş satırları temizle
  let j = index + 1;
  while (j < lines.length && lines[j].trim() === "") {
    lines.splice(j, 1);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, lines.join("\n"));
    console.log("Temizlendi →", path.relative(process.cwd(), file));
  }
}

function main() {
  console.log("\n🧹 'use client' etrafındaki boşluklar temizleniyor...\n");
  walk(ROOT).forEach(processFile);
  console.log("\n✅ Tamamdır! Artık 'use client' direkt import'un üstünde.\n");
}

main();
