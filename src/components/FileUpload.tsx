"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Trash2, Upload, File as FileIcon, Check } from "lucide-react";

interface FileUploadProps {
  onUploadComplete?: (urls: string[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
  allowedFileTypes?: string[];
}

export default function FileUpload({
  onUploadComplete,
  maxFiles = 5,
  maxSizeMB = 5,
  allowedFileTypes = ["image/*", "application/pdf", ".doc", ".docx", ".xls", ".xlsx"],
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  // Calculate max file size in bytes
  const maxSize = maxSizeMB * 1024 * 1024;

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length + files.length > maxFiles) {
        toast.error(`You can only upload a maximum of ${maxFiles} files`);
        return;
      }

      const filesToAdd = acceptedFiles.filter((file) => {
        if (file.size > maxSize) {
          toast.error(`${file.name} is too large (max ${maxSizeMB}MB)`);
          return false;
        }
        return true;
      });

      setFiles((prev) => [...prev, ...filesToAdd]);
    },
    [files, maxFiles, maxSize, maxSizeMB]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles,
    maxSize,
    accept: allowedFileTypes.reduce((acc, type) => {
      acc[type] = [];
      return acc;
    }, {} as Record<string, string[]>),
  });

  const removeFile = (indexToRemove: number) => {
    setFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const uploadFiles = async () => {
    if (files.length === 0) {
      toast.error("Please select at least one file to upload");
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      const uploadedUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Create form data for upload
        const formData = new FormData();
        formData.append("file", file);

        // Upload to API route
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Failed to upload ${file.name}`);
        }

        const data = await response.json();
        uploadedUrls.push(data.url);
        
        // Update progress
        setProgress(Math.round(((i + 1) / files.length) * 100));
      }

      setUploadedUrls(uploadedUrls);
      
      if (onUploadComplete) {
        onUploadComplete(uploadedUrls);
      }

      toast.success(`Successfully uploaded ${files.length} file${files.length !== 1 ? "s" : ""}`);
      setFiles([]);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("An error occurred during upload");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="w-full space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
          isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/30"
        } hover:border-primary/50 cursor-pointer text-center`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-2">
          <Upload className="h-10 w-10 text-muted-foreground" />
          <p className="text-lg font-medium">
            Drag & drop files here, or click to select files
          </p>
          <p className="text-sm text-muted-foreground">
            Upload up to {maxFiles} files (max {maxSizeMB}MB each)
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Selected Files ({files.length}/{maxFiles})</p>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-2 border rounded-md"
              >
                <div className="flex items-center space-x-2">
                  <FileIcon className="h-5 w-5 text-blue-500" />
                  <span className="text-sm truncate max-w-[250px]">{file.name}</span>
                  <span className="text-xs text-muted-foreground">
                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(index)}
                  disabled={uploading}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {uploading && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">Uploading...</span>
            <span className="text-sm">{progress}%</span>
          </div>
          <Progress value={progress} />
        </div>
      )}

      {files.length > 0 && (
        <Button
          onClick={uploadFiles}
          disabled={uploading || files.length === 0}
          className="w-full"
        >
          {uploading ? "Uploading..." : `Upload ${files.length} file${files.length !== 1 ? "s" : ""}`}
        </Button>
      )}

      {uploadedUrls.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            Upload Complete
          </p>
          <ul className="space-y-1">
            {uploadedUrls.map((url, index) => (
              <li key={index} className="text-xs truncate text-blue-600">
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
