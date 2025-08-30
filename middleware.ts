// // src/middleware.ts
// import { NextRequest, NextResponse } from "next/server";
// import { auth } from "./auth";

// export default async function middleware(request: NextRequest) {
//   console.log("123456");

//   const requestHeaders = new Headers(request.headers);
//   requestHeaders.set("x-pathname", request.nextUrl.pathname);

//   const query = request.nextUrl.searchParams;
//   const redirectUrl = query.get("redirect_url");

//   requestHeaders.set("x-search-params", request.nextUrl.search);

//   if (redirectUrl) {
//     requestHeaders.set("x-redirect-url", redirectUrl);
//   }

//   return NextResponse.next({
//     request: {
//       headers: requestHeaders,
//     },
//   });
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };

export { auth as middleware } from "@/auth";
