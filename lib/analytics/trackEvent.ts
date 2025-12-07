/**
 * Analytics Event Tracking
 *
 * Growth ve referral ölçümleme için merkezi event tracking
 */

import { logger } from "@/lib/utils/logger";

export interface AnalyticsEvent {
  name: string;
  userId?: string;
  properties?: Record<string, any>;
  timestamp?: number;
}

/**
 * Track an analytics event
 *
 * Production'da gerçek analytics servisine gönderilecek
 * (Mixpanel, Amplitude, Google Analytics, vb.)
 */
export async function trackEvent(event: AnalyticsEvent) {
  const { name, userId, properties, timestamp } = event;

  // Server-side logging
  logger.info("Analytics Event", {
    event: name,
    userId,
    properties,
    timestamp: timestamp || Date.now(),
  });

  // TODO: Production'da gerçek analytics servisine gönder
  // Örnek:
  // if (process.env.NODE_ENV === 'production') {
  //   await mixpanel.track(name, { ...properties, userId, timestamp })
  // }
}

/**
 * Predefined event names for growth tracking
 */
export const GrowthEvents = {
  // Signup & Onboarding
  SIGNUP_STARTED: "signup_started",
  SIGNUP_COMPLETED: "signup_completed",
  SIGNUP_FAILED: "signup_failed",
  FIRST_JOB_CREATED: "first_job_created",
  FIRST_PAYMENT: "first_payment",
  FIRST_REFERRAL_EARNED: "first_referral_earned",

  // Referral
  REFERRAL_LINK_CLICKED: "referral_link_clicked",
  REFERRAL_LINK_SHARED: "referral_link_shared",
  REFERRAL_SIGNUP: "referral_signup",
  REFERRAL_REWARD_EARNED: "referral_reward_earned",

  // Engagement
  JOB_CREATED: "job_created",
  JOB_OFFER_ACCEPTED: "job_offer_accepted",
  ORDER_COMPLETED: "order_completed",
  REVIEW_SUBMITTED: "review_submitted",

  // Retention
  USER_RETURNED: "user_returned",
  WEEKLY_ACTIVE: "weekly_active",
  MONTHLY_ACTIVE: "monthly_active",

  // Conversion
  WALLET_DEPOSIT: "wallet_deposit",
  WALLET_WITHDRAW: "wallet_withdraw",
  PAYOUT_REQUESTED: "payout_requested",
} as const;

/**
 * Track UTM parameters
 */
export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

/**
 * Track user signup with UTM and referral data
 */
export async function trackSignup(
  userId: string,
  utm?: UTMParams,
  referralCode?: string,
) {
  await trackEvent({
    name: GrowthEvents.SIGNUP_COMPLETED,
    userId,
    properties: {
      ...utm,
      referral_code: referralCode,
      has_referral: !!referralCode,
    },
  });
}

/**
 * Track first job creation
 */
export async function trackFirstJob(userId: string, jobId: string) {
  await trackEvent({
    name: GrowthEvents.FIRST_JOB_CREATED,
    userId,
    properties: {
      job_id: jobId,
    },
  });
}

/**
 * Track first payment
 */
export async function trackFirstPayment(
  userId: string,
  amount: number,
  orderId: string,
) {
  await trackEvent({
    name: GrowthEvents.FIRST_PAYMENT,
    userId,
    properties: {
      amount,
      order_id: orderId,
    },
  });
}

/**
 * Track referral reward
 */
export async function trackReferralReward(
  referrerUserId: string,
  referredUserId: string,
  amount: number,
  level: number,
) {
  await trackEvent({
    name: GrowthEvents.REFERRAL_REWARD_EARNED,
    userId: referrerUserId,
    properties: {
      referred_user_id: referredUserId,
      amount,
      level,
    },
  });
}
