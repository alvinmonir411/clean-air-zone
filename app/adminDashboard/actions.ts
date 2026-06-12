"use server";

import { cookies } from "next/headers";
import { stripe } from "../lib/stripe";
import { getDataSource } from "../lib/db";
import { PaymentSchema } from "../lib/entities/payment.entity";

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
        const dataSource = await getDataSource();
        const paymentRepository = dataSource.getRepository(PaymentSchema);

        const payment = await paymentRepository.findOne({
            where: { id: paymentId }
        });

        if (!payment) {
            return { success: false, error: "Payment not found in database" };
        }

        if (payment.status === "paid") {
            return { success: true, newStatus: "paid" };
        }

        if (!payment.stripeSessionId) {
            return { success: false, error: "No Stripe Session ID for this payment" };
        }

        const session = await stripe.checkout.sessions.retrieve(payment.stripeSessionId);

        if (session.payment_status === "paid") {
            payment.status = "paid";
            payment.paidAt = new Date();

            await paymentRepository.save(payment);

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

