"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type PaginationState = {
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  itemCount: number;
};

export type PaginationOptions = {
  pageParam?: string;
  sizeParam?: string;
  defaultPageIndex?: number;
  defaultPageSize?: number;
};

export function usePagination(
  itemCount: number,
  options: PaginationOptions = {}
) {
  const {
    pageParam = "page",
    sizeParam = "size",
    defaultPageIndex = 0,
    defaultPageSize = 10,
  } = options;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get current pagination state from URL or defaults
  const pageIndex = 
    Math.max(
      0,
      Number(searchParams.get(pageParam) || defaultPageIndex)
    );
    
  const pageSize = 
    Number(searchParams.get(sizeParam) || defaultPageSize);

  // Calculate page count
  const pageCount = Math.ceil(itemCount / pageSize);

  // Check if we can go to next/prev page
  const canPreviousPage = pageIndex > 0;
  const canNextPage = pageIndex < pageCount - 1;

  // Create range of page numbers to display
  const pageRange = useMemo(() => {
    const maxPages = 7; // Max number of page buttons to show
    const middlePages = maxPages - 2; // Pages excluding first and last
    
    if (pageCount <= maxPages) {
      // If we have fewer pages than max, show all
      return Array.from({ length: pageCount }, (_, i) => i);
    } else {
      // Otherwise, show a subset with ellipsis
      const startPages = Math.min(pageIndex, Math.floor(middlePages / 2));
      const endOffset = middlePages - startPages;
      
      const firstPage = Math.max(0, pageIndex - startPages);
      const lastPage = Math.min(pageCount - 1, pageIndex + endOffset);
      
      const pages = Array.from(
        { length: lastPage - firstPage + 1 },
        (_, i) => firstPage + i
      );
      
      if (firstPage > 0) {
        pages.unshift(-1); // Add ellipsis or separator at start
        pages.unshift(0); // Always show first page
      }
      
      if (lastPage < pageCount - 1) {
        pages.push(-1); // Add ellipsis or separator at end
        pages.push(pageCount - 1); // Always show last page
      }
      
      return pages;
    }
  }, [pageIndex, pageCount]);

  // Navigate to a specific page
  const setPageIndex = useCallback(
    (index: number) => {
      const newParams = new URLSearchParams(searchParams);
      
      if (index === defaultPageIndex) {
        newParams.delete(pageParam);
      } else {
        newParams.set(pageParam, String(index));
      }
      
      const search = newParams.toString();
      const query = search ? `?${search}` : "";
      
      router.push(`${pathname}${query}`);
    },
    [router, pathname, searchParams, pageParam, defaultPageIndex]
  );

  // Change page size
  const setPageSize = useCallback(
    (size: number) => {
      const newParams = new URLSearchParams(searchParams);
      
      // Reset to first page when changing page size
      newParams.delete(pageParam);
      
      if (size === defaultPageSize) {
        newParams.delete(sizeParam);
      } else {
        newParams.set(sizeParam, String(size));
      }
      
      const search = newParams.toString();
      const query = search ? `?${search}` : "";
      
      router.push(`${pathname}${query}`);
    },
    [router, pathname, searchParams, pageParam, sizeParam, defaultPageSize]
  );

  // Methods to navigate through pages
  const previousPage = useCallback(() => {
    if (!canPreviousPage) return;
    setPageIndex(pageIndex - 1);
  }, [canPreviousPage, pageIndex, setPageIndex]);

  const nextPage = useCallback(() => {
    if (!canNextPage) return;
    setPageIndex(pageIndex + 1);
  }, [canNextPage, pageIndex, setPageIndex]);

  const firstPage = useCallback(() => {
    setPageIndex(0);
  }, [setPageIndex]);

  const lastPage = useCallback(() => {
    setPageIndex(pageCount - 1);
  }, [pageCount, setPageIndex]);

  return {
    // State
    pageIndex,
    pageSize,
    pageCount,
    itemCount,
    
    // Calculated helpers
    canPreviousPage,
    canNextPage,
    pageRange,
    
    // Actions
    setPageIndex,
    setPageSize,
    previousPage,
    nextPage,
    firstPage,
    lastPage,
  };
}
