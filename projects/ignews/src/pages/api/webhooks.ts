import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from 'stream'
import Stripe from "stripe";
import { stripe } from "../../services/stripe";
import saveSubscription from "./_lib/manageSubscription";

async function createBuffer(readable: Readable) {
  const chunks = []

  for await (const chunk of readable) {
    chunks.push(
      typeof chunk === 'string' ? Buffer.from(chunk) : chunk
    )
  }

  return Buffer.concat(chunks)
}

export const config = {
  api: {
    bodyParser: false
  }
}

const relevanteEvents = new Set([
  'checkout.session.completed',
  'customer.subscriptions.created',
  'customer.subscriptions.updated',
  'customer.subscriptions.deleted',
])

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const buffer = await createBuffer(req)
    const secret = req.headers['stripe-signature']

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(buffer, secret, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (e) {
      return res.status(400).send('Webhook error')
    }

    const type = event.type

    if (relevanteEvents.has(type)) {
      try {
        switch (type) {
          case 'checkout.session.completed':

            const checkoutSession = event.data.object as Stripe.Checkout.Session
            await saveSubscription(
              checkoutSession.subscription.toString(),
              checkoutSession.customer.toString(),
              true
            )

            break;

          case 'customer.subscription.created':
          case 'customer.subscription.updated':
          case 'customer.subscription.deleted':
            const subscription = event.data.object as Stripe.Subscription

            await saveSubscription(
              subscription.id,
              subscription.customer.toString(),
              type === 'customer.subscription.created'
            )

            break;

          default:
            throw new Error('Unhandled event.')
        }
      } catch (error) {
        return res.json({
          error: 'Webhook handler failed.'
        })
      }
    }

    res.json({
      msg: 'received'
    })

  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method not allowed')
  }


}