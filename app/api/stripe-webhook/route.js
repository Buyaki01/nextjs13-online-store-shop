import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import connectMongoDB from '@/lib/mongoose'
import { buffer } from 'micro'

const endpointSecret = process.env.ENDPOINT_SECRET

export const POST = async (request, response) => {
  await connectMongoDB()

  const sig = request.headers['stripe-signature']
  console.log(sig)

  let event

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret)
  } catch (err) {
    return NextResponse.json({ error: err.message})
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object
      console.log(paymentIntentSucceeded)
      break;
    default:
      console.log(`Unhandled event type ${event.type}`)
  }
}
