import NextAuth from "next-auth"
import PrismaDB from '@/libs/prismadb'
import { compare } from "bcrypt"
import Credentials from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";


const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || ''
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    }),
    // Provide Credentials
    Credentials({
      id: 'credentials',
      name: 'Credentials',

      // Set the Credentials
      credentials: {
        email: {
          label: 'Email',
          type: 'text'
        },
        password: {
          label: 'Password',
          type: 'password'
        },
      },

      // Make out authorize function
      async authorize(credentials) {
        console.log('Stat Authorizing')
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password required')
        }
        console.log(credentials)
        // Try to find the user in DB
        const user = await PrismaDB.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        console.log(user)

        // If there is not a user or hashed password will throw an error
        if (!user || !user.hashedPassword) {
          throw new Error("Email does not Exist")
        }
        // If there is a User
        // Compare the Password
        const isCorrectPassword = await compare(credentials.password, user.hashedPassword)

        // Check if the Password is correct
        if (!isCorrectPassword) {
          throw new Error("Password is not correct !")
        }

        return user
      }
    })
  ],
  pages: {
    signIn: '/auth',
  },
  debug: process.env.NODE_ENV === 'development',
  adapter: PrismaAdapter(PrismaDB),
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET
})

export {
  handler as GET,
  handler as POST,
}