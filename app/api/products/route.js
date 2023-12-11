import connectMongoDB from "@/lib/mongoose"
import Category from "@/models/category"
import Brand from "@/models/brand"
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
      return NextResponse.json({ error: "No products found" }, { status: 404 })
    }

    return NextResponse.json({ categories, brands, products })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}