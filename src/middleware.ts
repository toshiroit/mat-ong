// export { default } from "next-auth/middleware";
// export const config = {
//   matcher: ["/dashboard", "/dashboard/products", "/dashboard/products/create"],

import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

// };
// export default withAuth({
//   pages: {
//     verifyRequest: "/dashboard",
//     signIn: "/dashboard/login",
//   },
// });
// export const config = {
//   matcher: ["/dashboard/:path*"],
// };

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent
) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;
  if (req.nextUrl.pathname.startsWith("/dashboard/login") && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  const authMiddleware = await withAuth({
    pages: {
      verifyRequest: "/dashboard",
      signIn: `/dashboard/login`,
    },
  });

  // @ts-expect-error
  return authMiddleware(req, event);
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
