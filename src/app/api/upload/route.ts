import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { fileUploadSchema } from "@/lib/validations";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    // Handle form data with file
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    
    // Optional: Add additional validation here
    // E.g., file type, size validation
    const maxSize = 5 * 1024 * 1024; // 5 MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 });
    }
    
    // Generate a filename that includes timestamp and original filename
    // to avoid collisions
    const timestamp = Date.now();
    const originalFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `${timestamp}-${originalFilename}`;
    
    // Upload file to Vercel Blob Storage
    const blob = await put(filename, file, {
      access: 'public',
      addRandomSuffix: true, // Adds a random suffix to ensure uniqueness
    });
    
    // Return success with the file URL
    return NextResponse.json({
      url: blob.url,
      success: true,
    });
    
  } catch (error: any) {
    console.error("File upload error:", error);
    
    // Handle different types of errors
    if (error.name === "PayloadTooLargeError") {
      return NextResponse.json(
        { error: "File too large" },
        { status: 413 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}

// GET method for pre-signed URL (optional implementation)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const filename = searchParams.get("filename");
  
  if (!filename) {
    return NextResponse.json({ error: "Filename required" }, { status: 400 });
  }
  
  try {
    // This is a placeholder. In a real implementation, you might generate
    // pre-signed URLs for direct browser-to-storage uploads
    
    return NextResponse.json({
      uploadUrl: `/api/upload?filename=${encodeURIComponent(filename)}`,
      method: "POST",
    });
    
  } catch (error) {
    console.error("Error generating upload URL:", error);
    return NextResponse.json(
      { error: "Failed to generate upload URL" },
      { status: 500 }
    );
  }
}
