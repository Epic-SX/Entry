import { NextRequest, NextResponse } from 'next/server';
import {
  ACESS_TOKEN,
  JP_LOCALE,
  LAST_VISITED_PATH,
  LOCALES,
} from '@/constants';
import createIntlMiddleware from 'next-intl/middleware';
import { private_routes } from './routes';

const intlMiddleware = createIntlMiddleware({
  locales: LOCALES,
  defaultLocale: JP_LOCALE,
  localePrefix: undefined,
});

/**
 * Middleware
 * @param {NextRequest} request
 * @returns {NextResponse}
 */

export default function middleware(request: NextRequest): NextResponse {
  const path = request.nextUrl.pathname;
  const response = intlMiddleware(request);
  const token = request.cookies.get(ACESS_TOKEN)?.value;

  if (path.includes('/auth/login')) {
    if (token) {
      const lastVisitedPath = request.cookies.get(LAST_VISITED_PATH)?.value;
      const redirectPath = lastVisitedPath || private_routes.default;
      return NextResponse.redirect(new URL(redirectPath, request.url));
    }
  }

  if (!path.includes('/auth')) {
    const fullPath = request.nextUrl.pathname + request.nextUrl.search;
    response.cookies.set(LAST_VISITED_PATH, fullPath);
  }
  return response;
}

export const config = {
  matcher: [
    '/',
    '/(en|jp)/:path*',
    /*
     * 次で始まるリクエスト パスを除くすべてのリクエスト パスと一致します。
     * - API (API ルート)
     * - _next/static (静的ファイル)
     * - _next/image (画像最適化ファイル)
     * - favicon.ico (ファビコンファイル)
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
