/**
 * Performance Analysis Script
 * Analyzes code and provides performance recommendations
 */

const fs = require("fs");
const path = require("path");

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  magenta: "\x1b[35m",
};

// Analyze files
function analyzeFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    const lines = content.split("\n");

    const issues = [];

    // Check for common performance issues
    if (
      content.includes("findMany") &&
      !content.includes("take:") &&
      !content.includes("limit")
    ) {
      issues.push({
        type: "warning",
        message: "findMany without limit - could fetch too much data",
      });
    }

    if (content.includes("await") && content.split("await").length > 10) {
      issues.push({
        type: "info",
        message: "Many async operations - consider parallel execution",
      });
    }

    if (content.includes("setInterval") || content.includes("setTimeout")) {
      issues.push({
        type: "info",
        message: "Timer found - ensure cleanup on unmount",
      });
    }

    if (
      content.includes(".map(") &&
      content.includes(".filter(") &&
      content.includes(".map(") &&
      content.split(".map(").length > 3
    ) {
      issues.push({
        type: "warning",
        message: "Multiple array operations - consider combining",
      });
    }

    if (
      content.includes("fetch(") &&
      !content.includes("cache") &&
      !content.includes("Cache-Control")
    ) {
      issues.push({
        type: "info",
        message: "Fetch without caching - consider adding cache",
      });
    }

    return {
      path: filePath,
      lines: lines.length,
      issues,
    };
  } catch (error) {
    return null;
  }
}

// Find all API routes
function findAPIRoutes(dir) {
  const files = [];

  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        files.push(...findAPIRoutes(fullPath));
      } else if (entry.isFile() && entry.name === "route.ts") {
        files.push(fullPath);
      }
    }
  } catch (error) {
    // Ignore errors
  }

  return files;
}

// Find all components
function findComponents(dir) {
  const files = [];

  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        files.push(...findComponents(fullPath));
      } else if (
        entry.isFile() &&
        (entry.name.endsWith(".tsx") || entry.name.endsWith(".jsx"))
      ) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    // Ignore errors
  }

  return files;
}

// Run analysis
function runPerformanceAnalysis() {
  console.log(colors.blue + "═".repeat(70) + colors.reset);
  console.log(
    colors.blue +
      "║" +
      " ".repeat(18) +
      "PERFORMANCE CODE ANALYSIS" +
      " ".repeat(23) +
      "║" +
      colors.reset,
  );
  console.log(colors.blue + "═".repeat(70) + colors.reset + "\n");

  const projectRoot = process.cwd();
  const apiDir = path.join(projectRoot, "app", "api");
  const componentsDir = path.join(projectRoot, "components");

  console.log(colors.cyan + "Scanning API routes..." + colors.reset);
  const apiRoutes = findAPIRoutes(apiDir);
  console.log(`Found ${apiRoutes.length} API route files\n`);

  console.log(colors.cyan + "Scanning components..." + colors.reset);
  const components = findComponents(componentsDir);
  console.log(`Found ${components.length} component files\n`);

  console.log(colors.cyan + "Analyzing files..." + colors.reset + "\n");

  const allIssues = [];

  // Analyze API routes
  apiRoutes.forEach((route) => {
    const analysis = analyzeFile(route);
    if (analysis && analysis.issues.length > 0) {
      allIssues.push(analysis);
    }
  });

  // Analyze components
  components.slice(0, 10).forEach((component) => {
    // Limit to first 10 for performance
    const analysis = analyzeFile(component);
    if (analysis && analysis.issues.length > 0) {
      allIssues.push(analysis);
    }
  });

  // Print results
  if (allIssues.length === 0) {
    console.log(
      colors.green + "✅ No performance issues found!" + colors.reset + "\n",
    );
  } else {
    console.log(
      colors.yellow +
        `Found ${allIssues.length} files with potential improvements\n` +
        colors.reset,
    );

    allIssues.forEach(({ path: filePath, issues }) => {
      const relativePath = filePath
        .replace(projectRoot, "")
        .replace(/\\/g, "/");
      console.log(colors.cyan + relativePath + colors.reset);
      issues.forEach((issue) => {
        const icon = issue.type === "warning" ? "⚠️" : "ℹ️";
        const color = issue.type === "warning" ? colors.yellow : colors.blue;
        console.log(`  ${color}${icon}${colors.reset} ${issue.message}`);
      });
      console.log("");
    });
  }

  // Recommendations
  console.log(colors.blue + "═".repeat(70) + colors.reset);
  console.log(colors.blue + "RECOMMENDATIONS" + colors.reset);
  console.log(colors.blue + "═".repeat(70) + colors.reset + "\n");

  const recommendations = [
    {
      priority: "HIGH",
      title: "Database Query Optimization",
      description:
        "Add LIMIT clauses to findMany queries, use select to fetch only needed fields",
    },
    {
      priority: "HIGH",
      title: "API Response Caching",
      description: "Add caching to frequently accessed endpoints",
    },
    {
      priority: "MEDIUM",
      title: "Parallel Async Operations",
      description: "Use Promise.all() for independent async operations",
    },
    {
      priority: "MEDIUM",
      title: "Image Optimization",
      description: "Use Next.js Image component with proper sizing",
    },
    {
      priority: "LOW",
      title: "Code Splitting",
      description: "Use dynamic imports for heavy components",
    },
  ];

  recommendations.forEach((rec) => {
    const color =
      rec.priority === "HIGH"
        ? colors.red
        : rec.priority === "MEDIUM"
          ? colors.yellow
          : colors.green;
    console.log(
      `${color}[${rec.priority}]${colors.reset} ${colors.cyan}${rec.title}${colors.reset}`,
    );
    console.log(`  ${rec.description}\n`);
  });

  console.log(colors.green + "✅ Analysis completed!" + colors.reset + "\n");
}

// Run analysis
runPerformanceAnalysis();
