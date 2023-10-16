import connectMongoDB from "@/lib/mongoose"
import { Product } from "@/models/product"
import { NextResponse } from "next/server"


export async function GET() {
  await connectMongoDB()

  
}