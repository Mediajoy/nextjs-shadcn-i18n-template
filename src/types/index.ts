// Form related types
export interface FormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  contactMethod: "email" | "phone" | "both";
  attachments?: File[];
}

export interface FormSubmission extends Omit<FormData, "attachments"> {
  id: string;
  fileUrls: string[];
  status: "new" | "in-progress" | "completed";
  createdAt: Date;
  updatedAt: Date;
}

// File upload related types
export interface FileUploadProps {
  onUploadComplete?: (urls: string[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
  allowedFileTypes?: string[];
}

export interface FileUploadResult {
  url: string;
  success: boolean;
  error?: string;
  fileName?: string;
  fileSize?: number;
}

// Email related types
export interface EmailParams {
  to_email?: string;
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
  reply_to?: string;
}

export interface AttachmentEmailParams extends EmailParams {
  attachment_urls?: string[];
}

export interface EmailResult {
  success: boolean;
  error?: any;
  result?: any;
}

// Database related types
export interface DatabaseConnectionResult {
  success: boolean;
  error?: any;
}

// API response types
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

// Notification types
export interface Notification {
  id: string;
  type: "success" | "error" | "info" | "warning";
  title: string;
  message: string;
  duration?: number;
}
