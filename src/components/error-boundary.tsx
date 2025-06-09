"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary component to catch JavaScript errors anywhere in the child component tree
 * and display a fallback UI instead of crashing the whole app
 */
class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // You can log the error to an error reporting service
    console.error("ErrorBoundary caught an error", error, errorInfo);
    
    // Optional: Send to your error tracking service
    // reportErrorToService(error, errorInfo);
  }

  resetErrorBoundary = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        this.props.fallback || (
          <div className="flex flex-col items-center justify-center min-h-[400px] p-4 text-center rounded-md border bg-background">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <AlertTriangle className="h-10 w-10 text-orange-500" />
            </div>
            <h2 className="mt-6 text-xl font-semibold">Something went wrong</h2>
            <p className="mt-2 mb-6 text-sm text-muted-foreground max-w-md">
              An error occurred in the application. The error has been logged and we've been notified.
            </p>
            {this.state.error && (
              <div className="my-4 max-w-md overflow-auto rounded border bg-muted p-4 text-left">
                <p className="text-sm font-medium">Error: {this.state.error.message}</p>
              </div>
            )}
            <Button onClick={this.resetErrorBoundary} className="mt-4">
              <RefreshCw className="mr-2 h-4 w-4" /> Try again
            </Button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

/**
 * A hook that provides the capability to trigger error boundary from any child component
 */
export function useErrorBoundary(): (error: Error) => void {
  const context = React.useContext(ErrorBoundaryContext);
  
  if (context === undefined) {
    throw new Error("useErrorBoundary must be used within an ErrorBoundaryProvider");
  }
  
  return context.onError;
}

interface ErrorBoundaryContextType {
  onError: (error: Error) => void;
}

const ErrorBoundaryContext = React.createContext<
  ErrorBoundaryContextType | undefined
>(undefined);

interface ErrorBoundaryProviderProps {
  children: React.ReactNode;
}

/**
 * A provider component that enables programmatic triggering of the error boundary
 */
export function ErrorBoundaryProvider({
  children,
}: ErrorBoundaryProviderProps): JSX.Element {
  const [error, setError] = React.useState<Error | null>(null);

  const handleError = React.useCallback((error: Error) => {
    setError(error);
  }, []);

  // If there's an error, throw it so the nearest error boundary can catch it
  if (error) {
    throw error;
  }

  return (
    <ErrorBoundaryContext.Provider value={{ onError: handleError }}>
      {children}
    </ErrorBoundaryContext.Provider>
  );
}

export { ErrorBoundary };

/**
 * Usage examples:
 * 
 * Basic usage:
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 * 
 * With custom fallback:
 * <ErrorBoundary fallback={<CustomErrorFallback />}>
 *   <YourComponent />
 * </ErrorBoundary>
 * 
 * With ErrorBoundaryProvider:
 * function App() {
 *   return (
 *     <ErrorBoundaryProvider>
 *       <ErrorBoundary>
 *         <YourComponent />
 *       </ErrorBoundary>
 *     </ErrorBoundaryProvider>
 *   );
 * }
 * 
 * In a component, trigger the error boundary:
 * function YourComponent() {
 *   const triggerError = useErrorBoundary();
 *   
 *   const handleClick = () => {
 *     try {
 *       // Risky operation
 *     } catch (error) {
 *       triggerError(error);
 *     }
 *   };
 * 
 *   return <button onClick={handleClick}>Do something risky</button>;
 * }
 */
