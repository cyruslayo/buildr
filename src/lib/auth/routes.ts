/**
 * Route configuration for authentication
 * @fileoverview Defines public, protected, and auth-specific routes
 */

/**
 * Routes that don't require authentication
 */
export const publicRoutes: string[] = [
  '/',
  '/login',
  '/register',
];

/**
 * Routes that require authentication to access
 */
export const protectedRoutes: string[] = [
  '/dashboard',
  '/builder',
  '/projects',
];

/**
 * Routes used for authentication (login/register pages)
 * Users who are already logged in will be redirected away from these
 */
export const authRoutes: string[] = [
  '/login',
  '/register',
];

/**
 * The default redirect path after login
 */
export const DEFAULT_LOGIN_REDIRECT = '/dashboard';

/**
 * API auth route prefix - excluded from middleware
 */
export const API_AUTH_PREFIX = '/api/auth';
