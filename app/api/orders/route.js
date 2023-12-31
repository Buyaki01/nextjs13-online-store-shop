import connectMongoDB from "@/lib/mongoose"
import Order from "@/models/order"
import { NextResponse } from "next/server"

export const GET = async () => {
  try {
    await connectMongoDB()

    const orders = await Order.find().sort({ createdAt: -1 })

    return NextResponse.json({ orders })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}