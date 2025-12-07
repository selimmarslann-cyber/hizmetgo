/**
 * Job and Order Status Types
 *
 * Centralized status types for Jobs and Orders to ensure consistency
 * across the application.
 */

import {
  JobStatus as PrismaJobStatus,
  OrderStatus as PrismaOrderStatus,
} from "@prisma/client";

// Re-export Prisma enums for type safety
export type JobStatus = PrismaJobStatus;
export type OrderStatus = PrismaOrderStatus;

// Job status values
export const JOB_STATUS = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;

// Order status values
export const ORDER_STATUS = {
  PENDING_CONFIRMATION: "PENDING_CONFIRMATION",
  ACCEPTED: "ACCEPTED",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  CANCELLED_BY_CUSTOMER: "CANCELLED_BY_CUSTOMER",
  CANCELLED_BY_PROVIDER: "CANCELLED_BY_PROVIDER",
} as const;

/**
 * Job state machine transitions
 */
export const JOB_STATE_TRANSITIONS: Record<JobStatus, JobStatus[]> = {
  PENDING: ["ACCEPTED", "CANCELLED"],
  ACCEPTED: ["IN_PROGRESS", "CANCELLED"],
  IN_PROGRESS: ["COMPLETED", "CANCELLED"],
  COMPLETED: [], // Terminal state
  CANCELLED: [], // Terminal state
};

/**
 * Order state machine transitions
 */
export const ORDER_STATE_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  PENDING_CONFIRMATION: [
    "ACCEPTED",
    "CANCELLED_BY_CUSTOMER",
    "CANCELLED_BY_PROVIDER",
  ],
  ACCEPTED: ["IN_PROGRESS", "CANCELLED_BY_CUSTOMER", "CANCELLED_BY_PROVIDER"],
  IN_PROGRESS: ["COMPLETED", "CANCELLED_BY_CUSTOMER", "CANCELLED_BY_PROVIDER"],
  COMPLETED: [], // Terminal state
  CANCELLED_BY_CUSTOMER: [], // Terminal state
  CANCELLED_BY_PROVIDER: [], // Terminal state
};

/**
 * Check if a job status transition is valid
 */
export function isValidJobTransition(from: JobStatus, to: JobStatus): boolean {
  return JOB_STATE_TRANSITIONS[from]?.includes(to) ?? false;
}

/**
 * Check if an order status transition is valid
 */
export function isValidOrderTransition(
  from: OrderStatus,
  to: OrderStatus,
): boolean {
  return ORDER_STATE_TRANSITIONS[from]?.includes(to) ?? false;
}
