import { NextResponse } from "next/server"
import connectMongoDB from "../../../lib/mongoose"

export async function POST(request) {
  try {
    const { name, email, password } = await request.json()

    await connectMongoDB()

    return NextResponse.json({ message: "User registered Successfully" }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: "An error occurred while registering the user"}, { status: 500 })
  }
}