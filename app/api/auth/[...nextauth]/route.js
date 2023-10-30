import NextAuth from "next-auth"
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from '../../../../lib/mongodb'
import axios from "axios"

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if(!credentials?.email || !credentials.password){
          throw new Error('Invalid email or password')
        }

        console.log(credentials)

        const res = await axios.post("/api/login", { credentials })
        const user = await res.json()
  
        // If no error and we have user data, return it
        if (res.ok && user) {
          return user
        }
        // Return null if user data could not be retrieved
        return null
      }
    })
  ],
  adapter: MongoDBAdapter(clientPromise),
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST, handler as PUT, handler as DELETE }
