import connectMongoDB from "@/lib/mongoose"
import Brand from "@/models/brand"
import { NextResponse } from "next/server"

export async function GET() {
  await connectMongoDB()
  
  const brands = await Brand.find().populate('parentCategory')

  return NextResponse.json({ brands })
}
