import { NextRequest, NextResponse } from "next/server";
import { formSchema } from "@/lib/validations";
import { sendEmailWithAttachments } from "@/lib/email";
import { prisma } from "@/lib/database";

export async function POST(request: NextRequest) {
  try {
    // Parse and validate the request body
    const body = await request.json();
    
    // Validate with Zod schema
    const validationResult = formSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: "Invalid form data", 
          details: validationResult.error.errors 
        }, 
        { status: 400 }
      );
    }
    
    const formData = validationResult.data;
    
    // Optional: Store in database if connected
    let savedForm;
    try {
      savedForm = await prisma.formSubmission.create({
        data: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          subject: formData.subject,
          message: formData.message,
          contactMethod: formData.contactMethod,
          fileUrls: body.fileUrls || [],
        },
      });
    } catch (dbError) {
      console.error("Database save error:", dbError);
      // Continue even if database storage fails
    }
    
    // Send email notification
    const emailResult = await sendEmailWithAttachments({
      from_name: formData.name,
      from_email: formData.email,
      subject: `Form Submission: ${formData.subject}`,
      message: formData.message,
      reply_to: formData.email,
      attachment_urls: body.fileUrls || [],
    });

    if (!emailResult.success) {
      console.error("Email sending failed:", emailResult.error);
    }
    
    // Return success response with the saved form data
    return NextResponse.json({ 
      success: true, 
      message: "Form submitted successfully",
      formId: savedForm?.id || "form-id-not-available",
    }, { status: 201 });
    
  } catch (error) {
    console.error("Form submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  }
}

// GET method for pre-filling forms (optional)
export async function GET(request: NextRequest) {
  // Demo implementation to return form templates
  return NextResponse.json({
    templates: [
      { 
        id: "contact-form", 
        name: "Contact Form", 
        fields: ["name", "email", "subject", "message"] 
      },
      { 
        id: "support-request", 
        name: "Support Request", 
        fields: ["name", "email", "phone", "subject", "message"] 
      }
    ]
  });
}
