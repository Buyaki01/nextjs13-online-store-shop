import Stripe from 'stripe'
import { NextResponse } from 'next/server'

export const POST = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "T-shirt",
            },
            unit_amount: 2000,
          },
          quantity: 2,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXTAUTH_URL}/success`,
      cancel_url: `${process.env.NEXTAUTH_URL}/cart`,
    })
    return NextResponse.json({ message: "Connection is Active!" })
  } catch (err) {
    return NextResponse.json({ error: err.message})
  }
}