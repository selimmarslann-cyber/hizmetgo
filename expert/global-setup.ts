/**
 * EXPERT SYSTEM Global Setup
 * 
 * Runs once before all tests to set up test environment
 */

import { cleanupSessionTestUsers } from './test-setup';

async function globalSetup() {
  console.log('🧹 Cleaning up old test users...');
  try {
    await cleanupSessionTestUsers();
    console.log('✅ Test environment ready');
  } catch (error: any) {
    console.warn('⚠️ Could not cleanup test users (database may not be available):', error.message);
    console.log('✅ Test environment ready (using mock users)');
  }
}

export default globalSetup;

