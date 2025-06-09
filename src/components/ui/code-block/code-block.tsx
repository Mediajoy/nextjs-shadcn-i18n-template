"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  language = "typescript",
  className,
  showLineNumbers = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  const codeLines = code.trim().split("\n");

  return (
    <div className={cn("relative group rounded-md overflow-hidden", className)}>
      <div className="flex items-center justify-between bg-secondary text-secondary-foreground px-4 py-2">
        <div className="text-xs font-medium">{language}</div>
        <button
          onClick={copyToClipboard}
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>
      <pre className="bg-muted p-4 overflow-x-auto text-sm">
        <code>
          {showLineNumbers ? (
            <table className="border-collapse">
              <tbody>
                {codeLines.map((line, i) => (
                  <tr key={i} className="leading-relaxed">
                    <td className="pr-4 text-muted-foreground text-right select-none">
                      {i + 1}
                    </td>
                    <td className="whitespace-pre">{line}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="whitespace-pre">{code}</div>
          )}
        </code>
      </pre>
    </div>
  );
}
