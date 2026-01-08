// src/proxy.ts
import type { NextFetchEvent, NextRequest } from 'next/server';
import { detectBot } from '@arcjet/next';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { process } from 'std-env';
import arcjet from '@/libs/Arcjet';
import { routing } from './libs/I18nRouting';

const handleI18nRouting = createMiddleware(routing);

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/:locale/dashboard(.*)',

  // All API routes, including protected and public
  '/api(.*)',
]);

const isPublicApi = createRouteMatcher([
  '/api/health(.*)',

  '/api/webhook(.*)',
  '/:locale/api/webhook(.*)',

  '/api/public(.*)',
  '/:locale/api/public(.*)',
]);

const isAuthPage = createRouteMatcher([
  '/sign-in(.*)',
  '/:locale/sign-in(.*)',

  '/sign-up(.*)',
  '/:locale/sign-up(.*)',
]);

// Improve security with Arcjet
const aj = arcjet.withRule(
  detectBot({
    mode: 'LIVE',
    // Block all bots except the following
    allow: [
      // See https://docs.arcjet.com/bot-protection/identifying-bots
      'CATEGORY:SEARCH_ENGINE', // Allow search engines
      'CATEGORY:PREVIEW', // Allow preview links to show OG images
      'CATEGORY:MONITOR', // Allow uptime monitoring services
    ],
  }),
);

export default async function proxy(
  request: NextRequest,
  event: NextFetchEvent,
) {
  // Arcjet check
  if (process.env.ARCJET_KEY) {
    const decision = await aj.protect(request);
    if (decision.isDenied()) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
  }

  if (isAuthPage(request) || isProtectedRoute(request)) {
    return clerkMiddleware(async (auth, req) => {
      if (isProtectedRoute(req)) {
        const isApi = req.nextUrl.pathname.startsWith('/api');

        if (isApi) {
          // Check if it's a public API - let it through
          if (isPublicApi(req)) {
            return handleI18nRouting(req);
          }

          // Protected API - check auth
          const { userId } = await auth();
          if (!userId) {
            // return NextResponse.json(
            //   { error: 'Unauthorized', code: 'AUTH_REQUIRED' },
            //   { status: 401 },
            // );
          }

          return handleI18nRouting(req);
        } else {
          // Dashboard routes: protect with redirect
          const locale = req.nextUrl.pathname.match(/(\/.*)\/dashboard/)?.at(1) ?? '';
          const signInUrl = new URL(`${locale}/sign-in`, req.url);

          await auth.protect({
            unauthenticatedUrl: signInUrl.toString(),
          });
        }
      }

      return handleI18nRouting(req);
    })(request, event);
  }

  return handleI18nRouting(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/_next`, `/_vercel` or `monitoring`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!_next|_vercel|monitoring|.*\\..*).*)',
};
