/**
 * EXPERT SYSTEM Global Teardown
 * 
 * Runs once after all tests to clean up test environment
 */

import { cleanupSessionTestUsers } from './test-setup';

async function globalTeardown() {
  console.log('🧹 Cleaning up test users...');
  await cleanupSessionTestUsers();
  console.log('✅ Cleanup complete');
}

export default globalTeardown;

