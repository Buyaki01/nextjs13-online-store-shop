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
    queryValue = validator.escape(queryValue)
    const filteredCategoryProducts = products.filter((product) => {
      return product.selectedCategory && product.selectedCategory.name === queryValue
    })

    return NextResponse.json({ filteredCategoryProducts })
  } catch (error) {
    console.error("Error fetching and filtering products:", error)
    return NextResponse.error({ message: "Internal Server Error" }, { status: 500 })
  }
}