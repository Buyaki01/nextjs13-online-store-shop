import connectMongoDB from "@/lib/mongoose"
import Order from "@/models/order"
import User from "@/models/user"
import { NextResponse } from "next/server"

export const PUT = async (request) => {
  const {
    email,
    orderId,
    firstname,
    lastname,
    phoneNumber,
    streetAddress,
    city,
    postalCode,
    country,
  } = await request.json()

  try {
    await connectMongoDB()

    const user = await User.findOne({ email })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 })
    }

    if (user.email !== email) {
      return NextResponse.json(
        { error: "Unauthorized. Email does not match the user." }, { status: 401 }
      )
    }

    const updatedAddress = await Order.findOneAndUpdate(
      { _id: orderId },
      {
        firstname,
        lastname,
        phoneNumber,
        streetAddress,
        city,
        postalCode,
        country,
      },
      { new: true }
    )
      .populate({
        path: 'products.selectedCategory',
        model: 'Category',
      })
      .populate({
        path: 'products.brand',
        model: 'Brand',
      })
      .exec()

    return NextResponse.json({ updatedAddress })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update address" }, { status: 500 })
  }
}