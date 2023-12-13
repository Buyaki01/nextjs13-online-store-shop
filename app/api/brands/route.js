import connectMongoDB from "@/lib/mongoose"
import Brand from "@/models/brand"
import Category from "@/models/category"
import { NextResponse } from "next/server"

export const GET = async () => {
  await connectMongoDB()
  await Category.find()
  const brands = await Brand.find().populate('parentCategory')

  return NextResponse.json({ brands })
}