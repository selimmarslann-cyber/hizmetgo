/**
 * Performance Test Script
 * Tests API endpoints and page load times
 */

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

// Test endpoints
const TEST_ENDPOINTS = [
  { name: "Homepage", url: "/", method: "GET" },
  { name: "Map Page", url: "/map", method: "GET" },
  { name: "API: Categories", url: "/api/service-categories", method: "GET" },
  { name: "API: Instant Jobs", url: "/api/instant-jobs", method: "GET" },
];

// Colors for console output
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

/**
 * Measure request time
 */
async function measureRequest(name, url, method = "GET", iterations = 5) {
  console.log(`${colors.cyan}Testing: ${name}${colors.reset}`);
  console.log(`  URL: ${BASE_URL}${url}`);

  const times = [];

  for (let i = 0; i < iterations; i++) {
    const start = Date.now();

    try {
      const response = await fetch(`${BASE_URL}${url}`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const end = Date.now();
      const duration = end - start;

      times.push({
        duration,
        status: response.status,
        ok: response.ok,
        size: response.headers.get("content-length") || 0,
      });

      // Small delay between requests
      await new Promise((resolve) => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`${colors.red}  Error: ${error.message}${colors.reset}`);
      times.push({ duration: null, error: error.message });
    }
  }

  // Calculate statistics
  const validTimes = times.filter((t) => t.duration !== null);

  if (validTimes.length === 0) {
    console.log(`${colors.red}  ❌ All requests failed${colors.reset}\n`);
    return null;
  }

  const durations = validTimes.map((t) => t.duration);
  const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
  const min = Math.min(...durations);
  const max = Math.max(...durations);
  const median = durations.sort((a, b) => a - b)[
    Math.floor(durations.length / 2)
  ];

  // Performance rating
  let rating = "🟢 Excellent";
  let color = colors.green;

  if (avg > 1000) {
    rating = "🔴 Poor";
    color = colors.red;
  } else if (avg > 500) {
    rating = "🟡 Fair";
    color = colors.yellow;
  } else if (avg > 200) {
    rating = "🟠 Good";
    color = colors.yellow;
  }

  console.log(
    `${color}  ✅ Average: ${avg.toFixed(0)}ms | Min: ${min}ms | Max: ${max}ms | Median: ${median}ms${colors.reset}`,
  );
  console.log(`  ${rating}`);
  console.log(
    `  Success rate: ${((validTimes.length / iterations) * 100).toFixed(0)}%\n`,
  );

  return {
    name,
    url,
    avg,
    min,
    max,
    median,
    successRate: validTimes.length / iterations,
    rating,
  };
}

/**
 * Run all performance tests
 */
async function runPerformanceTests() {
  console.log(
    `${colors.blue}╔════════════════════════════════════════╗${colors.reset}`,
  );
  console.log(
    `${colors.blue}║    Hizmetgo Performance Test Suite     ║${colors.reset}`,
  );
  console.log(
    `${colors.blue}╚════════════════════════════════════════╝${colors.reset}\n`,
  );

  console.log(`Base URL: ${BASE_URL}\n`);
  console.log(`Testing ${TEST_ENDPOINTS.length} endpoints...\n`);
  console.log(`${colors.cyan}${"=".repeat(50)}${colors.reset}\n`);

  const results = [];

  for (const endpoint of TEST_ENDPOINTS) {
    const result = await measureRequest(
      endpoint.name,
      endpoint.url,
      endpoint.method,
    );
    if (result) {
      results.push(result);
    }
  }

  // Summary
  console.log(`${colors.blue}${"=".repeat(50)}${colors.reset}`);
  console.log(`${colors.blue}SUMMARY${colors.reset}`);
  console.log(`${colors.blue}${"=".repeat(50)}${colors.reset}\n`);

  if (results.length === 0) {
    console.log(`${colors.red}No successful tests${colors.reset}`);
    process.exit(1);
  }

  const overallAvg =
    results.reduce((sum, r) => sum + r.avg, 0) / results.length;

  results.forEach((result) => {
    const color =
      result.avg > 1000
        ? colors.red
        : result.avg > 500
          ? colors.yellow
          : colors.green;
    console.log(
      `${color}${result.name.padEnd(25)} ${result.avg.toFixed(0).padStart(6)}ms${colors.reset}`,
    );
  });

  console.log(
    `\n${colors.cyan}Overall Average: ${overallAvg.toFixed(0)}ms${colors.reset}`,
  );

  // Performance score
  let score = 100;
  if (overallAvg > 2000) score = 0;
  else if (overallAvg > 1000) score = 25;
  else if (overallAvg > 500) score = 50;
  else if (overallAvg > 200) score = 75;

  console.log(`${colors.blue}Performance Score: ${score}/100${colors.reset}\n`);

  return results;
}

// Run tests
if (require.main === module) {
  runPerformanceTests()
    .then(() => {
      console.log(
        `${colors.green}✅ Performance tests completed!${colors.reset}\n`,
      );
      process.exit(0);
    })
    .catch((error) => {
      console.error(
        `${colors.red}❌ Error running tests: ${error.message}${colors.reset}`,
      );
      process.exit(1);
    });
}

module.exports = { runPerformanceTests, measureRequest };
