import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (error : any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  // new subscription created
  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );
    if (!session?.metadata?.user_id) {
      return new NextResponse("no userid", { status: 400 });
    }
    await prisma.userSubscription.create({
        data: {
          stripeSubscriptionId: subscription.id,
          stripeCustomerId: subscription.customer as string,
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000
          ),
        },
      })
    
      await prisma.user.update({
        where: {
          id: session.metadata.user_id,
        },
        data: {
          stripeCustomerId: subscription.customer as string,
        },
      });
    }

  if (event.type === "invoice.payment_succeeded") {
     // Retrieve the subscription details from Stripe.
     const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      )

    // Update the price id and set the new period end.
    await prisma.userSubscription.update({
        where: {
          stripeSubscriptionId: subscription.id,
        },
        data: {
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000,
          ),
        },
      });
    }

  return new NextResponse(null, { status: 200 });
}