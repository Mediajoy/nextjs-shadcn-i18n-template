"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { usePagination } from "@/hooks/use-pagination";

interface TablePaginationProps {
  itemCount: number;
  pageIndex: number;
  pageCount: number;
  pageSize: number;
  pageSizeOptions?: number[];
  canPreviousPage: boolean;
  canNextPage: boolean;
  setPageIndex: (index: number) => void;
  setPageSize: (size: number) => void;
  previousPage: () => void;
  nextPage: () => void;
  firstPage: () => void;
  lastPage: () => void;
  className?: string;
}

export function TablePagination({
  itemCount,
  pageIndex,
  pageCount,
  pageSize,
  pageSizeOptions = [10, 20, 30, 40, 50],
  canPreviousPage,
  canNextPage,
  setPageIndex,
  setPageSize,
  previousPage,
  nextPage,
  firstPage,
  lastPage,
  className,
}: TablePaginationProps) {
  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between px-2 ${className}`}>
      <div className="flex-1 text-sm text-muted-foreground">
        {itemCount > 0 ? (
          <p>
            Showing {pageIndex * pageSize + 1} to{" "}
            {Math.min((pageIndex + 1) * pageSize, itemCount)} of{" "}
            {itemCount} entries
          </p>
        ) : (
          <p>No results</p>
        )}
      </div>
      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={firstPage}
            disabled={!canPreviousPage}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={previousPage}
            disabled={!canPreviousPage}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <div className="flex items-center justify-center text-sm font-medium">
            Page {pageIndex + 1} of {pageCount || 1}
          </div>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={nextPage}
            disabled={!canNextPage}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={lastPage}
            disabled={!canNextPage}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

/**
 * A helper component that combines usePagination hook with TablePagination UI
 */
export function DataTablePagination({
  itemCount,
  options,
  pageSizeOptions,
  className,
}: {
  itemCount: number;
  options?: Parameters<typeof usePagination>[1];
  pageSizeOptions?: number[];
  className?: string;
}) {
  const pagination = usePagination(itemCount, options);
  
  return (
    <TablePagination
      {...pagination}
      pageSizeOptions={pageSizeOptions}
      className={className}
    />
  );
}
