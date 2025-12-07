/**
 * Quick Speed Test Script
 * Tests API endpoints response times
 */

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

async function testEndpoint(name, url) {
  const start = Date.now();
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const end = Date.now();
    const duration = end - start;
    const status = response.ok ? "✅" : "❌";
    return { name, url, duration, status, ok: response.ok };
  } catch (error) {
    const end = Date.now();
    return {
      name,
      url,
      duration: end - start,
      status: "❌",
      ok: false,
      error: error.message,
    };
  }
}

async function runSpeedTest() {
  console.log("🚀 Hizmetgo Speed Test\n");
  console.log(`Testing: ${BASE_URL}\n`);

  const endpoints = [
    { name: "Homepage", url: "/" },
    { name: "Map Page", url: "/map" },
    { name: "API: Categories", url: "/api/service-categories" },
    { name: "API: Instant Jobs", url: "/api/instant-jobs" },
  ];

  const results = [];

  for (const endpoint of endpoints) {
    const result = await testEndpoint(endpoint.name, endpoint.url);
    results.push(result);

    const color = result.ok ? "\x1b[32m" : "\x1b[31m";
    const reset = "\x1b[0m";
    console.log(
      `${color}${result.status}${reset} ${result.name.padEnd(25)} ${result.duration.toString().padStart(5)}ms`,
    );

    // Small delay
    await new Promise((r) => setTimeout(r, 100));
  }

  console.log("\n📊 Summary:");
  const avg = results.reduce((sum, r) => sum + r.duration, 0) / results.length;
  const min = Math.min(...results.map((r) => r.duration));
  const max = Math.max(...results.map((r) => r.duration));
  const success = results.filter((r) => r.ok).length;

  console.log(`  Average: ${avg.toFixed(0)}ms`);
  console.log(`  Min: ${min}ms`);
  console.log(`  Max: ${max}ms`);
  console.log(`  Success: ${success}/${results.length}`);

  // Rating
  let rating = "🟢 Excellent";
  if (avg > 1000) rating = "🔴 Poor";
  else if (avg > 500) rating = "🟡 Fair";
  else if (avg > 200) rating = "🟠 Good";

  console.log(`\n  ${rating}\n`);
}

runSpeedTest().catch(console.error);
