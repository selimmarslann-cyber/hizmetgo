/**
 * Standardized API Error Response
 *
 * Provides consistent error format across all API routes
 */

export type ErrorCode =
  | "VALIDATION_ERROR"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "RATE_LIMIT_EXCEEDED"
  | "INTERNAL_ERROR"
  | "BAD_REQUEST"
  | "CONFLICT"
  | "PAYMENT_ERROR"
  | "NETWORK_ERROR";

export interface ApiErrorResponse {
  ok: false;
  errorCode: ErrorCode;
  message: string;
  details?: any;
}

export interface ApiSuccessResponse<T = any> {
  ok: true;
  data: T;
}

export type ApiResponse<T = any> = ApiSuccessResponse<T> | ApiErrorResponse;

/**
 * Create standardized error response
 */
export function createErrorResponse(
  errorCode: ErrorCode,
  message: string,
  details?: any,
): ApiErrorResponse {
  return {
    ok: false,
    errorCode,
    message,
    ...(details && { details }),
  };
}

/**
 * Create standardized success response
 */
export function createSuccessResponse<T>(data: T): ApiSuccessResponse<T> {
  return {
    ok: true,
    data,
  };
}

/**
 * Map HTTP status code to error code
 */
export function getErrorCodeFromStatus(status: number): ErrorCode {
  switch (status) {
    case 400:
      return "BAD_REQUEST";
    case 401:
      return "UNAUTHORIZED";
    case 403:
      return "FORBIDDEN";
    case 404:
      return "NOT_FOUND";
    case 409:
      return "CONFLICT";
    case 429:
      return "RATE_LIMIT_EXCEEDED";
    case 500:
    default:
      return "INTERNAL_ERROR";
  }
}

/**
 * Map error code to HTTP status code
 */
export function getStatusFromErrorCode(errorCode: ErrorCode): number {
  switch (errorCode) {
    case "VALIDATION_ERROR":
    case "BAD_REQUEST":
      return 400;
    case "UNAUTHORIZED":
      return 401;
    case "FORBIDDEN":
      return 403;
    case "NOT_FOUND":
      return 404;
    case "CONFLICT":
      return 409;
    case "RATE_LIMIT_EXCEEDED":
      return 429;
    case "PAYMENT_ERROR":
      return 402;
    case "NETWORK_ERROR":
      return 503;
    case "INTERNAL_ERROR":
    default:
      return 500;
  }
}
