/**
 * EXPERT SYSTEM Global Teardown
 * 
 * Runs once after all tests to clean up test environment
 */

import { cleanupSessionTestUsers } from './test-setup';

async function globalTeardown() {
  console.log('🧹 Cleaning up test users...');
  try {
    await cleanupSessionTestUsers();
    console.log('✅ Cleanup complete');
  } catch (error: any) {
    console.warn('⚠️ Could not cleanup test users:', error.message);
    console.log('✅ Cleanup complete (some users may remain)');
  }
}

export default globalTeardown;

