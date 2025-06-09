"use client";

import React, { createContext, useContext } from "react";
import { useAuth } from "./auth-provider";

// Define permission types
export type Permission =
  | "dashboard:access"
  | "users:read"
  | "users:write"
  | "users:delete"
  | "content:read"
  | "content:write"
  | "content:delete"
  | "settings:read"
  | "settings:write";

// Define role types with their permissions
export type Role = "admin" | "editor" | "viewer" | "guest";

// Map roles to their permissions
const rolePermissions: Record<Role, Permission[]> = {
  admin: [
    "dashboard:access",
    "users:read",
    "users:write",
    "users:delete",
    "content:read",
    "content:write",
    "content:delete",
    "settings:read",
    "settings:write",
  ],
  editor: [
    "dashboard:access",
    "users:read",
    "content:read",
    "content:write",
    "content:delete",
    "settings:read",
  ],
  viewer: ["dashboard:access", "users:read", "content:read", "settings:read"],
  guest: ["content:read"],
};

interface PermissionsContextType {
  hasPermission: (permission: Permission) => boolean;
  hasRole: (role: Role) => boolean;
  userRole: Role | null;
}

const PermissionsContext = createContext<PermissionsContextType | undefined>(
  undefined
);

export function PermissionsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  // Get user role from auth context
  const userRole = (user?.role as Role) || null;

  // Check if user has a specific permission
  const hasPermission = (permission: Permission): boolean => {
    if (!user || !userRole) return false;

    const permissions = rolePermissions[userRole];
    return permissions.includes(permission);
  };

  // Check if user has a specific role
  const hasRole = (role: Role): boolean => {
    if (!user || !userRole) return false;

    // Simple role comparison
    return userRole === role;
  };

  const value = {
    hasPermission,
    hasRole,
    userRole,
  };

  return (
    <PermissionsContext.Provider value={value}>
      {children}
    </PermissionsContext.Provider>
  );
}

// Custom hook to use permissions context
export function usePermissions() {
  const context = useContext(PermissionsContext);

  if (context === undefined) {
    throw new Error("usePermissions must be used within a PermissionsProvider");
  }

  return context;
}

// Higher-order component to protect components based on permissions
export function withPermission<P extends object>(
  Component: React.ComponentType<P>,
  requiredPermission: Permission
) {
  return function PermissionProtectedComponent(props: P) {
    const { hasPermission } = usePermissions();
    return hasPermission(requiredPermission) ? (
      <Component {...props} />
    ) : null;
  };
}

// Component to conditionally render based on permission
export function RequirePermission({
  permission,
  children,
  fallback,
}: {
  permission: Permission;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { hasPermission } = usePermissions();

  if (hasPermission(permission)) {
    return <>{children}</>;
  }

  return fallback ? <>{fallback}</> : null;
}

/**
 * Usage examples:
 * 
 * Set up the provider:
 * <AuthProvider>
 *   <PermissionsProvider>
 *     <App />
 *   </PermissionsProvider>
 * </AuthProvider>
 * 
 * Check permissions in a component:
 * const { hasPermission } = usePermissions();
 * if (hasPermission('users:write')) {
 *   // Show user edit UI
 * }
 * 
 * Conditionally render UI elements:
 * <RequirePermission permission="content:write">
 *   <Button>Create New Post</Button>
 * </RequirePermission>
 * 
 * Protect a component with required permission:
 * const AdminSettings = withPermission(SettingsComponent, 'settings:write');
 */
