import connectMongoDB from "@/lib/mongoose"
import { Product } from "@/models/product"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    await connectMongoDB()
    
    const products = await Product.find()
    //const products = await Product.find().populate('selectedCategory')
    console.log("Products: ", products)

    if (!products || products.length === 0) {
      console.error("No products found")
      return NextResponse.json({ error: "No products found" }, 404)
    }

    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, 500)
  }
}