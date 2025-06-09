"use client";

import React from "react";
import {
  Home,
  Users,
  Settings,
  FileText,
  Bell,
  BarChart2,
  LayoutDashboard,
  Table,
  FormInput,
} from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { RequireAuth } from "@/providers/auth-provider";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

// Navigation items for the dashboard
const navItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart2,
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Content",
    href: "/dashboard/content",
    icon: FileText,
    subItems: [
      { title: "Articles", href: "/dashboard/content/articles" },
      { title: "Categories", href: "/dashboard/content/categories" },
      { title: "Media", href: "/dashboard/content/media" },
    ],
  },
  {
    title: "Data Tables",
    href: "/dashboard/tables",
    icon: Table,
  },
  {
    title: "Forms",
    href: "/dashboard/forms",
    icon: FormInput,
  },
  {
    title: "Notifications", 
    href: "/dashboard/notifications",
    icon: Bell,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <RequireAuth>
      <AppShell
        navItems={navItems}
        logoText="Next.js App"
        stickyHeader={true}
      >
        {children}
      </AppShell>
    </RequireAuth>
  );
}
