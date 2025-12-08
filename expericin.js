const fs = require("fs");
const path = require("path");

const root = path.join(process.cwd(), "app");
const output = [];

function walk(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      walk(full);
    } else if (file === "page.tsx" || file === "page.jsx") {
      const content = fs.readFileSync(full, "utf8");
      output.push(`
===============================
FILE: ${full.replace(process.cwd(), "")}
===============================

${content}

`);
    }
  }
}

walk(root);

// OUTPUT DOSYASINA YAZ
fs.writeFileSync("ALL_PAGES_OUTPUT.txt", output.join("\n\n"), "utf8");

console.log("✔ Tüm page.tsx dosyaları ALL_PAGES_OUTPUT.txt içine yazıldı.");
