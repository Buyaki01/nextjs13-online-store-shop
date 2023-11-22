import connectMongoDB from "@/lib/mongoose"
import Product from "@/models/product"
import { NextResponse } from "next/server"

export const POST = async (request) => {
  const { cartProducts } = await request.json()

  try {
    await connectMongoDB()

    const productsInCart = []

    for (const cartItem of cartProducts) {
      const { productId, quantity: itemQuantity } = cartItem

      // Find the product details based on productId
      const product = await Product.findOne({ _id: productId })

      if (product) {
        // Calculate the subtotal for this item
        const subtotal = product.productPrice * itemQuantity

        productsInCart.push({
          product,
          itemQuantity,
          subtotal,
        })
      } else {
        console.error(`Product with productId ${productId} not found`)
      }
    }

    const totalPrice = productsInCart.reduce((total, item) => total + item.subtotal, 0)

    return NextResponse.json({
      message: "Cart products fetched successfully",
      productsInCart,
      totalPrice,
    }, { status: 200 })
  } catch (error) {
    console.error("Error fetching cart products:", error)
    return NextResponse.json({
      message: "Error fetching cart products",
    }, { status: 500 })
  }
}
