/**
 * NextAuth Middleware
 * @fileoverview Protects dashboard routes and redirects unauthenticated users
 *
 * Implements AR3: Multi-tenant middleware for route protection
 */
import { auth } from '@/auth'

export default auth((req) => {
  // The authConfig.callbacks.authorized handles the logic:
  // - Redirects unauthenticated users from /dashboard to /login
  // - Redirects authenticated users from /login and /register to /dashboard
  // - Allows public routes to pass through
})

// Opt out of middleware for certain paths
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
