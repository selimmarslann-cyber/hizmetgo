/**
 * API Client - Generic Fetch Helper with Retry & Timeout
 *
 * Merkezi fetch helper fonksiyonu. Tüm API çağrıları bu helper üzerinden yapılır.
 *
 * Features:
 * - Automatic retry (3 attempts with exponential backoff)
 * - Request timeout (30s default)
 * - Error handling
 * - Connection pooling ready
 */

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
    public retries?: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean | null | undefined>;
  retries?: number; // Number of retry attempts (default: 3)
  timeout?: number; // Request timeout in ms (default: 30000)
  retryDelay?: number; // Base delay for exponential backoff in ms (default: 1000)
}

/**
 * Sleep utility for retry delays
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Check if error is retryable
 */
function isRetryableError(error: any, status?: number): boolean {
  // Network errors are retryable
  if (error instanceof TypeError && error.message.includes("fetch")) {
    return true;
  }

  // 5xx server errors are retryable
  if (status && status >= 500) {
    return true;
  }

  // 408 Request Timeout is retryable
  if (status === 408) {
    return true;
  }

  // 429 Too Many Requests is retryable
  if (status === 429) {
    return true;
  }

  return false;
}

/**
 * Fetch with retry and timeout
 */
async function fetchWithRetry(
  url: string,
  options: FetchOptions,
  retries: number = 3,
  timeout: number = 30000,
  retryDelay: number = 1000,
): Promise<Response> {
  let lastError: any;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      try {
        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        // If response is ok, return it
        if (response.ok) {
          return response;
        }

        // If error is retryable and we have retries left, retry
        if (isRetryableError(null, response.status) && attempt < retries) {
          const delay = retryDelay * Math.pow(2, attempt); // Exponential backoff
          await sleep(delay);
          continue;
        }

        // If not retryable or no retries left, return response (will be handled as error)
        return response;
      } catch (fetchError: any) {
        clearTimeout(timeoutId);

        // AbortError is timeout
        if (fetchError.name === "AbortError") {
          throw new ApiError(
            `Request timeout after ${timeout}ms`,
            408,
            "TIMEOUT",
            attempt,
          );
        }

        throw fetchError;
      }
    } catch (error: any) {
      lastError = error;

      // If error is retryable and we have retries left, retry
      if (isRetryableError(error) && attempt < retries) {
        const delay = retryDelay * Math.pow(2, attempt); // Exponential backoff
        await sleep(delay);
        continue;
      }

      // If not retryable or no retries left, throw error
      if (attempt === retries) {
        if (error instanceof ApiError) {
          throw error;
        }
        throw new ApiError(
          error.message || "Network request failed",
          0,
          "NETWORK_ERROR",
          attempt,
        );
      }
    }
  }

  // This should never be reached, but TypeScript needs it
  throw (
    lastError ||
    new ApiError("Request failed after retries", 0, "RETRY_EXHAUSTED", retries)
  );
}

/**
 * Generic fetch helper with JSON parsing, error handling, retry and timeout
 */
export async function fetchJson<T>(
  path: string,
  options: FetchOptions = {},
): Promise<T> {
  const {
    params,
    retries = 3,
    timeout = 30000,
    retryDelay = 1000,
    ...fetchOptions
  } = options;

  // Build URL with query params
  let url = path.startsWith("/") ? `/api${path}` : `/api/${path}`;
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

  // Make request with retry and timeout
  const response = await fetchWithRetry(
    url,
    {
      ...fetchOptions,
      headers,
      credentials: "include", // Important for auth cookies
    },
    retries,
    timeout,
    retryDelay,
  );

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
    // For non-JSON success responses, return empty object
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
      data?.error || `HTTP ${response.status}: ${response.statusText}`;
    const errorCode = response.status === 401 ? "UNAUTHORIZED" : undefined;

    throw new ApiError(errorMessage, response.status, errorCode);
  }

  return data as T;
}
