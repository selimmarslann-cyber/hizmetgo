/**
 * Audit Logging Utility
 * Logs security-relevant events for monitoring and compliance
 */

import { prisma } from '@/lib/db/prisma';

export enum AuditEventType {
  LOGIN = 'LOGIN',
  LOGIN_FAILED = 'LOGIN_FAILED',
  LOGOUT = 'LOGOUT',
  PASSWORD_CHANGE = 'PASSWORD_CHANGE',
  PASSWORD_RESET = 'PASSWORD_RESET',
  USER_CREATE = 'USER_CREATE',
  USER_UPDATE = 'USER_UPDATE',
  USER_DELETE = 'USER_DELETE',
  ROLE_CHANGE = 'ROLE_CHANGE',
  PERMISSION_CHANGE = 'PERMISSION_CHANGE',
  API_ACCESS = 'API_ACCESS',
  DATA_EXPORT = 'DATA_EXPORT',
  DATA_DELETE = 'DATA_DELETE',
  SUSPICIOUS_ACTIVITY = 'SUSPICIOUS_ACTIVITY',
}

export interface AuditLogData {
  userId?: string;
  eventType: AuditEventType;
  description: string;
  metadata?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}

/**
 * Create audit log entry
 */
export async function createAuditLog(data: AuditLogData): Promise<void> {
  try {
    // In a real implementation, you would save to a dedicated audit_log table
    // For now, we'll use console logging and optionally save to a file or database
    const logEntry = {
      timestamp: new Date().toISOString(),
      ...data,
    };

    // Console log for development
    if (process.env.NODE_ENV === 'development') {
      console.log('[AUDIT LOG]', JSON.stringify(logEntry, null, 2));
    }

    // TODO: Save to database audit_log table when schema is ready
    // await prisma.auditLog.create({
    //   data: {
    //     userId: data.userId,
    //     eventType: data.eventType,
    //     description: data.description,
    //     metadata: data.metadata,
    //     ipAddress: data.ipAddress,
    //     userAgent: data.userAgent,
    //   },
    // });

    // Send to external logging service if configured
    if (process.env.AUDIT_LOG_ENDPOINT) {
      try {
        await fetch(process.env.AUDIT_LOG_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(logEntry),
        });
      } catch (error) {
        console.error('Failed to send audit log to external service:', error);
      }
    }
  } catch (error) {
    // Don't throw - audit logging should not break the application
    console.error('Failed to create audit log:', error);
  }
}

/**
 * Extract IP address from request
 */
export function getIpAddress(request: Request): string | undefined {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || undefined;
}

/**
 * Extract user agent from request
 */
export function getUserAgent(request: Request): string | undefined {
  return request.headers.get('user-agent') || undefined;
}

