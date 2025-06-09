"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  Settings,
  Bell,
  Search,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useAuth } from "@/providers/auth-provider";
import { useTranslation } from "@/i18n/useTranslation";

interface AppShellProps {
  children: React.ReactNode;
  showNav?: boolean;
  navItems?: {
    title: string;
    href: string;
    icon?: React.ComponentType<{ className?: string }>;
    subItems?: { title: string; href: string }[];
  }[];
  logoUrl?: string;
  logoText?: string;
  userMenuItems?: {
    title: string;
    href?: string;
    onClick?: () => void;
    icon?: React.ComponentType<{ className?: string }>;
    divider?: boolean;
  }[];
  stickyHeader?: boolean;
}

export function AppShell({
  children,
  showNav = true,
  navItems = [],
  logoUrl = "/logo.svg",
  logoText = "Next.js App",
  userMenuItems,
  stickyHeader = true,
}: AppShellProps) {
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  // Default user menu items if not provided
  const defaultUserMenuItems = [
    {
      title: t('nav.profile'),
      href: "/profile",
      icon: User,
    },
    {
      title: t('nav.settings'),
      href: "/settings",
      icon: Settings,
    },
    {
      title: t('auth.logout'),
      onClick: logout,
      icon: LogOut,
      divider: true,
    },
  ];

  // Use provided menu items or defaults
  const actualUserMenuItems = userMenuItems || defaultUserMenuItems;

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Header */}
      <header
        className={cn(
          "w-full bg-background border-b z-40",
          stickyHeader && "sticky top-0"
        )}
      >
        <div className="container flex h-16 items-center px-4 sm:px-8">
          {/* Mobile nav toggle */}
          {showNav && (
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus:ring-0 md:hidden"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              aria-label="Toggle Menu"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">{t('nav.toggleMenu')}</span>
            </Button>
          )}

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img 
              src={logoUrl} 
              alt={`${logoText} ${t('app.name')}`} 
              className="h-8 w-8"
              onError={(e) => {
                // Fallback for missing logo
                e.currentTarget.style.display = 'none';
              }}
            />
            <span className="font-bold text-xl">{logoText}</span>
          </Link>

          {/* Desktop navigation */}
          {showNav && (
            <nav className="hidden md:flex ml-10 space-x-4 flex-1">
              {navItems.map((item) => (
                <React.Fragment key={item.href}>
                  {item.subItems ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className={cn(
                            "flex items-center px-2",
                            pathname.startsWith(item.href) &&
                              "bg-accent text-accent-foreground"
                          )}
                        >
                          {item.icon && (
                            <item.icon className="mr-2 h-4 w-4" />
                          )}
                          {item.title}
                          <ChevronDown className="ml-1 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        {item.subItems.map((subItem) => (
                          <DropdownMenuItem key={subItem.href}>
                            <Link
                              href={subItem.href}
                              className="w-full"
                              onClick={() => setMobileNavOpen(false)}
                            >
                              {subItem.title}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center px-2 py-1.5 text-sm font-medium rounded-md transition-colors",
                        pathname === item.href ||
                          (item.href !== "/" && pathname.startsWith(item.href))
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                      {item.title}
                    </Link>
                  )}
                </React.Fragment>
              ))}
            </nav>
          )}

          {/* Right side tools */}
          <div className="ml-auto flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="px-2"
              aria-label={t('table.search')}
            >
              <Search className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="px-2"
              aria-label={t('nav.notifications')}
            >
              <Bell className="h-4 w-4" />
            </Button>

            <ThemeToggle />
            <LanguageSwitcher variant="ghost" size="icon" />

            {/* User menu */}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-9 w-9 rounded-full p-0 overflow-hidden"
                    aria-label="User menu"
                  >
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground rounded-full">
                        {user.name?.[0]?.toUpperCase() || "U"}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-0.5">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  {actualUserMenuItems.map((item, i) => (
                    <React.Fragment key={i}>
                      {item.divider && <DropdownMenuSeparator />}
                      <DropdownMenuItem
                        asChild={Boolean(item.href)}
                        onClick={item.onClick}
                      >
                        {item.href ? (
                          <Link
                            href={item.href}
                            className="flex w-full items-center"
                          >
                            {item.icon && (
                              <item.icon className="mr-2 h-4 w-4" />
                            )}
                            {item.title}
                          </Link>
                        ) : (
                          <div className="flex items-center">
                            {item.icon && (
                              <item.icon className="mr-2 h-4 w-4" />
                            )}
                            {item.title}
                          </div>
                        )}
                      </DropdownMenuItem>
                    </React.Fragment>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </header>

      {/* Mobile navigation */}
      {showNav && (
        <div
          className={cn(
            "fixed inset-0 z-50 bg-background md:hidden",
            mobileNavOpen ? "flex flex-col" : "hidden"
          )}
        >
          <div className="flex h-16 items-center justify-between px-4">
            <Link
              href="/"
              className="flex items-center space-x-2"
              onClick={() => setMobileNavOpen(false)}
            >
              <img src={logoUrl} alt="Logo" className="h-8 w-8" />
              <span className="font-bold text-xl">{logoText}</span>
            </Link>
            <Button
              variant="ghost"
              className="px-0 text-base hover:bg-transparent focus:ring-0"
              onClick={() => setMobileNavOpen(false)}
              aria-label="Close Menu"
            >
              <X className="h-6 w-6" />
              <span className="sr-only">{t('nav.closeMenu')}</span>
            </Button>
          </div>
          <div className="flex-1 overflow-auto pt-4">
            <nav className="flex flex-col space-y-2 px-4">
              {navItems.map((item) => (
                <React.Fragment key={item.href}>
                  {item.subItems ? (
                    <>
                      <div className="font-medium px-2 py-1.5">
                        {item.icon && <item.icon className="mr-2 h-4 w-4 inline-block" />}
                        {item.title}
                      </div>
                      <div className="pl-4 space-y-1">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={cn(
                              "flex items-center px-2 py-1.5 text-sm rounded-md",
                              pathname === subItem.href
                                ? "bg-accent text-accent-foreground"
                                : "text-muted-foreground"
                            )}
                            onClick={() => setMobileNavOpen(false)}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center px-2 py-1.5 rounded-md",
                        pathname === item.href ||
                          (item.href !== "/" && pathname.startsWith(item.href))
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground"
                      )}
                      onClick={() => setMobileNavOpen(false)}
                    >
                      {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                      {item.title}
                    </Link>
                  )}
                </React.Fragment>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 container px-4 sm:px-8 py-6">{children}</main>

      {/* Footer */}
      <footer className="py-6 border-t">
        <div className="container px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {logoText}. {t('app.copyright')}
          </p>
          <div className="flex items-center space-x-4 mt-3 sm:mt-0">
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:underline"
            >
              {t('app.terms')}
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:underline"
            >
              {t('app.privacy')}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

/**
 * Usage example:
 * 
 * import { Home, Settings, Users, FileText } from "lucide-react";
 * 
 * export default function Layout({ children }) {
 *   const navItems = [
 *     { title: "Dashboard", href: "/dashboard", icon: Home },
 *     { title: "Users", href: "/users", icon: Users },
 *     { 
 *       title: "Content", 
 *       href: "/content", 
 *       icon: FileText,
 *       subItems: [
 *         { title: "Articles", href: "/content/articles" },
 *         { title: "Categories", href: "/content/categories" }
 *       ]
 *     },
 *     { title: "Settings", href: "/settings", icon: Settings },
 *   ];
 * 
 *   return (
 *     <AppShell navItems={navItems} logoText="My App">
 *       {children}
 *     </AppShell>
 *   );
 * }
 */
