/**
 * Event Tracking System for EXPERT System
 * 
 * Tracks user interactions and system events for testing and analytics
 */

interface EventData {
  [key: string]: any;
}

// In-memory event store for testing
const eventStore: Array<{ name: string; data: EventData; timestamp: Date }> = [];

/**
 * Track an event
 */
export function trackEvent(name: string, data: EventData = {}): void {
  const event = {
    name,
    data,
    timestamp: new Date(),
  };

  // Store in memory for testing
  eventStore.push(event);

  // In production, send to analytics service
  if (typeof window !== 'undefined') {
    // Client-side: Send to analytics API
    try {
      fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      }).catch(() => {
        // Silently fail in test environment
      });
    } catch (e) {
      // Ignore errors in test environment
    }
  }

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[TRACK] ${name}`, data);
  }
}

/**
 * Get all tracked events (for testing)
 */
export function getTrackedEvents(): Array<{ name: string; data: EventData; timestamp: Date }> {
  return [...eventStore];
}

/**
 * Get events by name (for testing)
 */
export function getEventsByName(name: string): Array<{ name: string; data: EventData; timestamp: Date }> {
  return eventStore.filter((e) => e.name === name);
}

/**
 * Clear event store (for testing)
 */
export function clearEvents(): void {
  eventStore.length = 0;
}

/**
 * Check if an event was tracked
 */
export function hasEvent(name: string): boolean {
  return eventStore.some((e) => e.name === name);
}

