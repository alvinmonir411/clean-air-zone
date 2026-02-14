import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY || "dummy_key_for_build";
export const stripe = new Stripe(key, {
  apiVersion: "2025-12-15.clover" as const,
});
