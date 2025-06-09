"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col gap-4 py-10 md:flex-row md:justify-between">
        <div className="flex flex-col gap-4">
          <Link href="/" className="text-lg font-semibold">
            Next.js + shadcn
          </Link>
          <p className="text-sm text-muted-foreground max-w-xs">
            A template for building modern web applications with Next.js 14, shadcn/ui components, and best practices.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">Resources</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/docs" className="hover:text-foreground transition-colors">Documentation</Link>
              <Link href="https://ui.shadcn.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">shadcn/ui</Link>
              <Link href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Next.js Docs</Link>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">Features</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/form" className="hover:text-foreground transition-colors">Forms</Link>
              <Link href="/upload" className="hover:text-foreground transition-colors">File Upload</Link>
              <Link href="/email" className="hover:text-foreground transition-colors">Email</Link>
              <Link href="/database" className="hover:text-foreground transition-colors">Database</Link>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">About</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="https://github.com/yourusername/nextjs-shadcn-template" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub</Link>
              <Link href="/docs" className="hover:text-foreground transition-colors">License</Link>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container border-t py-6 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Next.js + shadcn Template. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <Link href="#" className="hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-foreground transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
