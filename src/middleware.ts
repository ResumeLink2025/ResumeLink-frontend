import { type NextRequest,NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  if (url.pathname === '/developersHub' && !url.searchParams.get('type')) {
    url.searchParams.set('type', 'resume');

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
