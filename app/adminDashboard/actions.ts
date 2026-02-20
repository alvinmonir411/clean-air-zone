"use server";

import { cookies } from "next/headers";
import clientPromise from "../lib/mongodb";
import { stripe } from "../lib/stripe";
import { ObjectId } from "mongodb";

export async function verifyPassword(formData: FormData) {
    const password = formData.get("password") as string;
    const CORRECT_PASSWORD = "13663"; // Hardcoded simple password as requested

    if (password === CORRECT_PASSWORD) {
        const cookieStore = await cookies();
        cookieStore.set("admin_session", "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 24, // 1 day
        });
        return { success: true };
    } else {
        return { success: false, error: "Incorrect password" };
    }
}

export async function verifyPaymentStatus(paymentId: string) {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);

        const payment = await db.collection("payments").findOne({ _id: new ObjectId(paymentId) });

        if (!payment) {
            return { success: false, error: "Payment not found" };
        }

        if (payment.status === "paid") {
            return { success: true, newStatus: "paid" };
        }

        if (!payment.stripeSessionId) {
            return { success: false, error: "No Stripe Session ID for this payment" };
        }

        const session = await stripe.checkout.sessions.retrieve(payment.stripeSessionId);

        if (session.payment_status === "paid") {
            await db.collection("payments").updateOne(
                { _id: new ObjectId(paymentId) },
                {
                    $set: {
                        status: "paid",
                        paidAt: new Date(),
                    },
                }
            );

            // Optional: trigger email here too if not sent? 
            // For now, let's keep it simple as the user might just want the status update.
            console.log(`Manual verification: Updated ${paymentId} to paid`);
            return { success: true, newStatus: "paid" };
        } else {
            return { success: false, error: `Stripe status is: ${session.payment_status}` };
        }
    } catch (error: any) {
        console.error("verifyPaymentStatus error:", error);
        return { success: false, error: error.message || "Internal server error" };
    }
}
