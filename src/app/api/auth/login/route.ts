import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import * as z from "zod";
import { loginSchema } from "@/lib/validations/form";

// Mock user database for demonstration
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
  {
    id: "3",
    email: "user@example.com",
    password: "Password123!",
    name: "Regular User",
    role: "viewer",
  },
];

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();

    // Validate the request body against the login schema
    const validatedFields = loginSchema.safeParse(body);
    
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
    
    const { email, password, rememberMe } = validatedFields.data;

    // Find the user with the provided email
    const user = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());

    // If no user is found or the password doesn't match, return a 401 Unauthorized response
    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // In a real application, you would use a proper authentication system like JWT or OAuth
    // This is just a simple example for demonstration
    
    // Set authentication cookie
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60, // 30 days or 24 hours
      path: "/",
    };
    
    cookies().set("authToken", `token-${user.id}`, cookieOptions);

    // Return user information (excluding password)
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Login error:", error);
    
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

/**
 * Implementation Notes:
 * 
 * 1. In a production environment:
 *   - Never store passwords in plain text (use bcrypt or similar)
 *   - Use a proper authentication system (NextAuth.js, Auth.js, etc.)
 *   - Store user data in a database, not in memory
 *   - Use HTTPS for all requests
 *   - Implement rate limiting to prevent brute force attacks
 * 
 * 2. Security considerations:
 *   - The response doesn't indicate whether the email or password was incorrect
 *     to prevent user enumeration attacks
 *   - Passwords should be hashed and salted
 *   - Consider implementing 2FA for additional security
 */
