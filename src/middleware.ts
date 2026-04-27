import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "./i18n/config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const localeAssetMatch = pathname.match(/^\/(th|en)\/blueprint-playbook(\/.*)?$/);
  if (localeAssetMatch) {
    const newUrl = request.nextUrl.clone();
    newUrl.pathname = `/blueprint-playbook${localeAssetMatch[2] || ""}`;
    return NextResponse.rewrite(newUrl);
  }

  // Skip static files, API routes, _next, and the English-only ebook
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/blueprint/read") ||
    pathname.startsWith("/blueprint-playbook") ||
    pathname.startsWith("/downloads/") ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|woff2?|ttf|css|js|map|html|pdf|txt|xml|json)$/)
  ) {
    return NextResponse.next();
  }

  // Check if pathname already has a valid locale prefix
  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameLocale) {
    return NextResponse.next();
  }

  // Redirect to default locale
  const newUrl = request.nextUrl.clone();
  newUrl.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
