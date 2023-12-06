import connectMongoDB from "@/lib/mongoose"
import Product from "@/models/product"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    await connectMongoDB()
    
    const products = await Product.find().populate('brand').populate('selectedCategory')
    
    if (!products || products.length === 0) {
      console.error("No products found")
      return NextResponse.json({ error: "No products found" }, { status: 404 })
    }

    console.log("These are the products from GET server side: ", products)

    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ message: "Failed to fetch products" }, { status: 500 })
  }
}