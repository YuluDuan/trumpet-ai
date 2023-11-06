import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


const return_url = process.env.NEXT_BASE_URL + "https://trumpet-ai.vercel.app/generate-blurb";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const currentUserDB = await prisma.user.findUnique({
        where: {
          clerkUserId: userId,
        },
    });


    if (!currentUserDB) {
        return new NextResponse("UserData Not Sync", { status: 400 });
    }
    // use the db generate id as the user id which not depends on which auth tool we use
    const user_id = currentUserDB.id;
  
    if (currentUserDB.stripeCustomerId) {
         // trying to cancel at the billing portal
         console.log(currentUserDB.stripeCustomerId);
        const stripeSession = await stripe.billingPortal.sessions.create({
          customer: currentUserDB.stripeCustomerId,
          return_url: return_url,
        });
  
        return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }


    // user's first time trying to subscribe
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: return_url,
      cancel_url: return_url,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: currentUserDB.email,
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "Trumpet AI Pro",
              description: "Unlimited Blurb Generations",
            },
            unit_amount: 1199,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        user_id,
      },
    });
    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    console.log("[STRIPE_ERROR]", error);
    return new NextResponse(JSON.stringify("Internal Error"), { status: 500 });
  }
}