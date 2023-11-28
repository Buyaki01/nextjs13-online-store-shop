import connectMongoDB from "@/lib/mongoose"
import Order from "@/models/order"
import { NextResponse } from "next/server"

export async function GET(request, { params }) {
  const { id } = params
  
  try {
    await connectMongoDB()

    const order = await Order.findOne({ _id: id })

    return NextResponse.json({ order })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch order" }, 500)
  }
}