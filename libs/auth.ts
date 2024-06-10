import { AuthOptions, User } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import prisma from './prisma';

declare module 'next-auth' {
  interface Session {
    user: User & {
      id: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  adapter: PrismaAdapter(prisma) as any,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },

  debug: process.env.NODE_ENV !== 'development',
  pages: {
    signIn: '/auth/signin',
  },

  secret: process.env.NEXTAUTH_SECRET,
};
