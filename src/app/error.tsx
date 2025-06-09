"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] gap-6 py-10">
      <div className="flex items-center justify-center h-20 w-20 rounded-full bg-red-100 dark:bg-red-900/20">
        <AlertCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
      </div>
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
          Something went wrong!
        </h1>
        <p className="text-muted-foreground max-w-[500px]">
          We apologize for the inconvenience. An unexpected error has occurred.
          {error.digest && (
            <span className="block text-sm mt-2">
              Error ID: {error.digest}
            </span>
          )}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Button variant="outline" onClick={reset}>
          Try again
        </Button>
        <Button asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
