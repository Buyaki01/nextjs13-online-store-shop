import connectMongoDB from "@/lib/mongoose"
import { Product } from "@/models/product"
import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    const { ids } = await request.json()
    console.log(ids)
    await connectMongoDB()

  } catch (error) {
    return NextResponse.json({ error: "Failed to post ids" }, 500)
  }
}

export async function GET(request) {
  const { ids } = await request.json()

  await connectMongoDB()
  const cartProductsInfo = await Product.find({ _id: ids })

  return NextResponse.json(cartProductsInfo)
}