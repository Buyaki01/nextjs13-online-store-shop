import connectMongoDB from "@/lib/mongoose"
import Brand from "@/models/brand"
import Category from "@/models/category"
import Product from "@/models/product"
import { NextResponse } from "next/server"

export async function GET(request, { params }) {
  const { id } = params

  await connectMongoDB()
  await Category.find()
  await Brand.find().populate('parentCategory')
  const product = await Product.findOne({ _id: id }).populate('selectedCategory').populate('brand')
  
  return NextResponse.json({ product }, { status: 200 })
}