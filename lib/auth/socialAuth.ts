/**
 * Social Auth Service
 * Handles OAuth user creation and account linking
 */

import { prisma } from "@/lib/db/prisma";
import { signToken } from "./jwt";
import { createMobileToken } from "./mobileTokens";
import { getOrCreateReferralCodeForUser } from "@/lib/services/referralService";
import type { OAuthProvider } from "./oauth";

export interface SocialUserInfo {
  provider: OAuthProvider;
  providerAccountId: string;
  email: string;
  name: string;
  avatarUrl?: string;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: Date;
  idToken?: string;
}

/**
 * Create or link OAuth account to user
 */
export async function createOrLinkSocialAccount(
  socialInfo: SocialUserInfo,
  referralCode?: string,
) {
  // Check if account already exists
  const existingAccount = await prisma.account.findUnique({
    where: {
      provider_providerAccountId: {
        provider: socialInfo.provider,
        providerAccountId: socialInfo.providerAccountId,
      },
    },
    include: { user: true },
  });

  if (existingAccount) {
    // User already exists, just update tokens
    await prisma.account.update({
      where: { id: existingAccount.id },
      data: {
        accessToken: socialInfo.accessToken,
        refreshToken: socialInfo.refreshToken,
        expiresAt: socialInfo.expiresAt,
        idToken: socialInfo.idToken,
        providerEmail: socialInfo.email,
        providerName: socialInfo.name,
        updatedAt: new Date(),
      },
    });

    return existingAccount.user;
  }

  // Check if user with email exists
  let user = await prisma.user.findUnique({
    where: { email: socialInfo.email },
    include: { accounts: true },
  });

  if (user) {
    // User exists, link account
    await prisma.account.create({
      data: {
        userId: user.id,
        provider: socialInfo.provider,
        providerAccountId: socialInfo.providerAccountId,
        providerEmail: socialInfo.email,
        providerName: socialInfo.name,
        accessToken: socialInfo.accessToken,
        refreshToken: socialInfo.refreshToken,
        expiresAt: socialInfo.expiresAt,
        idToken: socialInfo.idToken,
      },
    });

    // Update avatar if not set
    if (!user.avatarUrl && socialInfo.avatarUrl) {
      await prisma.user.update({
        where: { id: user.id },
        data: { avatarUrl: socialInfo.avatarUrl },
      });
    }

    // TS2322 fix: user must include accounts relation to match expected return type
    const userWithAccounts = await prisma.user.findUnique({
      where: { id: user.id },
      include: { accounts: true },
    });
    if (!userWithAccounts) {
      throw new Error("Failed to fetch user with accounts");
    }
    return userWithAccounts;
  }

  // Create new user
  return prisma.$transaction(async (tx) => {
    // Create user
    const newUser = await tx.user.create({
      data: {
        email: socialInfo.email,
        name: socialInfo.name,
        avatarUrl: socialInfo.avatarUrl,
        passwordHash: null, // No password for social login
      },
    });

    // Create account
    await tx.account.create({
      data: {
        userId: newUser.id,
        provider: socialInfo.provider,
        providerAccountId: socialInfo.providerAccountId,
        providerEmail: socialInfo.email,
        providerName: socialInfo.name,
        accessToken: socialInfo.accessToken,
        refreshToken: socialInfo.refreshToken,
        expiresAt: socialInfo.expiresAt,
        idToken: socialInfo.idToken,
      },
    });

    // Create referral code
    try {
      await getOrCreateReferralCodeForUser(newUser.id);
    } catch (refError) {
      console.error("Referral code creation error:", refError);
    }

    // Create wallet
    try {
      await tx.wallet.create({
        data: {
          userId: newUser.id,
          balance: 0,
          pendingBalance: 0,
        },
      });
    } catch (walletError) {
      console.error("Wallet creation error:", walletError);
    }

    // Handle referral chain if code provided
    if (referralCode) {
      try {
        const { buildReferralChainOnRegister } =
          await import("@/lib/services/referralService");
        await buildReferralChainOnRegister(newUser.id, referralCode);
      } catch (refError) {
        console.error("Referral chain creation error:", refError);
      }
    }

    // TS2322 fix: newUser must include accounts relation to match expected return type
    const userWithAccounts = await tx.user.findUnique({
      where: { id: newUser.id },
      include: { accounts: true },
    });
    if (!userWithAccounts) {
      throw new Error("Failed to create user with accounts");
    }
    return userWithAccounts;
  });
}

/**
 * Create session after social login
 */
export function createSocialLoginSession(userId: string, email: string) {
  const token = signToken({ userId, email });
  const mobileToken = createMobileToken(userId, email);

  return {
    token,
    mobileToken,
  };
}
