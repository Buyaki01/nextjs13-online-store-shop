import connectMongoDB from "@/lib/mongoose"
import Category from "@/models/category"
import { NextResponse } from "next/server"

export async function GET() {
  await connectMongoDB()
  
  const categories = await Category.find()

  return NextResponse.json({ categories })
}