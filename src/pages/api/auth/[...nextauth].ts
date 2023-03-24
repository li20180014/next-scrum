import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { prisma } from '../../../server/db'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
        session.user.role = user.role
      }
      return session
    },
  },
}

export default NextAuth(authOptions)
