import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import connectMongoDB from '@/lib/mongoose'
import Product from '@/models/product'
import User from '@/models/user'
import Order from '@/models/order'

const fetchProductInfo = async (productId) => {
  await connectMongoDB()

  try {
    const productInfo = await Product.findById(productId)
    return productInfo
  } catch (error) {
    console.error(`Error fetching product: ${error}`)
    return null
  }
}

export const POST = async (request) => {
  const { email, cartProducts, firstname,
    lastname,
    phoneNumber,
    streetAddress,
    city,
    postalCode,
    country } = await request.json()

  const user = await User.findOne({ email })
  const productInfoArray = []

  for (const { productId, quantity } of cartProducts) {
    // Fetch product information for the given productId
    const productInfo = await fetchProductInfo(productId)

    if (productInfo) {
      const subtotal = productInfo.productPrice * quantity

      productInfoArray.push({
        id: productInfo._id,
        productName: productInfo.productName,
        description: productInfo.description,
        regularPrice: productInfo.regularPrice,
        productPrice: productInfo.productPrice,
        images: productInfo.uploadedImagePaths,
        selectedCategory: productInfo.selectedCategory,
        brand: productInfo.brand,
        quantityInStock: productInfo.quantityInStock,
        properties: productInfo.properties,
        isFeatured: productInfo.isFeatured,
        cartQuantity: quantity,
        subtotal,
      })
    }
  }

  const totalPrice = productInfoArray.reduce((total, item) => total + item.subtotal, 0)

  const orderDetails = await Order.create({ 
    user: user._id,
    products: productInfoArray,
    totalPrice,
    firstname,
    lastname,
    phoneNumber,
    streetAddress,
    city,
    postalCode,
    country,
  })

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  
  try {
    const lineItems = productInfoArray.map((productInfo) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: productInfo.productName,
          description: productInfo.description,
        },
        unit_amount: productInfo.productPrice * 100,
      },
      quantity: productInfo.cartQuantity,
    }))

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      phone_number_collection: {
        enabled: true
      },
      success_url: `${process.env.NEXTAUTH_URL}/checkout-success/${orderDetails._id.toString()}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/cart`,
      metadata: {
        orderId:orderDetails._id.toString(),
      },
    })
    
    return NextResponse.json({ sessionId: session.id })
  } catch (err) {
    console.error("Error in creating checkout session:", err)
    return NextResponse.json({ error: err.message})
  }
}