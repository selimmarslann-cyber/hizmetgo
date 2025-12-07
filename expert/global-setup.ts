/**
 * EXPERT SYSTEM Global Setup
 * 
 * Runs once before all tests to set up test environment
 */

import { cleanupSessionTestUsers } from './test-setup';

async function globalSetup() {
  console.log('🧹 Cleaning up old test users...');
  await cleanupSessionTestUsers();
  console.log('✅ Test environment ready');
}

export default globalSetup;

