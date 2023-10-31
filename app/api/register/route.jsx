import { NextResponse } from "next/server"
import connectMongoDB from "../../../lib/mongoose"
import { User } from "@/models/user"
import bcrypt from "bcryptjs"

export async function POST(request) {
  try {
    const { name, email, password } = await request.json()
    
    const hashedPassword = await bcrypt.hash(password, 10)

    await connectMongoDB()

    await User.create({ name, email, password: hashedPassword })

    return NextResponse.json({ message: "User registered Successfully" }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: "An error occurred while registering the user"}, { status: 500 })
  }
}