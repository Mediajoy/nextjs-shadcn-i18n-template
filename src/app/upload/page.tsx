"use client";

import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

export default function UploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  
  const handleUploadComplete = (urls: string[]) => {
    setUploadedFiles((prev) => [...prev, ...urls]);
  };
  
  return (
    <div className="container py-10 space-y-6">
      <div className="max-w-3xl mx-auto text-center space-y-2">
        <h1 className="text-3xl font-bold">File Upload Demo</h1>
        <p className="text-muted-foreground">
          Secure file uploads using Vercel Blob Storage
        </p>
      </div>
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Upload Files</CardTitle>
          <CardDescription>
            Drag and drop files or click to browse
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Upload Information</AlertTitle>
            <AlertDescription>
              Files are stored securely using Vercel Blob Storage.
              You can upload images, PDFs, and documents up to 5MB each.
            </AlertDescription>
          </Alert>
          
          <FileUpload 
            onUploadComplete={handleUploadComplete}
            maxFiles={5}
            maxSizeMB={5}
            allowedFileTypes={["image/*", "application/pdf", ".doc", ".docx", ".xls", ".xlsx"]}
          />
        </CardContent>
      </Card>
      
      {uploadedFiles.length > 0 && (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Uploaded Files</CardTitle>
            <CardDescription>
              List of all your uploaded files
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {uploadedFiles.map((url, index) => (
                <li key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded-md">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline truncate max-w-[80%]"
                  >
                    {url.split('/').pop()}
                  </a>
                  <span className="text-xs text-muted-foreground">
                    {new Date().toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
      
      <div className="max-w-2xl mx-auto mt-8 p-4 border rounded-lg bg-muted/30">
        <h2 className="text-lg font-medium mb-2">Implementation Details</h2>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Uses react-dropzone for drag-and-drop interface</li>
          <li>Integrates with Vercel Blob Storage for secure file hosting</li>
          <li>Supports multiple file uploads with progress tracking</li>
          <li>Includes file type and size validation</li>
          <li>Generates unique filenames to prevent collisions</li>
        </ul>
      </div>
    </div>
  );
}
