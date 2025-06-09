import { NextRequest, NextResponse } from "next/server";
import { formSchema } from "@/lib/validations";
import { prisma } from "@/lib/database";

interface Params {
  params: {
    id: string;
  };
}

// GET a specific form submission by ID
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json(
        { error: "Form ID is required" },
        { status: 400 }
      );
    }
    
    // Retrieve form from database
    const form = await prisma.formSubmission.findUnique({
      where: { id },
    });
    
    if (!form) {
      return NextResponse.json(
        { error: "Form not found" },
        { status: 404 }
      );
    }
    
    // Return the form data
    return NextResponse.json(form);
    
  } catch (error) {
    console.error("Error retrieving form:", error);
    return NextResponse.json(
      { error: "Failed to retrieve form" },
      { status: 500 }
    );
  }
}

// PATCH to update an existing form
export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const { id } = params;
    const body = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: "Form ID is required" },
        { status: 400 }
      );
    }
    
    // Check if form exists
    const existingForm = await prisma.formSubmission.findUnique({
      where: { id },
    });
    
    if (!existingForm) {
      return NextResponse.json(
        { error: "Form not found" },
        { status: 404 }
      );
    }
    
    // Update the form in database
    const updatedForm = await prisma.formSubmission.update({
      where: { id },
      data: {
        // Only allow updating certain fields
        name: body.name !== undefined ? body.name : undefined,
        email: body.email !== undefined ? body.email : undefined,
        phone: body.phone !== undefined ? body.phone : undefined,
        subject: body.subject !== undefined ? body.subject : undefined,
        message: body.message !== undefined ? body.message : undefined,
        status: body.status !== undefined ? body.status : undefined,
        fileUrls: body.fileUrls !== undefined ? body.fileUrls : undefined,
        updatedAt: new Date(),
      },
    });
    
    return NextResponse.json({
      success: true,
      message: "Form updated successfully",
      form: updatedForm,
    });
    
  } catch (error) {
    console.error("Error updating form:", error);
    return NextResponse.json(
      { error: "Failed to update form" },
      { status: 500 }
    );
  }
}

// DELETE a form submission
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json(
        { error: "Form ID is required" },
        { status: 400 }
      );
    }
    
    // Check if form exists
    const existingForm = await prisma.formSubmission.findUnique({
      where: { id },
    });
    
    if (!existingForm) {
      return NextResponse.json(
        { error: "Form not found" },
        { status: 404 }
      );
    }
    
    // Delete the form
    await prisma.formSubmission.delete({
      where: { id },
    });
    
    return NextResponse.json({
      success: true,
      message: "Form deleted successfully",
    });
    
  } catch (error) {
    console.error("Error deleting form:", error);
    return NextResponse.json(
      { error: "Failed to delete form" },
      { status: 500 }
    );
  }
}
