import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    // Delete the auth token cookie
    cookies().delete("authToken");
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

/**
 * Implementation Notes:
 * 
 * 1. Security considerations:
 *   - In a real application with multiple tokens or session data, make sure to clear all auth-related data
 *   - Consider implementing a token blacklist for stateful logout across devices
 *   - If using JWT, you might want to implement token invalidation strategies
 * 
 * 2. User experience:
 *   - The client should clear any local state after logout
 *   - Redirect the user to the login page or home page after logout
 */
