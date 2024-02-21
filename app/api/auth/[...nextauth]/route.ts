import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import PrismaDB from '@/libs/prismadb'
import {compare} from "bcrypt"
// @ts-ignore
export default NextAuth({
    providers: [
        // Provide Credentials
        CredentialsProvider({
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
                if ( !credentials?.email || !credentials?.password ) {
                    throw new Error('Email and password required')
                }

                // Try to find the user in DB
                const user = await PrismaDB.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                // If there is not a user or hashed password will throw an error
                if (!user || !user.hashedPassword) {
                    throw new Error("Email does not Exist")
                }
                // If there is a User
                    // Compare the Password
                const isCorrectPassword = await compare(credentials.password , user.hashedPassword)

                    // Check if the Password is correct
                if (!isCorrectPassword) {
                    throw new Error("Password is not correct !")
                }

                return user
            }
        })
    ],
    pages: {
        signIn: '/login',
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET
})