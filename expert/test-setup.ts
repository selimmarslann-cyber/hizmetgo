/**
 * EXPERT SYSTEM Test Setup
 * 
 * Automatically creates test users and cleans up after tests
 */

import { prisma } from '../lib/db/prisma';
import * as bcrypt from 'bcryptjs';

export interface TestUser {
  email: string;
  password: string;
  name: string;
  id: string;
}

const TEST_USERS: TestUser[] = [];

/**
 * Create a test user with random email
 */
export async function createTestUser(): Promise<TestUser> {
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(7);
  const email = `expert-test-${timestamp}-${randomId}@expert-system.test`;
  const password = 'ExpertTest123!';
  const name = `Expert Test User ${timestamp}`;

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      name,
      role: 'CUSTOMER',
    },
  });

  const testUser: TestUser = {
    email,
    password,
    name,
    id: user.id,
  };

  TEST_USERS.push(testUser);
  return testUser;
}

/**
 * Get or create a test user (reusable)
 */
let defaultTestUser: TestUser | null = null;

export async function getDefaultTestUser(): Promise<TestUser> {
  if (!defaultTestUser) {
    defaultTestUser = await createTestUser();
  }
  return defaultTestUser;
}

/**
 * Create a test business user
 */
export async function createTestBusinessUser(): Promise<TestUser> {
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(7);
  const email = `expert-business-${timestamp}-${randomId}@expert-system.test`;
  const password = 'ExpertBusiness123!';
  const name = `Expert Business User ${timestamp}`;

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      name,
      role: 'VENDOR',
    },
  });

  const testUser: TestUser = {
    email,
    password,
    name,
    id: user.id,
  };

  TEST_USERS.push(testUser);
  return testUser;
}

/**
 * Clean up all test users
 */
export async function cleanupTestUsers(): Promise<void> {
  for (const user of TEST_USERS) {
    try {
      // Delete user's related data first
      await prisma.notification.deleteMany({
        where: { userId: user.id },
      });
      await prisma.wallet.deleteMany({
        where: { userId: user.id },
      });
      await prisma.business.deleteMany({
        where: { ownerUserId: user.id },
      });
      await prisma.order.deleteMany({
        where: { customerId: user.id },
      });
      await prisma.job.deleteMany({
        where: { customerId: user.id },
      });

      // Delete user
      await prisma.user.delete({
        where: { id: user.id },
      });
    } catch (error) {
      console.error(`Failed to cleanup user ${user.email}:`, error);
    }
  }

  TEST_USERS.length = 0;
  defaultTestUser = null;
}

/**
 * Clean up test users created during this session
 */
export async function cleanupSessionTestUsers(): Promise<void> {
  // Delete all users with expert-system.test domain
  try {
    const testUsers = await prisma.user.findMany({
      where: {
        email: {
          contains: '@expert-system.test',
        },
      },
    });

    for (const user of testUsers) {
      try {
        await prisma.notification.deleteMany({
          where: { userId: user.id },
        });
        await prisma.wallet.deleteMany({
          where: { userId: user.id },
        });
        await prisma.business.deleteMany({
          where: { ownerUserId: user.id },
        });
        await prisma.order.deleteMany({
          where: { customerId: user.id },
        });
        await prisma.job.deleteMany({
          where: { customerId: user.id },
        });
        await prisma.user.delete({
          where: { id: user.id },
        });
      } catch (error) {
        console.error(`Failed to cleanup user ${user.email}:`, error);
      }
    }
  } catch (error) {
    console.error('Failed to cleanup test users:', error);
  }
}

