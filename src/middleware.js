import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

const supportedLanguages = ['en', 'es']

export default async function middleware(request) {
  // 1. Handle maintenance mode first
  if (process.env.NEXT_PUBLIC_MAINTENANCE === "1") {
    return handleMaintenanceMode(request);
  }
  
  // 2. Process your custom rewrites and redirects
  const customResponse = handleCustomRoutes(request);
  if (customResponse) return customResponse;
  
  // 3. Let next-intl handle internationalization
  const acceptLanguage = request.headers.get('accept-language')+'';
  const matches = acceptLanguage.matchAll(/(([a-z]{2}\-?([A-Z]{2})?)[\,]?)+[\;]([q]\=([0-1]{1}[\.]?[0-9]?))/g)
  const preferedLangs = Array.from(matches, x => ({code:x[0].split(';')[0], weight: x[0].split(';')[1].replace('q=', '')}));
  const ordered = preferedLangs.sort((a, b) => (parseInt(b.weight) || 0) - (parseInt(a.weight) || 0))
  
  const detectedLocale = ordered.find(lang => 
    supportedLanguages.includes(lang.code)
  )?.code || 'en';

  const { headers, ip } = request;
  const usrIp = headers.get('cf-connecting-ip') || headers.get('x-real-ip') || headers.get('x-forwarded-for') || ip;
  console.log('IP:', usrIp);
  
  const intlMiddleware = createMiddleware({
    locales: supportedLanguages,
    defaultLocale: detectedLocale || 'en',//detectedLocale,
    localePrefix: 'never'
  });
  let req = intlMiddleware(request);
  req.headers.set('x-user-ip', usrIp || '');
  req.cookies.set('x-user-ip', usrIp.toString() || '', { path: '/' });
  return req;
}

function handleMaintenanceMode(request) {
  const { pathname } = request.nextUrl;
  const { headers, ip } = request;
  const usrIp = headers.get('cf-connecting-ip') || headers.get('x-real-ip') || headers.get('x-forwarded-for') || ip;
  console.log('IP:', usrIp);
  
  
  const bypassPaths = [
    '/_next', '/logos', '/Images', '/Trailers', '/Testimonials', '/pdfs',
    '/merchandise', 'favicon.ico', 'og-banner.jpg', 'tw-banner.jpg'
  ];

  if (bypassPaths.some(path => pathname.includes(path))) {
    const bypassResponse = NextResponse.next();
    bypassResponse.headers.set('x-user-ip', usrIp);
    bypassResponse.cookies.set('x-user-ip', usrIp.toString(), { path: '/' });
    return bypassResponse;
  }
  
  let response = NextResponse.rewrite(new URL('/coming-soon', request.url));
  response.headers.set('x-user-ip', usrIp);
  response.cookies.set('x-user-ip', usrIp.toString(), { path: '/' });
  return response;
}

function handleCustomRoutes(request) {
  const { pathname } = request.nextUrl;
  const { headers, ip } = request;
  const usrIp = headers.get('cf-connecting-ip') || headers.get('x-real-ip') || headers.get('x-forwarded-for') || ip;
  // Rewrites
  // if (pathname === '/findadealer') {
  //   let rewriteResponse = NextResponse.redirect(new URL('/find-a-dealer', request.url));
  //   console.log('entra a findadealer', JSON.stringify(rewriteResponse));
  //   rewriteResponse.headers.set('x-user-ip', usrIp);
  //   rewriteResponse.cookies.set('x-user-ip', usrIp.toString(), { path: '/' });
  //   return rewriteResponse;
  // }
  
  // Hidden routes - Redirects to not found page
  if (
    pathname === '/findadealer' || pathname === '/find-a-dealer' ||
    pathname.includes('/merchandise') || pathname.includes('/financing') ||
    pathname === '/warranty-docs' || pathname === '/owners-manual'
  ) {
    let rewriteResponse = NextResponse.redirect(new URL('/not-found', request.url));
    // console.log('entra a findadealer', JSON.stringify(rewriteResponse));
    rewriteResponse.headers.set('x-user-ip', usrIp);
    rewriteResponse.cookies.set('x-user-ip', usrIp.toString(), { path: '/' });
    return rewriteResponse;
  }

  // Redirects
  if (pathname === '/blog/editor') {
    let redirectResponse = NextResponse.redirect(new URL('/blog', request.url), 307);
    redirectResponse.headers.set('x-user-ip', usrIp);
    redirectResponse.cookies.set('x-user-ip', usrIp.toString(), { path: '/' });
    return redirectResponse;
  }

  // Path pattern rewrites
  if (pathname.includes('/coming-soon')) {
    let rewriteResponse = NextResponse.redirect(new URL('/coming-soon', request.url));
    rewriteResponse.headers.set('x-user-ip', usrIp);
    rewriteResponse.cookies.set('x-user-ip', usrIp.toString(), { path: '/' });
    return rewriteResponse;
  }

  return null;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|Downloadable-Resources|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf|html|js)$).*)'
  ]
};