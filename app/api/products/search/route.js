import connectMongoDB from "@/lib/mongoose"
import Product from "@/models/product"
import { NextResponse } from "next/server"
import validator from "validator"

export const GET = async (request) => {
  const url = await request.url
  try {
    let queryValue = new URLSearchParams(url.split('?')[1]).get("query")
    await connectMongoDB()
    const products = await Product.find().populate('selectedCategory').populate('brand')

    // Sanitize and validate the query parameter
    queryValue = validator.escape(queryValue)

    const filteredSearchProducts = products.filter((product) => {
      return (
        product.productName.toLowerCase().includes(queryValue.toLowerCase()) || 
        product.selectedCategory.name.toLowerCase().includes(queryValue.toLowerCase()) ||
        product.brand.brandName.toLowerCase().includes(queryValue.toLowerCase())
      )
    })

    return NextResponse.json({ filteredSearchProducts })
  } catch (error) {
    console.error("Error in search:", error)
    return NextResponse.error()
  }
}