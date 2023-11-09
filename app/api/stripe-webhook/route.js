import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import connectMongoDB from '@/lib/mongoose'

export const POST = async (request) => {
  //const { body } = await request.json()
  //const { body } = await request.text()
  const body = await request.json()

  console.log("This is the request body", body)

  await connectMongoDB()

  const sig = request.headers.get('stripe-signature')

  if (!sig) {
    console.log("No Signature")
    return NextResponse.json({ error: "No signature" })
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  let event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.ENDPOINT_SECRET)
  } catch (err) {
    console.log('Webhook signature verification failed', err.message)
    return NextResponse.json({ error: err})
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object
      console.log("This is the payment intent data", paymentIntentSucceeded)
      break;

    // case 'checkout.session.completed':
    //   const checkoutSessionCompleted = event.data.object
    //   console.log(checkoutSessionCompleted)
    //   break;
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
