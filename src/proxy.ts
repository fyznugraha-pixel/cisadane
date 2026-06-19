import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname is missing a locale
  const pathnameHasLocale = ["/en", "/id"].some(
    (locale) => pathname.startsWith(`${locale}/`) || pathname === locale
  );

  if (pathnameHasLocale) return;

  // By default, let's redirect to 'id' or we can do basic language sniffing here
  // For simplicity, default to /en or /id
  const defaultLocale = "id";
  
  // Exclude static files, API routes, and Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/logo") ||
    pathname.includes(".")
  ) {
    return;
  }

  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
  ],
};
