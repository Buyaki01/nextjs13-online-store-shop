import connectMongoDB from "@/lib/mongoose"
import { Product } from "@/models/product"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    await connectMongoDB()

    const featuredProduct = await Product.find({ isFeatured: true })

    return NextResponse.json(featuredProduct)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch featured product" }, 500)
  }
}