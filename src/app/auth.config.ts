import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import type { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/pages/login',
  },
  callbacks: {
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // This function can be customized for redirect logic
      if (url.startsWith(baseUrl)) return url;
      return baseUrl; // Default redirect
    },
    async session({ session, token }) {
      // Customize the session object if needed
      return session; 
    },
    async jwt({ token }) {
      // Customize the JWT token if needed
      return token;
    },
    async signIn({ user, account }) {
      // Authorization logic
      const isLoggedIn = !!user;
      const isOnDashboard = account ? account.provider === 'dashboard' : false; // Check if account is defined
    
      if (isOnDashboard) {
        if (isLoggedIn) return true; // Allow access to the dashboard
        return false; // Deny access to the dashboard
      }
    
      return true; // Allow access to other pages
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
};

// Use the authOptions in your NextAuth function
export default NextAuth(authOptions);
