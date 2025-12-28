import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale, getLocaleFromPathname } from './src/lib/i18n';

function hasLocale(pathname: string): boolean {
  return getLocaleFromPathname(pathname) !== null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    /\.(.*)$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  if (!hasLocale(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};


