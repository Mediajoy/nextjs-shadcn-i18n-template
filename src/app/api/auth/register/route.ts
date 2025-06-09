import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";
import { registrationSchema } from "@/lib/validations/form";

// In a real application, you'd use a database here
// This is a mock implementation for demonstration purposes
const MOCK_USERS = [
  {
    id: "1",
    email: "admin@example.com",
    password: "Password123!", // In a real app, this would be hashed
    name: "Admin User",
    role: "admin",
  },
  {
    id: "2",
    email: "editor@example.com",
    password: "Password123!",
    name: "Editor User",
    role: "editor",
  },
];

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();

    // Validate the request body against the registration schema
    const validatedFields = registrationSchema.safeParse(body);
    
    // If validation fails, return a 400 Bad Request response
    if (!validatedFields.success) {
      return NextResponse.json(
        {
          error: "Invalid request",
          details: validatedFields.error.format(),
        },
        { status: 400 }
      );
    }
    
    const { name, email, password } = validatedFields.data;

    // Check if user with this email already exists
    // In a real application, this would be a database query
    const userExists = MOCK_USERS.some(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

    if (userExists) {
      return NextResponse.json(
        { error: "A user with this email already exists" },
        { status: 409 } // Conflict
      );
    }

    // In a real application, you would:
    // 1. Hash the password
    // 2. Store the user in a database
    // 3. Generate a verification token
    // 4. Send a verification email

    // Simulate user creation
    const newUser = {
      id: `${MOCK_USERS.length + 1}`,
      name,
      email,
      password, // Would be hashed in a real app
      role: "viewer", // Default role for new users
    };

    // Add the new user to our mock database
    // In a real app, this would be a database insert
    MOCK_USERS.push(newUser);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Registration successful",
      },
      { status: 201 } // Created
    );
  } catch (error) {
    console.error("Registration error:", error);
    
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

/**
 * Implementation Notes:
 * 
 * 1. Server-side validation:
 *   - We use the same Zod schema as on the client-side for consistent validation
 *   - This prevents malformed data from being processed even if client validation is bypassed
 * 
 * 2. Security best practices:
 *   - In a real application, passwords should be hashed using bcrypt or Argon2
 *   - Email verification should be implemented
 *   - Rate limiting should be applied to prevent brute force attempts
 * 
 * 3. Error handling:
 *   - Specific error codes are used for different scenarios:
 *     - 400: Bad Request (invalid input)
 *     - 409: Conflict (user already exists)
 *     - 500: Internal Server Error (unexpected errors)
 *   - Validation errors return detailed information to help the client
 */
