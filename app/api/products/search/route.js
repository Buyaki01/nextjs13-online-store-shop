import connectMongoDB from "@/lib/mongoose"
import Product from "@/models/product"
import { NextResponse } from "next/server"
import validator from "validator"

export async function GET(request) {
  try {
    await connectMongoDB()

    const products = await Product.find().populate('selectedCategory').populate('brand')
    const { searchParams } = new URL(request.url)
    let query = searchParams.get('query')

    // Sanitize and validate the query parameter
    query = validator.escape(query)

    const filteredSearchProducts = products.filter((product) => {
      return (
        product.productName.toLowerCase().includes(query.toLowerCase()) || 
        product.selectedCategory.name.toLowerCase().includes(query.toLowerCase())
      )
    })

    return NextResponse.json({ filteredSearchProducts })
  } catch (error) {
    console.error("Error in search:", error)
    return NextResponse.error()
  }
}