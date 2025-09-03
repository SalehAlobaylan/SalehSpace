import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'ar'];
const defaultLocale = 'en';

function hasLocale(pathname: string): boolean {
  return locales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    /\.(.*)$/.test(pathname)
  ) {
    return;
  }

  if (!hasLocale(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  return;
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};


