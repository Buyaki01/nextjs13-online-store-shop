import connectMongoDB from "@/lib/mongoose"
import { Product } from "@/models/product"
import { NextResponse } from "next/server"


export async function GET() {
  await connectMongoDB()

  // Find the featured product
  const featuredProduct = await Product.findOne({ isFeatured: true })

  if (!featuredProduct) {
    return NextResponse.json({ product: null })
  }

  return NextResponse.json({ product: featuredProduct })
}