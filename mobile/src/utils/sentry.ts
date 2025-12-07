/**
 * Sentry Error Tracking
 *
 * Production'da Sentry'yi initialize eder
 * Development'ta console.error kullanır
 */

const isProduction = process.env.NODE_ENV === "production";
const SENTRY_DSN = process.env.EXPO_PUBLIC_SENTRY_DSN || "";

class SentryService {
  private initialized = false;

  /**
   * Initialize Sentry
   */
  async init() {
    if (this.initialized) return;
    if (!isProduction || !SENTRY_DSN) {
      console.log("[Sentry] Not initialized (dev mode or DSN missing)");
      return;
    }

    try {
      // TODO: Initialize Sentry
      // const Sentry = require('@sentry/react-native')
      // Sentry.init({
      //   dsn: SENTRY_DSN,
      //   environment: 'production',
      //   enableInExpoDevelopment: false,
      //   tracesSampleRate: 1.0,
      // })

      this.initialized = true;
      console.log("[Sentry] Initialized");
    } catch (error) {
      console.error("[Sentry] Initialization failed", error);
    }
  }

  /**
   * Capture exception
   */
  captureException(error: Error, context?: Record<string, any>) {
    if (isProduction && this.initialized) {
      // TODO: Sentry.captureException(error, { extra: context })
    } else {
      console.error("[Sentry] Exception:", error, context);
    }
  }

  /**
   * Capture message
   */
  captureMessage(
    message: string,
    level: "info" | "warning" | "error" = "info",
  ) {
    if (isProduction && this.initialized) {
      // TODO: Sentry.captureMessage(message, level)
    } else {
      console.log(`[Sentry] ${level.toUpperCase()}:`, message);
    }
  }

  /**
   * Set user context
   */
  setUser(userId: string, email?: string, name?: string) {
    if (isProduction && this.initialized) {
      // TODO: Sentry.setUser({ id: userId, email, username: name })
    } else {
      console.log("[Sentry] Set user:", { userId, email, name });
    }
  }

  /**
   * Clear user context
   */
  clearUser() {
    if (isProduction && this.initialized) {
      // TODO: Sentry.setUser(null)
    } else {
      console.log("[Sentry] Clear user");
    }
  }
}

export const sentry = new SentryService();

// Initialize on import (in production)
if (isProduction) {
  sentry.init();
}
