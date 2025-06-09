"use client";

import useSWR, { SWRConfiguration, SWRResponse } from "swr";
import useSWRInfinite, { SWRInfiniteResponse } from "swr/infinite";

type FetcherOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
};

/**
 * Default fetcher for SWR that supports JSON endpoints
 */
export const defaultFetcher = async (url: string, options?: FetcherOptions) => {
  const method = options?.method || "GET";
  const headers = options?.headers || {};
  
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...(options?.body && { body: JSON.stringify(options.body) }),
  });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the data.");
    const info = await response.json().catch(() => ({}));
    (error as any).status = response.status;
    (error as any).info = info;
    throw error;
  }
  
  return response.json();
};

/**
 * Custom hook for data fetching with SWR
 * Provides error handling, loading state, and automatic revalidation
 * 
 * @param url URL to fetch data from or null to skip fetching
 * @param options SWR configuration options
 * @returns SWR response with data, error, and loading state
 */
export function useDataFetch<Data = any, Error = any>(
  url: string | null, 
  options?: SWRConfiguration & FetcherOptions
): SWRResponse<Data, Error> & { isLoading: boolean } {
  const {
    headers,
    body,
    method,
    ...swrOptions
  } = options || {};
  
  const fetcherOptions = {
    headers,
    body,
    method
  };
  
  // Use SWR for data fetching with our custom fetcher
  const response = useSWR<Data, Error>(
    url, 
    url ? (url) => defaultFetcher(url, fetcherOptions) : null,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      dedupingInterval: 5000,
      ...swrOptions,
    }
  );
  
  // Determine loading state (true during initial load, false during revalidation)
  const isLoading = url ? response.data === undefined && !response.error : false;
  
  return {
    ...response,
    isLoading,
  };
}

/**
 * Custom hook for paginated/infinite data fetching
 * 
 * @param getKey Function to get the key for a page
 * @param options SWR configuration options
 * @returns SWR infinite response with data, error, and loading state
 */
export function useInfiniteDataFetch<Data = any, Error = any>(
  getKey: (pageIndex: number, previousPageData: any) => string | null,
  options?: SWRConfiguration & FetcherOptions
): SWRInfiniteResponse<Data, Error> & { isLoading: boolean } {
  const {
    headers,
    body,
    method,
    ...swrOptions
  } = options || {};
  
  const fetcherOptions = {
    headers,
    body,
    method
  };
  
  // Use SWR Infinite for paginated data
  const response = useSWRInfinite<Data, Error>(
    getKey,
    (url) => defaultFetcher(url, fetcherOptions),
    {
      revalidateFirstPage: false,
      revalidateOnFocus: false,
      revalidateAll: false,
      ...swrOptions,
    }
  );
  
  // Determine loading state
  const isLoading = !response.data && !response.error;
  
  return {
    ...response,
    isLoading,
  };
}

/**
 * Usage Examples:
 * 
 * Basic data fetching:
 * const { data, error, isLoading } = useDataFetch('/api/users');
 * 
 * With custom options:
 * const { data } = useDataFetch('/api/posts', { 
 *   revalidateOnFocus: false,
 *   refreshInterval: 5000 
 * });
 * 
 * POST request:
 * const { data } = useDataFetch('/api/forms/submit', { 
 *   method: 'POST',
 *   body: { name: 'John', email: 'john@example.com' } 
 * });
 * 
 * Infinite loading:
 * const { data, size, setSize } = useInfiniteDataFetch(
 *   (pageIndex, previousPageData) => {
 *     if (previousPageData && !previousPageData.length) return null;
 *     return `/api/posts?page=${pageIndex}&limit=10`;
 *   }
 * );
 */
