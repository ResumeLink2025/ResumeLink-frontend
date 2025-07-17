import { type NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;

  if (url.pathname === '/developersHub' && !url.searchParams.get('type') && !url.searchParams.get('sort')) {
    url.searchParams.set('type', 'resume');
    url.searchParams.set('sort', 'popular');

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/developersHub'],
};
