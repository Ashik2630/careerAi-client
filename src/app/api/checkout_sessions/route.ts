import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getUserSession } from "@/lib/core/session";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "";
const stripe = new Stripe(stripeSecretKey);

export async function POST(request: Request) {
  try {
    const session = await getUserSession();
    const userEmail = session?.email || "customer@example.com";

    let body: any = {};
    const contentType = request.headers.get("content-type") || "";

    try {
      if (contentType.includes("application/x-www-form-urlencoded")) {
        const text = await request.text();
        const params = new URLSearchParams(text);
        body = Object.fromEntries(params.entries());
      } else {
        body = await request.json().catch(() => ({}));
      }
    } catch {
      body = {};
    }

    const planName = body.planName || "Pro Career";
    const isAnnual = body.isAnnual === true || body.isAnnual === "true" || body.priceId?.includes("annual");

    const host = request.headers.get("host") || "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";
    const origin = `${protocol}://${host}`;

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `CareerAI ${planName} Subscription`,
              description: "Unlimited AI ATS Resumes, 24/7 AI Career Coach & Priority Matching",
            },
            unit_amount: isAnnual ? 28800 : 2900,
            recurring: {
              interval: isAnnual ? "year" : "month",
            },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      customer_email: userEmail,
      success_url: `${origin}/profile?session_id={CHECKOUT_SESSION_ID}&upgraded=true`,
      cancel_url: `${origin}/pricing?canceled=true`,
    });

    if (checkoutSession.url) {
      if (contentType.includes("application/x-www-form-urlencoded")) {
        return NextResponse.redirect(checkoutSession.url, 303);
      }
      return NextResponse.json({ success: true, url: checkoutSession.url });
    }

    return NextResponse.json({ error: "Failed to generate Stripe Checkout URL" }, { status: 500 });
  } catch (error: any) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json({ error: error.message || "Stripe checkout session failed" }, { status: 500 });
  }
}
