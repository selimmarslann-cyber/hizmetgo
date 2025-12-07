/**
 * API Performance Test
 * Tests specific API endpoints with detailed metrics
 */

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  magenta: "\x1b[35m",
};

async function testAPI(name, url, method = "GET", body = null) {
  const results = [];
  const iterations = 3;

  for (let i = 0; i < iterations; i++) {
    const start = Date.now();
    try {
      const options = {
        method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      if (body) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(`${BASE_URL}${url}`, options);
      const end = Date.now();
      const duration = end - start;

      // Try to parse response to get size
      let responseSize = 0;
      try {
        const text = await response.text();
        responseSize = new Blob([text]).size;
      } catch (e) {
        // Ignore
      }

      results.push({
        duration,
        status: response.status,
        ok: response.ok,
        size: responseSize,
      });
    } catch (error) {
      const end = Date.now();
      results.push({
        duration: end - start,
        error: error.message,
        ok: false,
      });
    }

    // Small delay
    await new Promise((r) => setTimeout(r, 100));
  }

  const validResults = results.filter((r) => r.ok);
  if (validResults.length === 0) {
    return null;
  }

  const durations = validResults.map((r) => r.duration);
  const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
  const min = Math.min(...durations);
  const max = Math.max(...durations);

  return {
    name,
    url,
    avg: Math.round(avg),
    min,
    max,
    successRate: validResults.length / iterations,
    avgSize:
      validResults.reduce((sum, r) => sum + (r.size || 0), 0) /
      validResults.length,
  };
}

async function runAPITests() {
  console.log("\n" + colors.blue + "═".repeat(70) + colors.reset);
  console.log(
    colors.blue +
      "║" +
      " ".repeat(22) +
      "API PERFORMANCE TEST" +
      " ".repeat(25) +
      "║" +
      colors.reset,
  );
  console.log(colors.blue + "═".repeat(70) + colors.reset + "\n");

  console.log(
    `${colors.cyan}Testing API endpoints at: ${BASE_URL}${colors.reset}\n`,
  );

  const endpoints = [
    { name: "Service Categories", url: "/api/service-categories" },
    { name: "Instant Jobs", url: "/api/instant-jobs" },
    { name: "Jobs Available", url: "/api/jobs/available" },
    { name: "Price Guide", url: "/api/price-guide?categoryId=electricity" },
  ];

  const results = [];

  for (const endpoint of endpoints) {
    process.stdout.write(
      `${colors.cyan}Testing ${endpoint.name}...${colors.reset}`,
    );
    const result = await testAPI(endpoint.name, endpoint.url);

    if (result) {
      process.stdout.write(`\r${" ".repeat(50)}\r`);
      results.push(result);

      const rating =
        result.avg < 200
          ? "🟢"
          : result.avg < 500
            ? "🟠"
            : result.avg < 1000
              ? "🟡"
              : "🔴";
      const color =
        result.avg < 200
          ? colors.green
          : result.avg < 500
            ? colors.yellow
            : colors.red;

      console.log(
        `${color}${rating}${colors.reset} ${result.name.padEnd(25)} ${result.avg.toString().padStart(5)}ms (${result.min}-${result.max}ms)`,
      );
      console.log(
        `     Success: ${(result.successRate * 100).toFixed(0)}% | Size: ${(result.avgSize / 1024).toFixed(2)}KB`,
      );
    } else {
      process.stdout.write(`\r${" ".repeat(50)}\r`);
      console.log(
        `${colors.red}❌${colors.reset} ${endpoint.name.padEnd(25)} FAILED`,
      );
    }
    console.log("");
  }

  if (results.length === 0) {
    console.log(`${colors.red}❌ No successful API tests${colors.reset}`);
    console.log(
      `${colors.yellow}⚠️  Make sure the server is running at ${BASE_URL}${colors.reset}\n`,
    );
    return;
  }

  // Summary
  console.log(colors.blue + "─".repeat(70) + colors.reset);
  console.log(colors.cyan + "SUMMARY" + colors.reset + "\n");

  const avg = results.reduce((sum, r) => sum + r.avg, 0) / results.length;
  const min = Math.min(...results.map((r) => r.min));
  const max = Math.max(...results.map((r) => r.max));

  console.log(`Average Response Time: ${avg.toFixed(0)}ms`);
  console.log(`Fastest: ${min}ms`);
  console.log(`Slowest: ${max}ms`);

  let score = 100;
  if (avg > 1000) score = 0;
  else if (avg > 500) score = 50;
  else if (avg > 200) score = 75;

  console.log(`Performance Score: ${colors.cyan}${score}/100${colors.reset}\n`);

  // Recommendations
  if (avg > 500) {
    console.log(colors.yellow + "RECOMMENDATIONS:" + colors.reset);
    console.log("  • Add response caching for frequently accessed endpoints");
    console.log("  • Optimize database queries (add indexes, use select)");
    console.log("  • Consider CDN for static assets");
    console.log("  • Use compression for API responses\n");
  } else if (avg > 200) {
    console.log(colors.green + "Status: Good performance! ✅" + colors.reset);
    console.log("  Minor optimizations could improve response times\n");
  } else {
    console.log(
      colors.green + "Status: Excellent performance! 🎉" + colors.reset + "\n",
    );
  }
}

runAPITests().catch(console.error);
