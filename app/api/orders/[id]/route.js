import connectMongoDB from "@/lib/mongoose"
import Order from "@/models/order"
import { NextResponse } from "next/server"

export async function GET({ params }) {
  const { orderId } = params
  console.log("This is the orderID: ", orderId)

  try {
    await connectMongoDB()

    const order = await Order.findOne({ _id: orderId })

    return NextResponse.json({ order })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch order" }, 500)
  }
}