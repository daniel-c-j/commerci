import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // Check for session cart cookie
  if (!request.cookies.get("sessionCartId")) {
    const sessionCartId = crypto.randomUUID();

    // Clone the req headers
    const response = NextResponse.next({
      request: {
        headers: new Headers(request.headers),
      },
    });

    // Set newly generated SessioncartId in the response cookie.
    response.cookies.set("sessionCartId", sessionCartId);
    return response;
  }

  return NextResponse.next();
}
