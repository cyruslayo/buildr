import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  providers: [],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard")
      if (isOnDashboard) {
        if (isLoggedIn) return true
        return false // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        // Redirect logged-in users away from login/register pages
        if (nextUrl.pathname === "/login" || nextUrl.pathname === "/register") {
           return Response.redirect(new URL("/dashboard", nextUrl))
        }
      }
      return true
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      if (token.role && session.user) {
        // @ts-ignore
        session.user.role = token.role
      }
      return session
    },
    async jwt({ token }) {
      return token
    }
  },
} satisfies NextAuthConfig
