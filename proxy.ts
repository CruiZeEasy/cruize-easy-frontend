import { NextResponse, NextRequest } from "next/server";
import { PATHS } from "@/utils/path";

export function proxy(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  const accessToken = request.cookies.get("access_token")?.value;

  // Define protected routes
  const protectedRoutes = [
    PATHS.ONBOARDING.COMPLETE_PROFILE,
    PATHS.ONBOARDING.ALLOW_LOCATION,
    PATHS.ONBOARDING.ALLOW_NOTIFICATIONS,
    // add more like "/dashboard", "/profile", etc. if needed
  ];

  // Redirect unauthenticated users trying to access protected pages
  if (
    protectedRoutes.some((route) => pathname.startsWith(route)) &&
    !accessToken
  ) {
    return NextResponse.redirect(new URL(PATHS.AUTH.LOGIN, origin));
  }

  // Allow all other requests
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/onboarding/:path*",
    // add other patterns as needed
  ],
};
