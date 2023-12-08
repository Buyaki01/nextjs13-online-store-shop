import connectMongoDB from "@/lib/mongoose"
import Category from "@/models/category"
import { NextResponse } from "next/server"

export const GET = async () => {
  await connectMongoDB()
  
  const categories = await Category.find()

  return NextResponse.json({ categories })
}