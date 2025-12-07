/**
 * Analytics & Event Tracking
 *
 * Production'da gerçek analytics servisine bağlanacak
 * Development'ta console.log yapar
 */

const isProduction = process.env.NODE_ENV === "production";

export interface AnalyticsEvent {
  name: string;
  params?: Record<string, any>;
  timestamp?: number;
}

class Analytics {
  private initialized = false;

  /**
   * Initialize analytics (Sentry, Mixpanel, Amplitude, etc.)
   */
  async init() {
    if (this.initialized) return;

    // TODO: Initialize analytics SDK here
    // Example: Sentry.init(), Mixpanel.init(), etc.

    if (!isProduction) {
      console.log("[Analytics] Initialized (dev mode)");
    }

    this.initialized = true;
  }

  /**
   * Track an event
   */
  trackEvent(name: string, params?: Record<string, any>) {
    const event: AnalyticsEvent = {
      name,
      params,
      timestamp: Date.now(),
    };

    if (isProduction) {
      // TODO: Send to analytics service
      // Example: Mixpanel.track(name, params)
      // Example: Amplitude.logEvent(name, params)
    } else {
      console.log("[Analytics Event]", event);
    }
  }

  /**
   * Set user properties
   */
  setUserProperties(userId: string, properties?: Record<string, any>) {
    if (isProduction) {
      // TODO: Set user properties
      // Example: Mixpanel.identify(userId)
      // Example: Mixpanel.people.set(properties)
    } else {
      console.log("[Analytics] Set user properties", { userId, properties });
    }
  }

  /**
   * Track screen view
   */
  trackScreen(screenName: string, params?: Record<string, any>) {
    this.trackEvent("screen_view", {
      screen_name: screenName,
      ...params,
    });
  }

  /**
   * Track error
   */
  trackError(error: Error, context?: Record<string, any>) {
    if (isProduction) {
      // TODO: Send to error tracking (Sentry)
      // Example: Sentry.captureException(error, { extra: context })
    } else {
      console.error("[Analytics Error]", error, context);
    }
  }
}

// Singleton instance
export const analytics = new Analytics();

// Initialize on import (in production)
if (isProduction) {
  analytics.init();
}

// Convenience functions
export const trackEvent = (name: string, params?: Record<string, any>) => {
  analytics.trackEvent(name, params);
};

export const trackScreen = (
  screenName: string,
  params?: Record<string, any>,
) => {
  analytics.trackScreen(screenName, params);
};

export const trackError = (error: Error, context?: Record<string, any>) => {
  analytics.trackError(error, context);
};

// Predefined event names
export const Events = {
  // Auth
  AUTH_LOGIN_SUCCESS: "auth_login_success",
  AUTH_LOGIN_FAILED: "auth_login_failed",
  AUTH_REGISTER_SUCCESS: "auth_register_success",
  AUTH_REGISTER_FAILED: "auth_register_failed",
  AUTH_LOGOUT: "auth_logout",

  // Jobs
  JOB_CREATE: "job_create",
  JOB_VIEW: "job_view",
  JOB_OFFER_SUBMIT: "job_offer_submit",
  JOB_OFFER_ACCEPT: "job_offer_accept",

  // Orders
  ORDER_CREATE: "order_create",
  ORDER_ACCEPT: "order_accept",
  ORDER_REJECT: "order_reject",
  ORDER_COMPLETE: "order_complete",
  ORDER_CANCEL: "order_cancel",

  // Reviews
  REVIEW_SUBMIT: "review_submit",
  REVIEW_VIEW: "review_view",

  // Referral
  REFERRAL_CLICK: "referral_click",
  REFERRAL_SHARE: "referral_share",
  REFERRAL_SIGNUP: "referral_signup",
  REFERRAL_REWARD: "referral_reward",

  // Wallet
  WALLET_VIEW: "wallet_view",
  PAYOUT_REQUEST: "payout_request",

  // Navigation
  SCREEN_VIEW: "screen_view",
  BUTTON_CLICK: "button_click",

  // Errors
  ERROR_NETWORK: "error_network",
  ERROR_AUTH: "error_auth",
  ERROR_GENERIC: "error_generic",
} as const;
