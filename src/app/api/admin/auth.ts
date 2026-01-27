import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";

/**
 * Validates admin authentication for API routes
 *
 * @param request - The incoming Request object
 * @returns NextResponse with 401 error if unauthorized, null if valid
 *
 * @example
 * ```typescript
 * export async function POST(request: Request) {
 *   const unauthorized = validateAdmin(request);
 *   if (unauthorized) return unauthorized;
 *
 *   // Proceed with authenticated logic
 * }
 * ```
 */
export function validateAdmin(request: Request): NextResponse | null {
  const authHeader = request.headers.get("Authorization");

  // Check for Bearer token pattern
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // Extract token from "Bearer <token>"
  const token = authHeader.substring(7);

  // Validate against environment variable
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // Use timing-safe comparison to prevent timing attacks
  try {
    const tokenBuffer = Buffer.from(token);
    const passwordBuffer = Buffer.from(adminPassword);

    // If lengths differ, compare against dummy buffer to avoid length leakage
    if (tokenBuffer.length !== passwordBuffer.length) {
      const dummyBuffer = Buffer.alloc(passwordBuffer.length);
      timingSafeEqual(passwordBuffer, dummyBuffer);
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!timingSafeEqual(tokenBuffer, passwordBuffer)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
  } catch {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // Authentication successful
  return null;
}
