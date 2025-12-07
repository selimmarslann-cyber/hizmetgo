/**
 * Test Setup
 *
 * Global test configuration
 */

// Mock environment variables
// TS2540 fix: NODE_ENV is read-only, using Object.defineProperty to set it
if (typeof process.env.NODE_ENV === "undefined") {
  Object.defineProperty(process.env, "NODE_ENV", {
    value: "test",
    writable: true,
    configurable: true,
  });
}
process.env.DATABASE_URL =
  process.env.DATABASE_URL || "postgresql://test:test@localhost:5432/test";

// Suppress console logs in tests (optional)
// global.console = {
//   ...console,
//   log: jest.fn(),
//   debug: jest.fn(),
//   info: jest.fn(),
//   warn: jest.fn(),
//   error: jest.fn(),
// }
