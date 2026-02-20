"use server";

import clientPromise from "./lib/mongodb";
import { stripe } from "./lib/stripe";
import { headers } from "next/headers";

export async function createCheckoutSession(formData: FormData) {
  const data = Object.fromEntries(formData);
  const selectedDates = formData.getAll("selectedDates") as string[];

  if (!selectedDates.length) {
    throw new Error("No dates selected");
  }

  const totalDays = selectedDates.length;

  // Fetch dynamic price from DB
  let pricePerDay = 1400; // Default fallback
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const settings = await db.collection("settings").findOne({ _id: "pricing" as any });
    if (settings && settings.amount) {
      pricePerDay = settings.amount;
    }
  } catch (error) {
    console.error("Error fetching price:", error);
  }

  const totalAmountPounds = totalDays * pricePerDay;

  // 1️⃣ Save payment as PENDING
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const paymentDoc = {
    registrationNumber: data.registrationNumber,
    registrationLocation: data.registrationLocation,
    vehicleType: data.vehicleType,
    cleanAirZone: data.cleanAirZone,
    selectedDates,
    email: data.email,
    totalAmount: totalAmountPounds,
    currency: "GBP",
    status: "pending",
    createdAt: new Date(),
  };

  const result = await db.collection("payments").insertOne(paymentDoc);

  // 2️⃣ Determine Base URL dynamically or from Env
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = host?.includes("localhost") ? "http" : "https";
  const dynamicBaseUrl = `${protocol}://${host}`;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || dynamicBaseUrl;

  console.log(`Checkout: Using baseUrl ${baseUrl}`);

  // 3️⃣ Create Stripe Checkout Session
  let session;
  try {
    session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: `Clean Air Zone Charge - ${data.cleanAirZone}`,
            },
            unit_amount: Math.round(totalAmountPounds), // Ensure integer
          },
          quantity: 1,
        },
      ],
      customer_email: data.email as string,
      metadata: {
        paymentId: result.insertedId.toString(),
      },
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/?canceled=true`,
    });
  } catch (stripeError: any) {
    console.error("❌ Stripe Session Creation Failed:", stripeError.message);
    throw new Error(`Payment service unavailable: ${stripeError.message}`);
  }

  // 4️⃣ Update DB with Stripe Session ID
  await db.collection("payments").updateOne(
    { _id: result.insertedId },
    {
      $set: {
        stripeSessionId: session.id,
      },
    }
  );

  return { url: session.url };
}
