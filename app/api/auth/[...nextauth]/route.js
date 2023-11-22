import NextAuth from "next-auth"
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"
import connectMongoDB from "@/lib/mongoose"
import { User } from "@/models/user"
import bcrypt from 'bcryptjs'

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      profile(profile) {
        let userRole = "user"
        if (profile && profile.email ==="rittahbuyaki@gmail.com") {
          userRole = "admin"
        }

        return {
          ...profile,
          id: profile?.sub,
          role: userRole,
        }
      },
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},

      async authorize(credentials, req) {
        const { email, password } = credentials

        try {
          await connectMongoDB()
          const user = await User.findOne({ email })
          
          if (!user) {
            return null
          }

          const passwordMatch = await bcrypt.compare(password, user.password)

          if (!passwordMatch) {
            return null
          }

          return user

        } catch (error) {
          console.log("Error: ", error)
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      // console.log("JWT Callback - Token:", token)
      // console.log("JWT Callback - User:", user)
      return { ...token, ...user }
    },
    async session({ session, token }) {
      // console.log("Session Callback - Token:", token)
      // console.log("Session Callback - Session:", session)
    
      if (session?.user) session.user.role = token.role
      return session
    }
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST, handler as PUT, handler as DELETE }
