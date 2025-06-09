import * as z from "zod";

/**
 * Common validation schemas for forms
 * These can be composed and extended for specific form needs
 */

// Email validation with custom error message
export const emailSchema = z
  .string()
  .min(1, { message: "Email is required" })
  .email({ message: "Invalid email address" });

// Password validation with strength requirements
export const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .refine(
    (password) => /[A-Z]/.test(password),
    { message: "Password must contain at least one uppercase letter" }
  )
  .refine(
    (password) => /[a-z]/.test(password),
    { message: "Password must contain at least one lowercase letter" }
  )
  .refine(
    (password) => /[0-9]/.test(password),
    { message: "Password must contain at least one number" }
  )
  .refine(
    (password) => /[^A-Za-z0-9]/.test(password),
    { message: "Password must contain at least one special character" }
  );

// Name validation
export const nameSchema = z
  .string()
  .min(2, { message: "Name must be at least 2 characters" })
  .max(50, { message: "Name cannot exceed 50 characters" })
  .refine(
    (name) => /^[a-zA-Z\s'-]+$/.test(name),
    { message: "Name contains invalid characters" }
  );

// Phone number validation for international format
export const phoneSchema = z
  .string()
  .min(1, { message: "Phone number is required" })
  .refine(
    (phone) => /^\+?[1-9]\d{1,14}$/.test(phone.replace(/\s+/g, "")),
    { message: "Invalid phone number format" }
  );

// URL validation
export const urlSchema = z
  .string()
  .url({ message: "Invalid URL" })
  .optional()
  .or(z.literal(""));

// Date validation for minimum age (e.g., 18 years)
export const dateOfBirthSchema = z
  .date({
    required_error: "Date of birth is required",
    invalid_type_error: "Invalid date format",
  })
  .refine(
    (date) => {
      const today = new Date();
      const minimumAge = 18;
      const birthDate = new Date(date);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1 >= minimumAge;
      }
      
      return age >= minimumAge;
    },
    { message: "You must be at least 18 years old" }
  );

// File validation for size and type
export const fileSchema = (
  maxSizeMB = 5,
  allowedTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"]
) =>
  z
    .instanceof(File)
    .refine(
      (file) => file.size <= maxSizeMB * 1024 * 1024,
      { message: `File must be smaller than ${maxSizeMB}MB` }
    )
    .refine(
      (file) => allowedTypes.includes(file.type),
      { message: `File must be one of the following types: ${allowedTypes.join(", ")}` }
    );

// Example schemas for common forms

// User profile form schema
export const userProfileSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema.optional().or(z.literal("")),
  bio: z.string().max(500, { message: "Bio cannot exceed 500 characters" }).optional(),
  website: urlSchema,
  dateOfBirth: dateOfBirthSchema.optional(),
});

// Login form schema
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, { message: "Password is required" }),
  rememberMe: z.boolean().default(false),
});

// Registration form schema
export const registrationSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string().min(1, { message: "Confirm your password" }),
  agreeToTerms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms and conditions" }),
  }),
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }
);

// Contact form schema
export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  subject: z.string().min(1, { message: "Subject is required" }).max(100),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

// Newsletter subscription schema
export const newsletterSchema = z.object({
  email: emailSchema,
  topics: z.array(z.string()).optional(),
  frequency: z.enum(["daily", "weekly", "monthly"]),
});

// Address form schema
export const addressSchema = z.object({
  addressLine1: z.string().min(1, { message: "Address is required" }),
  addressLine2: z.string().optional(),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  postalCode: z.string().min(1, { message: "Postal code is required" }),
  country: z.string().min(1, { message: "Country is required" }),
});

// Export all schemas for easy importing
export const formSchemas = {
  email: emailSchema,
  password: passwordSchema,
  name: nameSchema,
  phone: phoneSchema,
  url: urlSchema,
  dateOfBirth: dateOfBirthSchema,
  file: fileSchema,
  userProfile: userProfileSchema,
  login: loginSchema,
  registration: registrationSchema,
  contact: contactFormSchema,
  newsletter: newsletterSchema,
  address: addressSchema,
};

// Export types based on the schemas
export type UserProfileFormValues = z.infer<typeof userProfileSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegistrationFormValues = z.infer<typeof registrationSchema>;
export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type NewsletterFormValues = z.infer<typeof newsletterSchema>;
export type AddressFormValues = z.infer<typeof addressSchema>;
