const { MongoClient } = require("mongodb");
const Stripe = require("stripe");
const dotenv = require("dotenv");
dotenv.config();

console.log("--- Diagnostics Start ---");
console.log("MONGODB_URI:", process.env.MONGODB_URI);
console.log("MONGODB_DB:", process.env.MONGODB_DB);
console.log("STRIPE_SECRET_KEY:", process.env.STRIPE_SECRET_KEY ? "Loaded (Starts with " + process.env.STRIPE_SECRET_KEY.substring(0, 7) + ")" : "Not Loaded");
console.log("STRIPE_SECRET_KEY Length:", process.env.STRIPE_SECRET_KEY ? process.env.STRIPE_SECRET_KEY.length : 0);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function run() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is undefined");
    }
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    console.log("✅ MongoDB Connection: SUCCESS");

    const db = client.db(process.env.MONGODB_DB);
    const paymentDoc = {
      registrationNumber: "LO26 CAZ",
      registrationLocation: "UK",
      vehicleType: "Car",
      cleanAirZone: "Bath",
      selectedDates: ["20-06-2026"],
      email: "driver@example.com",
      totalAmount: 1400,
      currency: "GBP",
      status: "pending",
      createdAt: new Date(),
    };

    const result = await db.collection("payments").insertOne(paymentDoc);
    console.log("✅ MongoDB Write: SUCCESS, Inserted ID:", result.insertedId);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: `Clean Air Zone Charge - Bath`,
            },
            unit_amount: 1400,
          },
          quantity: 1,
        },
      ],
      customer_email: "driver@example.com",
      success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/MultistepForm?canceled=true`,
    });

    console.log("✅ Stripe Session Creation: SUCCESS");
    console.log("Stripe URL:", session.url);

  } catch (err) {
    console.error("❌ Test Failed with Error:", err);
  }
}

run();
