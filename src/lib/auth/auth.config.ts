/**
 * Edge-compatible NextAuth.js v5 configuration
 * @fileoverview Base auth configuration without Prisma adapter for Edge runtime
 */
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import type { NextAuthConfig } from 'next-auth';

/**
 * Base auth configuration for Edge runtime (middleware).
 * This config CANNOT use the PrismaAdapter because Prisma
 * is not compatible with Edge runtime.
 */
export const authConfig: NextAuthConfig = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      // Note: authorize is only called on the server, not in Edge middleware
      // so we can return null here. The actual authorization happens in auth.ts
      async authorize() {
        return null;
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;

      // Public routes that don't require auth
      const publicRoutes = ['/', '/login', '/register', '/api/auth'];
      const isPublicRoute = publicRoutes.some(
        (route) => pathname === route || pathname.startsWith(`${route}/`)
      );

      if (isPublicRoute) {
        return true;
      }

      return isLoggedIn;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

export const { auth, signIn, signOut, handlers } = NextAuth(authConfig);
