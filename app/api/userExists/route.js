import { NextResponse } from "next/server"
import { User } from "@/models/user"
import connectMongoDB from "@/lib/mongoose"

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