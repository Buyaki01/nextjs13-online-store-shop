import connectMongoDB from "@/lib/mongoose"
import Order from "@/models/order"
import { NextResponse } from "next/server"

export const GET = async ({ params }) => {
  const { id } = params
  
  try {
    await connectMongoDB()

    const order = await Order.findOne({ _id: id }).populate({
      path: 'products.selectedCategory',
      model: 'Category',
    })
    .populate({
      path: 'products.brand',
      model: 'Brand',
    })
    .exec()

    return NextResponse.json({ order })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 })
  }
}