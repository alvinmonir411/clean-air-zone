import Stripe from "stripe";

let stripeInstance: Stripe | null = null;

const getStripe = (): Stripe => {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY environment variable is missing.");
  }
  if (!stripeInstance) {
    stripeInstance = new Stripe(key);
  }
  return stripeInstance;
};

// Export a proxy that delegates to the lazily-initialized Stripe client
export const stripe = new Proxy({} as Stripe, {
  get(target, prop) {
    const instance = getStripe();
    const val = (instance as any)[prop];
    if (typeof val === "function") {
      return val.bind(instance);
    }
    return val;
  }
});

