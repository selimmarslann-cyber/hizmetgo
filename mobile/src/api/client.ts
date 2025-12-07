/**
 * API Client - Mobile
 *
 * Generic fetch helper for mobile app.
 * FAZ 2: Backend API'lerine bağlandı.
 */

import { API_BASE_URL } from "../config/env";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | null | undefined>;
  authToken?: string;
}

/**
 * Generic request helper with JSON parsing and error handling
 */
export async function request<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { params, authToken, ...fetchOptions } = options;
  const baseUrl = API_BASE_URL.replace(/\/$/, ""); // Remove trailing slash

  // Build URL with query params
  let url = path.startsWith("/") ? `${baseUrl}${path}` : `${baseUrl}/${path}`;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  // Default headers
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...fetchOptions.headers,
  };

  // Add Authorization header if token provided
  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  // Make request
  const response = await fetch(url, {
    ...fetchOptions,
    headers,
  });

  // Check content-type
  const contentType = response.headers.get("content-type");
  const isJson = contentType?.includes("application/json");

  // Handle non-JSON responses
  if (!isJson) {
    if (!response.ok) {
      const text = await response.text();
      throw new ApiError(
        text || `HTTP ${response.status}: ${response.statusText}`,
        response.status,
      );
    }
    return {} as T;
  }

  // Parse JSON
  let data: any;
  try {
    data = await response.json();
  } catch (parseError) {
    throw new ApiError(
      "Invalid JSON response",
      response.status,
      "INVALID_JSON",
    );
  }

  // Handle errors
  if (!response.ok) {
    const errorMessage =
      data?.error ||
      data?.message ||
      `HTTP ${response.status}: ${response.statusText}`;
    const errorCode = response.status === 401 ? "UNAUTHORIZED" : undefined;

    throw new ApiError(errorMessage, response.status, errorCode);
  }

  return data as T;
}
