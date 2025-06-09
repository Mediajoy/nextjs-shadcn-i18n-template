import * as z from "zod";

// Base form field schemas that can be reused and composed
export const nameSchema = z.string().min(2, "Name must be at least 2 characters").max(50);
export const emailSchema = z.string().email("Please enter a valid email address");
export const phoneSchema = z
  .string()
  .regex(/^[0-9+\-\s()]*$/, "Please enter a valid phone number")
  .min(10, "Phone number must be at least 10 digits")
  .optional()
  .or(z.literal(""));
export const messageSchema = z.string().min(10, "Message must be at least 10 characters").max(1000);
export const fileSchema = z.instanceof(File).optional();

// Example of a multi-file schema with validation
export const multiFileSchema = z
  .array(z.instanceof(File))
  .max(5, "You can only upload up to 5 files")
  .optional();

// Form submission schema with conditional fields
export const formSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  subject: z.string().min(2, "Subject must be at least 2 characters").max(100),
  message: messageSchema,
  attachments: multiFileSchema,
  // Example of conditional validation
  contactMethod: z.enum(["email", "phone", "both"]),
  // If contactMethod is "phone" or "both", phone becomes required
}).refine(
  (data) => {
    if (data.contactMethod === "phone" || data.contactMethod === "both") {
      return data.phone && data.phone.length >= 10;
    }
    return true;
  },
  {
    message: "Phone number is required for your selected contact method",
    path: ["phone"],
  }
);

// Type for the form data based on zod schema
export type FormData = z.infer<typeof formSchema>;

// Simpler form schema for subscriptions
export const subscriptionSchema = z.object({
  email: emailSchema,
  name: nameSchema.optional(),
  preferences: z.array(z.string()).optional(),
  optIn: z.boolean().refine((val) => val === true, {
    message: "You must opt-in to receive communications",
  }),
});

// File upload schema
export const fileUploadSchema = z.object({
  files: z.array(z.instanceof(File)).min(1, "Please select at least one file to upload"),
  description: z.string().optional(),
});
