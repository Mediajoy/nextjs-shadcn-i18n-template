"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "@/components/search";
import Link from "next/link";

// Mock search results - in a real app, this would come from an API or database
const mockResults = [
  {
    id: "form-1",
    title: "Advanced Form Example",
    description: "Learn how to use React Hook Form with Zod validation",
    category: "Forms",
    url: "/form",
  },
  {
    id: "upload-1",
    title: "File Upload Component",
    description: "Upload files to Vercel Blob Storage with progress tracking",
    category: "Upload",
    url: "/upload",
  },
  {
    id: "email-1",
    title: "Email Integration",
    description: "Send emails using EmailJS with templates",
    category: "Email",
    url: "/email",
  },
  {
    id: "database-1",
    title: "Prisma Database Models",
    description: "Database schema and Prisma ORM usage",
    category: "Database",
    url: "/database",
  },
  {
    id: "dashboard-1",
    title: "Dashboard Overview",
    description: "Data visualization and management interface",
    category: "Dashboard",
    url: "/dashboard",
  },
  {
    id: "docs-1",
    title: "Documentation",
    description: "Comprehensive guide to using the template",
    category: "Docs",
    url: "/docs",
  },
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<typeof mockResults>([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (query) {
      setLoading(true);
      
      // Simulate API call with a timeout
      setTimeout(() => {
        const filteredResults = mockResults.filter(item => 
          item.title.toLowerCase().includes(query.toLowerCase()) || 
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filteredResults);
        setLoading(false);
      }, 500);
    } else {
      setResults([]);
    }
  }, [query]);
  
  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-2 mb-8">
          <h1 className="text-3xl font-bold tracking-tighter">Search Results</h1>
          <p className="text-muted-foreground">
            {query ? 
              `Showing results for "${query}"` : 
              "Enter a search query to find content"
            }
          </p>
          <div className="pt-4">
            <Search 
              placeholder="Search for content..." 
              className="w-full max-w-xl" 
            />
          </div>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center py-10">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : (
          <>
            {query && results.length === 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>No results found</CardTitle>
                  <CardDescription>
                    Try a different search term or browse our categories
                  </CardDescription>
                </CardHeader>
              </Card>
            ) : (
              <div className="grid gap-6 grid-cols-1">
                {results.map(result => (
                  <Card key={result.id} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>
                            <Link href={result.url} className="hover:underline">
                              {result.title}
                            </Link>
                          </CardTitle>
                          <CardDescription className="mt-1">
                            {result.description}
                          </CardDescription>
                        </div>
                        <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium">
                          {result.category}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <Link 
                          href={result.url}
                          className="text-sm text-primary hover:underline"
                        >
                          View details →
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
        
        {!query && (
          <div className="text-center py-10">
            <p className="text-muted-foreground">
              Search for forms, uploads, emails, and more
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
