import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import connectMongoDB from '@/lib/mongoose'
import { Product } from '@/models/product'

async function fetchProductInfo(productId) {
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
    postalAddress,
    country } = await request.json()

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  try {
    const lineItems = []

    for (const { productId, quantity } of cartProducts) {
      // Fetch product information for the given productId
      const productInfo = await fetchProductInfo(productId)

      if (productInfo) {
        // Add the product to the line items array
        lineItems.push({
          price_data: {
            currency: "usd",
            product_data: {
              name: productInfo.productName,
              description: productInfo.description,
            },
            unit_amount: productInfo.price * 100,
          },
          quantity: quantity,
        });
      }
    }

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      phone_number_collection: {
        enabled: true
      },
      success_url: `${process.env.NEXTAUTH_URL}/checkout-success`,
      cancel_url: `${process.env.NEXTAUTH_URL}/cart`,
      metadata: {
        email,
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (err) {
    return NextResponse.json({ error: err.message})
  }
}