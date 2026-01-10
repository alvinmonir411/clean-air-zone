import Stripe from "stripe";
import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import { stripe } from "@/app/lib/stripe";

export async function POST(req: Request) {
  console.log("🔔 Webhook request received");
  // 1. রিকোয়েস্ট বডিকে বাফার হিসেবে পান
  const buffer = await req.arrayBuffer();
  // 2. বাফারকে কাঁচা স্ট্রিং-এ রূপান্তর করুন
  const body = Buffer.from(buffer).toString();

  // 3. সিগনেচার হেডার্স পান
  const sig = req.headers.get("stripe-signature");
  console.log("Header signature found:", !!sig);

  if (!sig) {
    console.error("❌ Missing Stripe signature");
    return NextResponse.json(
      { error: "Missing stripe signature" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  // 4. সিগনেচার যাচাই (সঠিক body এবং sig ব্যবহার করে)
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    console.log("✅ Webhook signature verified. Event type:", event.type);
  } catch (err) {
    console.error("❌ Webhook signature error:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    console.log("📦 Processing checkout.session.completed for session:", session.id);

    const paymentId = session.metadata?.paymentId;
    console.log("Metadata paymentId:", paymentId);

    if (!paymentId) {
      console.error("❌ paymentId missing in metadata (Critical Error)");
      return NextResponse.json({ received: true }, { status: 200 });
    }

    try {
      const client = await clientPromise;
      const db = client.db(process.env.MONGODB_DB);

      console.log("💾 Updating DB for paymentId:", paymentId);
      const result = await db.collection("payments").findOneAndUpdate(
        { _id: new ObjectId(paymentId) },
        {
          $set: {
            status: "paid",
            paidAt: new Date(),
            stripeSessionId: session.id,
          },
        },
        { returnDocument: "after" }
      );

      if (!result) {
        console.error("❌ No payment found in DB with ID:", paymentId);
        return NextResponse.json({ received: true }, { status: 200 });
      }

      console.log("🟢 DB updated successfully. Status:", result.status);

      // 3. Send confirmation email
      try {
        console.log("📧 Attempting to send confirmation email to:", result.email);
        const { sendConfirmationEmail } = await import("@/app/lib/email");
        await sendConfirmationEmail({
          email: result.email,
          registrationNumber: result.registrationNumber,
          registrationLocation: result.registrationLocation,
          vehicleType: result.vehicleType,
          cleanAirZone: result.cleanAirZone,
          selectedDates: result.selectedDates,
          totalAmount: result.totalAmount,
        });
        console.log("✉️ Email sent successfully for payment ID:", paymentId);
      } catch (emailError) {
        console.error("❌ Failed to send confirmation email:", emailError);
      }
    } catch (dbError) {
      console.error(`❌ MongoDB error for ID ${paymentId}:`, dbError);
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
