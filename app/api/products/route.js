import connectMongoDB from "@/lib/mongoose"
import Brand from "@/models/brand"
import Category from "@/models/category"
import Product from "@/models/product"
import { NextResponse } from "next/server"

export const GET = async () => {
  try {
    await connectMongoDB()
    const categories = await Category.find()
    const brands = await Brand.find().populate('parentCategory')
    const products = await Product.find().populate('brand').populate('selectedCategory')
    
    if (!products || products.length === 0) {
      console.error("No products found")
      return NextResponse.json({ error: "No products found" }, 404)
    }

    return NextResponse.json({ products, categories, brands })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, 500)
  }
}