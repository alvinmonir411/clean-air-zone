// components/formSteps/StripePayment.jsx
import React from "react";
import { useFormContext } from "react-hook-form";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      "::placeholder": { color: "#aab7c4" },
    },
    invalid: { color: "#9e2146" },
  },
};

const StripePayment = ({ onFinalSubmit, onBack }: any) => {
  const stripe = useStripe();
  const elements = useElements();
  const { register, handleSubmit } = useFormContext();

  const onSubmit = async () => {
    if (!stripe || !elements) {
      return;
    }

    // A real payment flow requires server-side logic (Payment Intent).
    // This is the simplified client-side submission logic for the demo.

    // const cardElement = elements.getElement(CardElement);
    // const { error, paymentMethod } = await stripe.createPaymentMethod({...});

    // if (error) { ... handle error } else { onFinalSubmit(); }

    // --- SIMULATED SUCCESS ---
    alert("Payment successful! (Simulated)");
    onFinalSubmit();
  };

  return (
    <div className="px-10 py-6">
      <div className="text-center mb-8 max-w-sm mx-auto">
        <div className="flex items-center justify-center text-lg font-bold text-gray-800 mb-6">
          <span className="text-[#00b875] mr-2">🔒</span>
          Guaranteed safe & secure checkout
          <span className="ml-3 text-sm font-normal text-gray-500">
            Powered by{" "}
          </span>
          <img
            src="https://js.stripe.com/v3/icon.svg"
            alt="Stripe"
            className="w-10 h-10 ml-1"
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto">
        <div className="mb-6 text-left">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card details
          </label>
          <div className="p-3 border border-gray-300 rounded-lg bg-white shadow-inner">
            <CardElement options={CARD_ELEMENT_OPTIONS} />
          </div>
        </div>

        <div className="mb-6 text-left">
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Country
          </label>
          <select
            id="country"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#00b875] focus:border-[#00b875] transition"
            {...register("country", { required: true })}
            defaultValue="Bangladesh"
          >
            <option value="Bangladesh">Bangladesh</option>
            <option value="UK">UK</option>
            {/* Add more countries */}
          </select>
        </div>

        {/* Secure SSL image (Optional: use a real asset if needed) */}
        <div className="text-center mt-8 border-t border-gray-200 pt-6">
          {/* Replace with your secure image asset if available */}
          <img
            src="https://static.wixstatic.com/media/259837_71e11e3b6d5146c98c19b0d2358c281b~mv2.png"
            alt="Secure SSL Encryption"
            className="mx-auto w-40"
          />
        </div>

        <div className="flex justify-between mt-10">
          <button
            type="button"
            onClick={onBack}
            className="w-full mr-4 px-6 py-3 border-2 border-[#00b875] text-[#00b875] font-bold rounded-lg hover:bg-gray-100 transition duration-200 shadow-md"
          >
            Back
          </button>
          <button
            type="submit"
            className="w-full ml-4 px-6 py-3 bg-[#00b875] text-white font-bold rounded-lg hover:bg-[#00995c] transition duration-200 shadow-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default StripePayment;
