import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Globe, Layers, FileCode, Palette, Shield, Layout, FileSpreadsheet } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24">
      <div className="container max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
              Next.js + shadcn/ui Template
            </h1>
            <p className="text-xl text-muted-foreground">
              A production-grade application template with enterprise features
            </p>
          </div>
          <Badge variant="outline" className="text-sm px-3 py-1">
            v1.0.0
          </Badge>
        </div>
        
        <div className="mb-12 p-4 border rounded-lg bg-muted/50">
          <p className="font-medium">✨ Explore this template's features by clicking on the cards below</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {/* Core Features */}
          <Card className="overflow-hidden border-l-4 border-l-primary">
            <CardHeader className="pb-2">
              <div className="flex items-center mb-2">
                <div className="mr-2 p-1 rounded-md bg-primary/10">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                <Badge variant="secondary" className="ml-auto">New</Badge>
              </div>
              <CardTitle>Internationalization</CardTitle>
              <CardDescription>Multiple language support</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Full i18n support with English and Spanish translations, easily extendable to more languages.</p>
            </CardContent>
            <CardFooter>
              <Link href="/dashboard/i18n-example" className="w-full">
                <Button className="w-full justify-between group">
                  View Example
                  <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center mb-2">
                <div className="mr-2 p-1 rounded-md bg-primary/10">
                  <FileCode className="h-5 w-5 text-primary" />
                </div>
              </div>
              <CardTitle>Advanced Forms</CardTitle>
              <CardDescription>Forms with validation</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Built with React Hook Form and Zod validation for type-safe form handling.</p>
            </CardContent>
            <CardFooter>
              <Link href="/form" className="w-full">
                <Button variant="outline" className="w-full justify-between group">
                  View Example
                  <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center mb-2">
                <div className="mr-2 p-1 rounded-md bg-primary/10">
                  <Palette className="h-5 w-5 text-primary" />
                </div>
              </div>
              <CardTitle>Theming</CardTitle>
              <CardDescription>Light and dark mode</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Toggle between light and dark themes with persistent user preferences.</p>
            </CardContent>
            <CardFooter>
              <Link href="/dashboard" className="w-full">
                <Button variant="outline" className="w-full justify-between group">
                  View Example
                  <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        {/* Additional Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center mb-2">
                <div className="mr-2 p-1 rounded-md bg-primary/10">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
              </div>
              <CardTitle>Authentication</CardTitle>
              <CardDescription>Secure user authentication</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">User authentication and authorization with NextAuth.js.</p>
            </CardContent>
            <CardFooter>
              <Link href="/login" className="w-full">
                <Button variant="outline" className="w-full justify-between group">
                  View Demo
                  <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center mb-2">
                <div className="mr-2 p-1 rounded-md bg-primary/10">
                  <Layout className="h-5 w-5 text-primary" />
                </div>
              </div>
              <CardTitle>Dashboard</CardTitle>
              <CardDescription>Admin dashboard layout</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Responsive dashboard with sidebar navigation and user profile.</p>
            </CardContent>
            <CardFooter>
              <Link href="/dashboard" className="w-full">
                <Button variant="outline" className="w-full justify-between group">
                  View Demo
                  <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center mb-2">
                <div className="mr-2 p-1 rounded-md bg-primary/10">
                  <FileSpreadsheet className="h-5 w-5 text-primary" />
                </div>
              </div>
              <CardTitle>Tables</CardTitle>
              <CardDescription>Data tables with sorting</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Display and manipulate data with sortable and filterable tables.</p>
            </CardContent>
            <CardFooter>
              <Link href="/dashboard/tables" className="w-full">
                <Button variant="outline" className="w-full justify-between group">
                  View Demo
                  <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        {/* Documentation and Resources */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Documentation</CardTitle>
              <CardDescription>How to use this template</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-2">This template includes everything you need for a production app:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Next.js 14 with App Router</li>
                <li>TypeScript for type safety</li>
                <li>shadcn/ui components</li>
                <li>Internationalization with multiple languages</li>
                <li>Authentication and authorization</li>
                <li>Form validation with React Hook Form & Zod</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/docs" className="w-full">
                <Button variant="outline" className="w-full justify-between group">
                  View Documentation
                  <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>Quick setup instructions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md bg-muted p-3">
                  <code className="text-sm">
                    <span className="text-blue-500">git</span> clone https://github.com/username/nextjs-shadcn-template.git
                  </code>
                </div>
                <div className="rounded-md bg-muted p-3">
                  <code className="text-sm">
                    <span className="text-blue-500">cd</span> nextjs-shadcn-template
                  </code>
                </div>
                <div className="rounded-md bg-muted p-3">
                  <code className="text-sm">
                    <span className="text-blue-500">npm</span> install
                  </code>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/docs/internationalization.md" className="w-full">
                <Button variant="outline" className="w-full justify-between group">
                  View i18n Guide
                  <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        <div className="text-center mt-10 mb-6 p-6 border rounded-lg bg-muted/30">
          <h2 className="text-2xl font-bold mb-2">Ready to start building?</h2>
          <p className="text-muted-foreground mb-4">Check out our feature-rich i18n example:</p>
          <Link href="/dashboard/i18n-example">
            <Button size="lg" className="px-8">
              View i18n Example
            </Button>
          </Link>
        </div>
      </div>

      <footer className="w-full mt-20 border-t py-6 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Next.js + shadcn/ui Template. All rights reserved.</p>
      </footer>
    </main>
  );
}
