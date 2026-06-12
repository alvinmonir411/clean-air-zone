"use server";

import { getDataSource } from "./lib/db";
import { PaymentSchema } from "./lib/entities/payment.entity";
import { stripe } from "./lib/stripe";
import { headers } from "next/headers";

export async function createCheckoutSession(formData: FormData) {
  try {
    const data = Object.fromEntries(formData);
    const selectedDates = formData.getAll("selectedDates") as string[];

    if (!selectedDates.length) {
      return { success: false, error: "No dates selected" };
    }

    const totalDays = selectedDates.length;

    // Fetch dynamic price based on selected zone
    const getZoneRatePence = (zoneName: string): number => {
      switch (zoneName) {
        case "Birmingham":
          return 800;
        case "Bath":
        case "Bradford":
        case "Bristol":
          return 900;
        case "Portsmouth":
        case "Sheffield":
          return 1000;
        case "Tyneside":
          return 1250;
        default:
          return 1400;
      }
    };

    const zoneRatePence = getZoneRatePence(String(data.cleanAirZone));
    const serviceFeePence = 500; // £5.00 service fee
    const totalAmountPounds = (totalDays * zoneRatePence) + serviceFeePence;

    // 1️⃣ Save payment as PENDING
    const dataSource = await getDataSource();
    const paymentRepository = dataSource.getRepository(PaymentSchema);

    const savedPayment = await paymentRepository.save({
      registrationNumber: String(data.registrationNumber),
      registrationLocation: String(data.registrationLocation),
      vehicleType: String(data.vehicleType),
      cleanAirZone: String(data.cleanAirZone),
      selectedDates: selectedDates,
      email: String(data.email),
      totalAmount: totalAmountPounds,
      currency: "GBP",
      status: "pending",
    });

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
          paymentId: savedPayment.id,
        },
        success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/MultistepForm?canceled=true`,
      });
    } catch (stripeError: any) {
      console.error("❌ Stripe Session Creation Failed:", stripeError.message);
      return { success: false, error: `Stripe Error: ${stripeError.message}` };
    }

    // 4️⃣ Update DB with Stripe Session ID
    savedPayment.stripeSessionId = session.id;
    await paymentRepository.save(savedPayment);

    return { success: true, url: session.url };
  } catch (error: any) {
    console.error("❌ createCheckoutSession failed:", error);
    return { success: false, error: error.message || "Internal server error" };
  }
}

