import connectMongoDB from "@/lib/mongoose"
import { Product } from "@/models/product"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    await connectMongoDB()

    const hotNewReleaseProducts = await Product.find({}, null, {sort: {'_id': -1}, limit: 3})

    return NextResponse.json(hotNewReleaseProducts)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch hot new releases" }, 500)
  }
}