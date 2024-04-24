import { NextResponse } from 'next/server';

export function middleware(req:any) {
  const { pathname } = req.nextUrl;


  if (pathname === '/pages/login' || pathname === '/pages/signup') {
    return NextResponse.next();
  }

 
  const token = req.cookies.get('auth_token');
  if (!token) {
    return NextResponse.redirect(new URL('/pages/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api/).*)',
};
