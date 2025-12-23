// app/api/create-payment-intent/route.js

import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  try {
    const { amount, metadata } = await req.json();

    if (!amount || typeof amount !== "number" || amount < 50) {
      return NextResponse.json(
        { error: "Invalid amount specified or amount is too small." },
        { status: 400 }
      );
    }

    // 3. Stripe PaymentIntent তৈরি করুন
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "gbp",
      payment_method_types: ["card"],
      metadata: metadata,
    });

    // 4. Client Secret ফ্রন্ট-এন্ডে ফেরত পাঠান
    // ফ্রন্ট-এন্ড এই সিক্রেট ব্যবহার করে পেমেন্ট নিশ্চিত করবে
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating PaymentIntent:", error);
    // যদি Stripe API তে কোনো সমস্যা হয়, তবে 500 স্ট্যাটাস কোড সহ এরর মেসেজ পাঠান
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET এবং অন্যান্য রিকোয়েস্ট ব্লক করার জন্য (ঐচ্ছিক)
export async function GET() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
