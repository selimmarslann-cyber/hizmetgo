/**
 * Make .env file read-only
 * This script sets the .env file to read-only to prevent accidental modifications
 */

const fs = require("fs");
const path = require("path");

const envPath = path.join(process.cwd(), ".env");

if (!fs.existsSync(envPath)) {
  console.error("❌ .env file not found at:", envPath);
  process.exit(1);
}

try {
  // Get current file stats
  const stats = fs.statSync(envPath);

  // Set read-only (Windows: remove write permission)
  fs.chmodSync(envPath, 0o444); // Read-only for all (owner, group, others)

  console.log("✅ .env file set to read-only");
  console.log("📝 File can be read but not modified");
  console.log(
    "💡 To make it writable again, run: chmod 644 .env (Linux/Mac) or attrib -R .env (Windows)",
  );
} catch (error) {
  console.error("❌ Error setting .env to read-only:", error.message);
  console.error(
    "💡 You may need to close any programs using the file (like Next.js dev server)",
  );
  process.exit(1);
}
