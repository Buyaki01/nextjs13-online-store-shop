// import connectMongoDB from "@/lib/mongoose"
// import Product from "@/models/product"
// import { NextResponse } from "next/server"

// export async function GET(request) {
//   await connectMongoDB()

//   try {
//     const products = await Product.find().populate('selectedCategory').populate('brand')
//     const { searchParams } = new URL(request.url)
//     const query = searchParams.get('query')
//     const filteredCategoryProducts = products.filter((product) => {
//       return product.selectedCategory && product.selectedCategory.name === query
//     })

//     return NextResponse.json({ filteredCategoryProducts })
//   } catch (error) {
//     console.error("Error fetching and filtering products:", error)
//     return NextResponse.error({ status: 500, message: "Internal Server Error" })
//   }
// }