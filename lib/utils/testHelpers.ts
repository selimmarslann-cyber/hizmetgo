/**
 * Test Helpers
 *
 * Utility functions for testing
 */

import { prisma } from "@/lib/db/prisma";

/**
 * Clean up test data
 */
export async function cleanupTestData() {
  // Clean up in reverse order of dependencies
  await prisma.message.deleteMany({
    where: { content: { contains: "[TEST]" } },
  });
  await prisma.order.deleteMany({
    where: { addressText: { contains: "[TEST]" } },
  });
  await prisma.job.deleteMany({
    where: { description: { contains: "[TEST]" } },
  });
  await prisma.notification.deleteMany({
    where: { body: { contains: "[TEST]" } },
  });
}

/**
 * Create test user
 */
export async function createTestUser(
  email: string = `test-${Date.now()}@test.com`,
) {
  return prisma.user.create({
    data: {
      email,
      name: "Test User",
      // TS2353 fix: password field does not exist in User model, using passwordHash
      passwordHash: "hashedpassword", // In real tests, use bcrypt
      role: "CUSTOMER",
    },
  });
}

/**
 * Create test business
 */
export async function createTestBusiness(ownerUserId: string) {
  return prisma.business.create({
    data: {
      ownerUserId,
      name: "Test Business",
      description: "[TEST] Test business",
      category: "DIGER",
      addressText: "[TEST] Test Address",
      lat: 41.0082,
      lng: 28.9784,
      isActive: true,
      onlineStatus: "ONLINE",
    },
  });
}
