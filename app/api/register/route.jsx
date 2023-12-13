import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import connectMongoDB from "@/lib/mongoose"
import User from "@/models/user"

export const POST = async (request) => {
  try {
    const { name, email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required fields" },
        { status: 400 }
      )
    }
    
    const hashedPassword = await bcrypt.hash(password, 10)

    await connectMongoDB()

    const user = await User.create({ name, email, password: hashedPassword })

    return NextResponse.json({ message: "User registered Successfully", user }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: "An error occurred while registering the user"}, { status: 500 })
  }
}