import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import connectMongoDB from '@/lib/mongoose'
import Order from '@/models/order'

export const POST = async (request) => {
  const body = await request.text()

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
    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object
      const orderId = checkoutSessionCompleted.metadata.orderId
      const paymentComplete = checkoutSessionCompleted.payment_status === 'paid'
      if (orderId && paymentComplete) {
        await Order.findByIdAndUpdate(orderId, { paymentStatus: "Completed" }, { new: true })
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
