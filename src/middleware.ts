import { type NextRequest, NextResponse } from 'next/server';

import { ACCESS_TOKEN } from './constants/token';
import LocalStorage from './utils/localStorage';

export function middleware(request: NextRequest) {
  if (!LocalStorage.getItem(ACCESS_TOKEN)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const url = request.nextUrl;

  if (url.pathname === '/developersHub' && !url.searchParams.get('type')) {
    url.searchParams.set('type', 'resume');

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/developersHub'],
};
