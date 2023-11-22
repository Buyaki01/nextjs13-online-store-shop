import { NextResponse } from "next/server"
import connectMongoDB from "@/lib/mongoose"
import User from "@/models/user"

export async function POST(request) {
  try {
    const { email } = await request.json()

    await connectMongoDB()

    const user = await User.findOne({ email }).select("_id")

    return NextResponse.json({ user })
  } catch (error) {
    console.log(error)
  }
}