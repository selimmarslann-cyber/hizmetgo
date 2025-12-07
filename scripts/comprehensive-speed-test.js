/**
 * Comprehensive Speed Test
 * Tests multiple endpoints and provides detailed performance analysis
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

// Test endpoints - önemli API'ler ve sayfalar
const TEST_ENDPOINTS = [
  // Public pages
  { name: "🏠 Homepage", url: "/", type: "page" },
  { name: "🗺️ Map Page", url: "/map", type: "page" },

  // API endpoints
  {
    name: "📋 Service Categories API",
    url: "/api/service-categories",
    type: "api",
  },
  { name: "⚡ Instant Jobs API", url: "/api/instant-jobs", type: "api" },
  { name: "💼 Jobs Available API", url: "/api/jobs/available", type: "api" },
];

// Test a single endpoint multiple times
async function testEndpoint(endpoint, iterations = 5) {
  const results = [];

  for (let i = 0; i < iterations; i++) {
    const start = Date.now();
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(`${BASE_URL}${endpoint.url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const end = Date.now();
      const duration = end - start;

      const contentLength = response.headers.get("content-length") || 0;
      const contentType = response.headers.get("content-type") || "";

      results.push({
        duration,
        status: response.status,
        ok: response.ok,
        size: parseInt(contentLength) || 0,
        contentType,
      });

      // Small delay between requests
      await new Promise((resolve) => setTimeout(resolve, 200));
    } catch (error) {
      const end = Date.now();
      results.push({
        duration: end - start,
        error: error.name === "AbortError" ? "Timeout" : error.message,
        ok: false,
      });
    }
  }

  return results;
}

// Calculate statistics
function calculateStats(results) {
  const validResults = results.filter((r) => r.ok && !r.error);

  if (validResults.length === 0) {
    return null;
  }

  const durations = validResults.map((r) => r.duration);
  const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
  const min = Math.min(...durations);
  const max = Math.max(...durations);
  const sorted = [...durations].sort((a, b) => a - b);
  const median = sorted[Math.floor(sorted.length / 2)];

  // Calculate percentiles
  const p95 = sorted[Math.floor(sorted.length * 0.95)];
  const p99 = sorted[Math.floor(sorted.length * 0.99)];

  // Calculate standard deviation
  const variance =
    durations.reduce((sum, d) => sum + Math.pow(d - avg, 2), 0) /
    durations.length;
  const stdDev = Math.sqrt(variance);

  return {
    avg: Math.round(avg),
    min,
    max,
    median,
    p95,
    p99,
    stdDev: Math.round(stdDev),
    successRate: validResults.length / results.length,
    totalRequests: results.length,
    successfulRequests: validResults.length,
  };
}

// Get performance rating
function getRating(avg) {
  if (avg < 200) return { icon: "🟢", text: "Excellent", color: colors.green };
  if (avg < 500) return { icon: "🟠", text: "Good", color: colors.yellow };
  if (avg < 1000) return { icon: "🟡", text: "Fair", color: colors.yellow };
  return { icon: "🔴", text: "Poor", color: colors.red };
}

// Print header
function printHeader() {
  console.log("\n" + colors.blue + "═".repeat(70) + colors.reset);
  console.log(
    colors.blue +
      "║" +
      " ".repeat(20) +
      "HIZMETGO SPEED TEST" +
      " ".repeat(27) +
      "║" +
      colors.reset,
  );
  console.log(colors.blue + "═".repeat(70) + colors.reset);
  console.log(`\n${colors.cyan}Base URL:${colors.reset} ${BASE_URL}`);
  console.log(
    `${colors.cyan}Test Endpoints:${colors.reset} ${TEST_ENDPOINTS.length}`,
  );
  console.log(`${colors.cyan}Iterations per endpoint:${colors.reset} 5\n`);
}

// Print test result
function printResult(endpoint, stats) {
  if (!stats) {
    console.log(
      `${colors.red}❌ ${endpoint.name.padEnd(40)} FAILED${colors.reset}`,
    );
    return;
  }

  const rating = getRating(stats.avg);

  console.log(`${colors.cyan}${endpoint.name}${colors.reset}`);
  console.log(
    `  ${rating.color}${rating.icon} ${rating.text}${colors.reset} | Avg: ${stats.avg}ms | Min: ${stats.min}ms | Max: ${stats.max}ms`,
  );
  console.log(
    `  Median: ${stats.median}ms | P95: ${stats.p95}ms | P99: ${stats.p99}ms | StdDev: ${stats.stdDev}ms`,
  );
  console.log(
    `  Success Rate: ${(stats.successRate * 100).toFixed(0)}% (${stats.successfulRequests}/${stats.totalRequests})`,
  );
  console.log("");
}

// Print summary
function printSummary(allResults) {
  console.log(colors.blue + "═".repeat(70) + colors.reset);
  console.log(colors.blue + "SUMMARY" + colors.reset);
  console.log(colors.blue + "═".repeat(70) + colors.reset + "\n");

  const successfulResults = allResults.filter((r) => r.stats !== null);

  if (successfulResults.length === 0) {
    console.log(`${colors.red}❌ No successful tests${colors.reset}\n`);
    console.log(
      `${colors.yellow}⚠️  Make sure the server is running at ${BASE_URL}${colors.reset}\n`,
    );
    return;
  }

  // Calculate overall statistics
  const allAvgs = successfulResults.map((r) => r.stats.avg);
  const overallAvg = allAvgs.reduce((a, b) => a + b, 0) / allAvgs.length;
  const overallMin = Math.min(...allAvgs);
  const overallMax = Math.max(...allAvgs);

  // Performance score (0-100)
  let score = 100;
  if (overallAvg > 2000) score = 0;
  else if (overallAvg > 1000) score = 25;
  else if (overallAvg > 500) score = 50;
  else if (overallAvg > 200) score = 75;

  const overallRating = getRating(overallAvg);

  console.log(`${colors.magenta}Overall Performance:${colors.reset}`);
  console.log(
    `  ${overallRating.color}${overallRating.icon} ${overallRating.text}${colors.reset}`,
  );
  console.log(`  Average Response Time: ${overallAvg.toFixed(0)}ms`);
  console.log(`  Fastest: ${overallMin}ms`);
  console.log(`  Slowest: ${overallMax}ms`);
  console.log(
    `  Performance Score: ${colors.cyan}${score}/100${colors.reset}\n`,
  );

  // Detailed breakdown
  console.log(`${colors.magenta}Endpoint Breakdown:${colors.reset}\n`);

  successfulResults.forEach(({ endpoint, stats }) => {
    const rating = getRating(stats.avg);
    const barLength = Math.min(50, Math.round(stats.avg / 10));
    const bar = "█".repeat(barLength) + "░".repeat(50 - barLength);

    console.log(
      `${rating.color}${rating.icon}${colors.reset} ${endpoint.name.padEnd(35)} ${stats.avg.toString().padStart(5)}ms ${rating.color}${bar}${colors.reset}`,
    );
  });

  console.log("\n" + colors.blue + "═".repeat(70) + colors.reset + "\n");
}

// Main test function
async function runComprehensiveSpeedTest() {
  printHeader();

  const allResults = [];

  for (const endpoint of TEST_ENDPOINTS) {
    process.stdout.write(
      `${colors.cyan}Testing ${endpoint.name}...${colors.reset}`,
    );

    const results = await testEndpoint(endpoint, 5);
    const stats = calculateStats(results);

    process.stdout.write(`\r${" ".repeat(50)}\r`); // Clear line

    allResults.push({ endpoint, stats, rawResults: results });
    printResult(endpoint, stats);
  }

  printSummary(allResults);

  return allResults;
}

// Run if called directly
if (require.main === module) {
  runComprehensiveSpeedTest()
    .then(() => {
      console.log(`${colors.green}✅ Speed test completed!${colors.reset}\n`);
      process.exit(0);
    })
    .catch((error) => {
      console.error(`${colors.red}❌ Error: ${error.message}${colors.reset}`);
      process.exit(1);
    });
}

module.exports = { runComprehensiveSpeedTest, testEndpoint, calculateStats };
