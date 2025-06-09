"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, X } from "lucide-react";

interface SearchProps {
  placeholder?: string;
  route?: string;
  className?: string;
}

export function Search({ 
  placeholder = "Search...", 
  route = "/search", 
  className 
}: SearchProps) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`${route}?q=${encodeURIComponent(query)}`);
    }
  };
  
  return (
    <form
      onSubmit={handleSubmit}
      className={`relative flex w-full max-w-sm items-center ${className}`}
    >
      <Input
        type="search"
        placeholder={placeholder}
        className="pr-10"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-8 top-0 h-full px-3 py-2"
          onClick={() => setQuery("")}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear</span>
        </Button>
      )}
      <Button
        type="submit"
        size="icon"
        variant="ghost"
        className="absolute right-0 top-0 h-full px-3 py-2"
      >
        <SearchIcon className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  );
}
