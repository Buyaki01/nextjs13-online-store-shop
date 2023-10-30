import { NextResponse } from "next/server"
import connectMongoDB from "../../../lib/mongoose"
import { CredentialsProvider } from "next-auth/providers"

export async function POST(request) {
  const { email, password } = await request.json()
  
  await connectMongoDB()

  return NextResponse.json({ message: "Login Successful" }, { status: 201 })
}