"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Define the user type - extend this according to your needs
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<boolean>;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// The provider component that wraps your app and makes auth available
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check if the user is authenticated
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        // Replace this with your actual authentication check
        // For example, call an API endpoint to validate the session
        const response = await fetch("/api/auth/session");
        
        if (response.ok) {
          const data = await response.json();
          
          if (data.user) {
            setUser(data.user);
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkUserSession();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Replace with your actual login logic
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Login failed");
      }
      
      const data = await response.json();
      setUser(data.user);
      
      toast.success("Logged in successfully");
      return true;
    } catch (error) {
      console.error("Login error:", error);
      toast.error((error as Error).message || "Failed to login");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Replace with your actual registration logic
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Registration failed");
      }
      
      toast.success("Registration successful! Please log in.");
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      toast.error((error as Error).message || "Failed to register");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      // Replace with your actual logout logic
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      
      setUser(null);
      toast.info("Logged out successfully");
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout");
    }
  };

  // Reset password function
  const resetPassword = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Replace with your actual password reset logic
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Password reset failed");
      }
      
      toast.success("Password reset email sent. Please check your inbox.");
      return true;
    } catch (error) {
      console.error("Password reset error:", error);
      toast.error((error as Error).message || "Failed to reset password");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Memoize the context value to prevent unnecessary re-renders
  const value = React.useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      resetPassword,
    }),
    [user, isLoading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
}

/**
 * Component to protect routes that require authentication
 */
export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Redirect to login page if not authenticated
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  // Only render children if authenticated
  return isAuthenticated ? <>{children}</> : null;
}

/**
 * Usage examples:
 * 
 * In your app layout:
 * <AuthProvider>
 *   <RootLayout>{children}</RootLayout>
 * </AuthProvider>
 * 
 * Protect a route:
 * <RequireAuth>
 *   <DashboardPage />
 * </RequireAuth>
 * 
 * Use authentication in components:
 * const { user, logout } = useAuth();
 */
