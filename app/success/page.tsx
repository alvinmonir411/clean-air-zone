import { stripe } from "../lib/stripe";
import clientPromise from "../lib/mongodb";
import { sendConfirmationEmail } from "../lib/email";

interface SuccessPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  // ✅ unwrap the search params
  const { session_id } = await searchParams;

  if (!session_id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 font-semibold">
          No session_id found in URL.
        </p>
      </div>
    );
  }

  // Retrieve Stripe session if needed
  let session = null;
  let paymentUpdated = false;

  try {
    session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {
      const paymentId = session.metadata?.paymentId;
      if (paymentId) {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);
        const { ObjectId } = await import("mongodb");

        // Check current status to avoid double-sending emails
        const existingPayment = await db.collection("payments").findOne({ _id: new ObjectId(paymentId) });

        if (existingPayment && existingPayment.status !== "paid") {
          console.log(`SuccessPage: Updating payment ${paymentId} to paid`);
          const result = await db.collection("payments").findOneAndUpdate(
            { _id: new ObjectId(paymentId) },
            {
              $set: {
                status: "paid",
                paidAt: new Date(),
                stripeSessionId: session.id
              }
            },
            { returnDocument: "after" }
          );

          if (result) {
            console.log("SuccessPage: Sending confirmation emails...");
            try {
              await sendConfirmationEmail({
                email: result.email,
                registrationNumber: result.registrationNumber,
                registrationLocation: result.registrationLocation,
                vehicleType: result.vehicleType,
                cleanAirZone: result.cleanAirZone,
                selectedDates: result.selectedDates,
                totalAmount: result.totalAmount,
              });
              paymentUpdated = true;
            } catch (emailErr) {
              console.error("SuccessPage: Email notification failed", emailErr);
            }
          }
        }
      }
    }
  } catch (error) {
    console.error("Error retrieving or updating Stripe session:", error);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-lg w-full space-y-8 bg-white p-10 rounded-xl shadow-xl text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Payment Successful!
        </h2>
        <p className="mt-2 text-lg text-gray-600">
          Thank you! Your payment is confirmed.
        </p>
        <p className="mt-4 text-sm">
          Payment session ID:
          <span className="font-mono text-green-500 block mt-1">
            {session_id}
          </span>
        </p>
        <p className="mt-2 text-sm text-gray-600">
          Customer email: {session?.customer_email || "N/A"}
        </p>
        <a
          href="/"
          className="mt-6 inline-flex w-full justify-center bg-[#00b875] text-white py-3 px-6 rounded-lg hover:bg-green-600 font-medium"
        >
          Back to Home
        </a>
        {paymentUpdated && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 text-sm">
            ✅ Payment confirmed and confirmation email sent to {session?.customer_email}
          </div>
        )}
      </div>
    </div>
  );
}
