import connectMongoDB from "@/lib/mongoose"
import { Order } from "@/models/order"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    await connectMongoDB()

    const orders = await Order.find()

    return NextResponse.json({ orders })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch orders" }, 500)
  }
}