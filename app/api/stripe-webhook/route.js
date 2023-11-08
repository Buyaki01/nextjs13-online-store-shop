import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import connectMongoDB from '@/lib/mongoose'
import { buffer } from 'micro'

const endpointSecret = "whsec_981dd829484907ce6f8cc5cf31f1b2fc55922abd0f76a4dd6f28121cc341321f"

export const POST = async (request, response) => {
  await connectMongoDB()

  const sig = request.headers['stripe-signature']

  let event

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret)
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`)
    return
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object
      console.log(checkoutSessionCompleted)
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
}
