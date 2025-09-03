import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Array of regex patterns of paths we want to protect
export const protectedPaths = [
  /\/shipping-address/,
  /\/payment-method/,
  /\/place-order/,
  /\/profile/,
  /\/user\/(.*)/,
  /\/order\/(.*)/,
  /\/admin/,
];

export async function middleware(req: NextRequest) {
  // Get pathname from the req URL obj
  const { pathname, protocol, host } = req.nextUrl;

  // Check if user is not authenticated nor authorized to access a protected path.
  if (
    !(await getToken({ req, secret: process.env.NEXTAUTH_SECRET })) &&
    protectedPaths.some((p) => p.test(pathname))
  ) {
    return NextResponse.redirect(`${protocol}//${host}/sign-in`);
  }

  if (!req.cookies.get("sessionCartId")) {
    // Check for session cart cookie
    const sessionCartId = crypto.randomUUID();

    // Clone the req headers
    const response = NextResponse.next({
      request: { headers: new Headers(req.headers) },
    });

    // Set newly generated SessioncartId in the response cookie.
    response.cookies.set("sessionCartId", sessionCartId);
    return response;
  }

  return NextResponse.next();
}
