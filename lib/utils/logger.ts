/**
 * Centralized Logger Utility
 *
 * Provides consistent logging across the application.
 * Integrated with Sentry for error tracking in production.
 */

type LogLevel = "info" | "warn" | "error" | "debug";

interface LogContext {
  [key: string]: any;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === "development";

  private formatMessage(
    level: LogLevel,
    message: string,
    context?: LogContext,
  ): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? ` ${JSON.stringify(context)}` : "";
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`;
  }

  info(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.log(this.formatMessage("info", message, context));
    }
    // In production, send to logging service
  }

  warn(message: string, context?: LogContext): void {
    console.warn(this.formatMessage("warn", message, context));
    // In production, send to logging service
  }

  error(message: string, error?: Error | unknown, context?: LogContext): void {
    const errorDetails =
      error instanceof Error
        ? { message: error.message, stack: error.stack }
        : { error };

    console.error(
      this.formatMessage("error", message, { ...errorDetails, ...context }),
    );
    
    // Send to Sentry if available
    try {
      if (typeof window !== "undefined" && (window as any).Sentry) {
        // Client-side Sentry
        (window as any).Sentry.captureException(error instanceof Error ? error : new Error(message), {
          contexts: { custom: context },
          tags: { source: 'logger' },
        });
      } else if (typeof require !== "undefined") {
        // Server-side Sentry
        const Sentry = require("@sentry/nextjs");
        if (Sentry && Sentry.captureException) {
          Sentry.captureException(error instanceof Error ? error : new Error(message), {
            contexts: { custom: context },
            tags: { source: 'logger' },
          });
        }
      }
    } catch (e) {
      // Sentry not available or not configured - silently fail
    }
  }

  debug(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.debug(this.formatMessage("debug", message, context));
    }
  }
}

// Export singleton instance
export const logger = new Logger();

// Export class for testing
export { Logger };

// Simple log functions for easy migration from console.log/error
// Client-side safe - works in both browser and Node.js
export function logError(...args: any[]): void {
  // Safe NODE_ENV check for client-side
  const isProduction = typeof process !== 'undefined' && process.env?.NODE_ENV === 'production';
  
  if (!isProduction) {
    console.error(...args);
  }
  
  // Also log through logger for Sentry integration (safe)
  try {
    const errorMessage = args.map(arg => 
      arg instanceof Error ? arg.message : String(arg)
    ).join(" ");
    const error = args.find(arg => arg instanceof Error) as Error | undefined;
    logger.error(errorMessage, error);
  } catch (e) {
    // Fallback if logger fails
    console.error(...args);
  }
}

export function logInfo(...args: any[]): void {
  // Safe NODE_ENV check for client-side
  const isProduction = typeof process !== 'undefined' && process.env?.NODE_ENV === 'production';
  
  if (!isProduction) {
    console.log(...args);
  }
  
  // Also log through logger (safe)
  try {
    const message = args.map(arg => String(arg)).join(" ");
    logger.info(message);
  } catch (e) {
    // Fallback if logger fails
    console.log(...args);
  }
}
