/**
 * API utility functions for handling HTTP requests
 * Provides consistent error handling, request formatting, and response parsing
 */

// Define API error types for better error handling
export type ApiErrorType = 
  | "BAD_REQUEST" 
  | "UNAUTHORIZED" 
  | "FORBIDDEN" 
  | "NOT_FOUND" 
  | "RATE_LIMITED" 
  | "INTERNAL_SERVER_ERROR" 
  | "SERVICE_UNAVAILABLE" 
  | "NETWORK_ERROR"
  | "TIMEOUT"
  | "UNKNOWN";

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly type: ApiErrorType;
  public readonly data?: any;

  constructor(message: string, statusCode: number, type: ApiErrorType, data?: any) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.type = type;
    this.data = data;
  }
}

interface FetchOptions extends RequestInit {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

/**
 * Map HTTP status codes to error types
 */
function mapStatusToErrorType(status: number): ApiErrorType {
  switch (status) {
    case 400: return "BAD_REQUEST";
    case 401: return "UNAUTHORIZED";
    case 403: return "FORBIDDEN";
    case 404: return "NOT_FOUND";
    case 429: return "RATE_LIMITED";
    case 500: return "INTERNAL_SERVER_ERROR";
    case 503: return "SERVICE_UNAVAILABLE";
    default: return "UNKNOWN";
  }
}

/**
 * Enhanced fetch API with timeout, retries, and error handling
 */
export async function fetchWithTimeout(
  url: string,
  options: FetchOptions = {}
): Promise<Response> {
  const { timeout = 10000, retries = 0, retryDelay = 300, ...fetchOptions } = options;
  
  // Create an AbortController to handle timeouts
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });
    
    return response;
  } catch (error) {
    if ((error as Error).name === "AbortError") {
      throw new ApiError(
        "Request timed out", 
        408, 
        "TIMEOUT"
      );
    }
    
    if (retries > 0) {
      // Wait for the retry delay
      await new Promise(resolve => setTimeout(resolve, retryDelay));
      
      // Retry the request with one fewer retry
      return fetchWithTimeout(url, {
        ...options,
        retries: retries - 1,
        retryDelay: retryDelay * 2, // Exponential backoff
      });
    }
    
    throw new ApiError(
      "Network error", 
      0, 
      "NETWORK_ERROR", 
      error
    );
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Handle API response with proper error handling
 */
export async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorData;
    let errorMessage = response.statusText;
    
    try {
      // Try to parse error response as JSON
      errorData = await response.json();
      errorMessage = errorData.message || errorData.error || response.statusText;
    } catch (e) {
      // If parsing fails, use status text
      errorData = null;
    }
    
    throw new ApiError(
      errorMessage,
      response.status,
      mapStatusToErrorType(response.status),
      errorData
    );
  }
  
  // For no-content responses
  if (response.status === 204) {
    return {} as T;
  }
  
  // Parse JSON response
  return response.json();
}

// Main API utility methods

/**
 * Make a GET request to the API
 */
export async function apiGet<T>(
  url: string, 
  options: FetchOptions = {}
): Promise<T> {
  const response = await fetchWithTimeout(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include",
    ...options,
  });
  
  return handleApiResponse<T>(response);
}

/**
 * Make a POST request to the API
 */
export async function apiPost<T>(
  url: string, 
  data: any = {}, 
  options: FetchOptions = {}
): Promise<T> {
  const response = await fetchWithTimeout(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: JSON.stringify(data),
    credentials: "include",
    ...options,
  });
  
  return handleApiResponse<T>(response);
}

/**
 * Make a PUT request to the API
 */
export async function apiPut<T>(
  url: string, 
  data: any = {}, 
  options: FetchOptions = {}
): Promise<T> {
  const response = await fetchWithTimeout(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: JSON.stringify(data),
    credentials: "include",
    ...options,
  });
  
  return handleApiResponse<T>(response);
}

/**
 * Make a PATCH request to the API
 */
export async function apiPatch<T>(
  url: string, 
  data: any = {}, 
  options: FetchOptions = {}
): Promise<T> {
  const response = await fetchWithTimeout(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: JSON.stringify(data),
    credentials: "include",
    ...options,
  });
  
  return handleApiResponse<T>(response);
}

/**
 * Make a DELETE request to the API
 */
export async function apiDelete<T>(
  url: string, 
  options: FetchOptions = {}
): Promise<T> {
  const response = await fetchWithTimeout(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include",
    ...options,
  });
  
  return handleApiResponse<T>(response);
}

/**
 * Upload a file to the API
 */
export async function apiUpload<T>(
  url: string,
  formData: FormData,
  options: FetchOptions = {}
): Promise<T> {
  const response = await fetchWithTimeout(url, {
    method: "POST",
    body: formData,
    credentials: "include",
    ...options,
    // Don't set Content-Type header as the browser will set it with the boundary
    headers: {
      ...options.headers,
    },
  });
  
  return handleApiResponse<T>(response);
}

/**
 * Usage examples:
 * 
 * Simple GET request:
 * const users = await apiGet<User[]>('/api/users');
 * 
 * POST with data:
 * const newUser = await apiPost<User>('/api/users', { name: 'John', email: 'john@example.com' });
 * 
 * Error handling:
 * try {
 *   const data = await apiGet<Data>('/api/data');
 * } catch (error) {
 *   if (error instanceof ApiError) {
 *     if (error.type === 'UNAUTHORIZED') {
 *       // Handle unauthorized error
 *     } else {
 *       // Handle other errors
 *     }
 *   }
 * }
 */
