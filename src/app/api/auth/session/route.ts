import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

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

export async function GET(request: NextRequest) {
  try {
    // Get the auth token from cookies
    const authToken = cookies().get("authToken")?.value;
    
    // If no token exists, return unauthorized
    if (!authToken) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }
    
    // In a real app, you would verify the token (JWT validation, database lookup, etc.)
    // For this demo, we'll do a simple check
    const userId = authToken.replace("token-", "");
    
    // Find user by ID
    const user = MOCK_USERS.find(u => u.id === userId);
    
    if (!user) {
      // Clear the invalid cookie
      cookies().delete("authToken");
      
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }
    
    // Return user data without sensitive information
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json({
      authenticated: true,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Session check error:", error);
    
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
 *   - Use a proper authentication system like NextAuth.js or Auth.js
 *   - Implement token-based authentication with proper validation
 *   - Consider implementing refresh tokens for better security
 * 
 * 2. Security considerations:
 *   - The authToken cookie should be HTTP-only to prevent XSS attacks
 *   - In production, use HTTPS and secure cookies
 *   - Consider adding CSRF protection
 * 
 * 3. Performance optimization:
 *   - Cache user sessions to reduce database lookups
 *   - Implement token expiration and rotation
 */
