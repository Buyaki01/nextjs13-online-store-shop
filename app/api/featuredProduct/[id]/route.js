import connectMongoDB from "@/lib/mongoose"
import { Product } from "@/models/product"
import { NextResponse } from "next/server"

export async function GET(request, { params }) {
  const { id } = params
  await connectMongoDB()
  const featuredProduct = await Product.findOne({ _id: id })
  
  return NextResponse.json({ featuredProduct }, { status: 200 })
}