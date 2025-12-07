/**
 * EXPERT REPORT Generator
 * 
 * Generates comprehensive test reports with detailed information
 */

import fs from 'fs';
import path from 'path';

interface TestResult {
  title: string;
  status: 'passed' | 'failed' | 'skipped';
  duration: number;
  error?: string;
  file: string;
  line?: number;
  stackTrace?: string;
  traceUrl?: string;
}

interface ExpertReport {
  timestamp: string;
  totalTests: number;
  passed: number;
  failed: number;
  skipped: number;
  duration: number;
  results: TestResult[];
}

export function generateExpertReport(results: TestResult[]): ExpertReport {
  const passed = results.filter((r) => r.status === 'passed').length;
  const failed = results.filter((r) => r.status === 'failed').length;
  const skipped = results.filter((r) => r.status === 'skipped').length;
  const totalDuration = results.reduce((sum, r) => sum + r.duration, 0);

  return {
    timestamp: new Date().toISOString(),
    totalTests: results.length,
    passed,
    failed,
    skipped,
    duration: totalDuration,
    results,
  };
}

export function formatExpertReport(report: ExpertReport): string {
  const lines: string[] = [];

  lines.push('╔════════════════════════════════════════════════════════════╗');
  lines.push('║              EXPERT SYSTEM TEST REPORT                    ║');
  lines.push('╚════════════════════════════════════════════════════════════╝');
  lines.push('');
  lines.push(`Timestamp: ${report.timestamp}`);
  lines.push(`Total Tests: ${report.totalTests}`);
  lines.push(`Passed: ${report.passed} ✔`);
  lines.push(`Failed: ${report.failed} ❌`);
  lines.push(`Skipped: ${report.skipped} ⏭`);
  lines.push(`Duration: ${(report.duration / 1000).toFixed(2)}s`);
  lines.push('');
  lines.push('═══════════════════════════════════════════════════════════');
  lines.push('');

  // Group by status
  const passedTests = report.results.filter((r) => r.status === 'passed');
  const failedTests = report.results.filter((r) => r.status === 'failed');
  const skippedTests = report.results.filter((r) => r.status === 'skipped');

  if (passedTests.length > 0) {
    lines.push('✔ PASSED TESTS:');
    lines.push('');
    passedTests.forEach((test) => {
      lines.push(`  ✔ ${test.title}`);
      lines.push(`    File: ${test.file}`);
      lines.push(`    Duration: ${test.duration}ms`);
      lines.push('');
    });
  }

  if (failedTests.length > 0) {
    lines.push('❌ FAILED TESTS:');
    lines.push('');
    failedTests.forEach((test) => {
      lines.push(`  ❌ ${test.title}`);
      lines.push(`    File: ${test.file}${test.line ? `:${test.line}` : ''}`);
      lines.push(`    Duration: ${test.duration}ms`);
      if (test.error) {
        lines.push(`    Error: ${test.error}`);
      }
      if (test.stackTrace) {
        lines.push(`    Stack Trace:`);
        test.stackTrace.split('\n').forEach((line) => {
          lines.push(`      ${line}`);
        });
      }
      if (test.traceUrl) {
        lines.push(`    Trace: ${test.traceUrl}`);
      }
      lines.push('');
    });
  }

  if (skippedTests.length > 0) {
    lines.push('⏭ SKIPPED TESTS:');
    lines.push('');
    skippedTests.forEach((test) => {
      lines.push(`  ⏭ ${test.title}`);
      lines.push(`    File: ${test.file}`);
      lines.push('');
    });
  }

  lines.push('═══════════════════════════════════════════════════════════');
  lines.push('');

  // Summary
  const successRate = ((report.passed / report.totalTests) * 100).toFixed(1);
  lines.push(`Success Rate: ${successRate}%`);
  lines.push('');

  if (report.failed > 0) {
    lines.push('⚠️  Some tests failed. Review the details above.');
  } else {
    lines.push('✅ All tests passed!');
  }

  return lines.join('\n');
}

export function saveExpertReport(report: ExpertReport, outputPath: string): void {
  const reportDir = path.dirname(outputPath);
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  // Save JSON
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));

  // Save formatted text
  const textPath = outputPath.replace('.json', '.txt');
  const formatted = formatExpertReport(report);
  fs.writeFileSync(textPath, formatted);

  console.log(`\n📊 Expert Report saved:`);
  console.log(`   JSON: ${outputPath}`);
  console.log(`   Text: ${textPath}`);
}

