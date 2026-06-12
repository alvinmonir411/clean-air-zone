import Stripe from "stripe";
import { NextResponse } from "next/server";
import { stripe } from "@/app/lib/stripe";
import { getDataSource } from "@/app/lib/db";
import { PaymentSchema } from "@/app/lib/entities/payment.entity";


export async function POST(req: Request) {
  console.log("🔔 Webhook request received");
  
  const buffer = await req.arrayBuffer();
  const body = Buffer.from(buffer).toString();
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
      const dataSource = await getDataSource();
      const paymentRepository = dataSource.getRepository<any>("Payment");

      console.log("💾 Updating PostgreSQL DB for paymentId:", paymentId);
      const existingPayment = await paymentRepository.findOne({
        where: { id: paymentId }
      });

      if (!existingPayment) {
        console.error("❌ No payment found in DB with ID:", paymentId);
        return NextResponse.json({ received: true }, { status: 200 });
      }

      if (existingPayment.status !== "paid") {
        existingPayment.status = "paid";
        existingPayment.paidAt = new Date();
        existingPayment.stripeSessionId = session.id;

        const result = await paymentRepository.save(existingPayment);
        console.log("🟢 PostgreSQL DB updated successfully. Status:", result.status);

        console.log("📧 Skipped confirmation email send.");
      } else {
        console.log("ℹ️ Payment is already marked as paid.");
      }
    } catch (dbError) {
      console.error(`❌ PostgreSQL error for ID ${paymentId}:`, dbError);
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

