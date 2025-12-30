// src/components/formSteps/Step5_ReviewAndAccept.tsx
"use client";

import { CheckoutFormData } from "@/app/MultistepForm/page";
import React from "react";
import { useFormContext } from "react-hook-form";

interface Step5Props {
  onBack: () => void;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  loading: boolean;
}

const Step5_ReviewAndAccept: React.FC<Step5Props> = ({
  onBack,
  onSubmit,
  loading,
}) => {
  const {
    watch,
    register,
    formState: { errors },
  } = useFormContext<CheckoutFormData>();

  // সমস্ত ডেটা ফর্ম কনটেক্সট থেকে ওয়াচ করা
  const formData = watch();

  // ইউজারকে দেখানোর জন্য ডেটার একটি পরিষ্কার তালিকা তৈরি করা
  const summaryItems = [
    { label: "Vehicle Registration No.", value: formData.registrationNumber },
    { label: "Country of Registration", value: formData.registrationLocation },
    { label: "Vehicle Type", value: formData.vehicleType },
    { label: "Clean Air Zone", value: formData.cleanAirZone },
    {
      label: "Selected Payment Dates",
      value: formData.selectedDates.join(", ") || "No dates selected",
      highlight: true,
    },
    { label: "Payment For (First Date)", value: formData.paymentDate },
  ];

  return (
    <div className="max-w-xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Review & Confirm Payment
      </h2>

      {/* ✅ SUMMARY SECTION */}
      <div className="mb-8 border rounded-xl p-6 bg-gray-50 shadow-sm">
        <h3 className="text-xl font-bold mb-4 border-b pb-2">Your Details</h3>

        <div className="space-y-3">
          {summaryItems.map((item, index) => (
            <div key={index} className="flex justify-between text-lg">
              <span className="font-medium text-gray-600">{item.label}:</span>
              <span
                className={`font-semibold ${
                  item.highlight ? "text-[#00b875]" : "text-gray-800"
                }`}
              >
                {item.value}
              </span>
            </div>
          ))}
          <div className="pt-4 text-2xl font-extrabold text-red-600 border-t mt-4">
            <span>Total Payable:</span>
            <span>£14.00</span>
          </div>
        </div>
      </div>

      {/* ✅ EMAIL & TERMS SECTION */}
      <form onSubmit={onSubmit} className="space-y-5">
        {/* Email Input */}
        <div>
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Payment Confirmation Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required for confirmation.",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            placeholder="e.g., your.email@example.com"
            className="w-full p-4 border rounded-xl focus:ring-[#00b875] focus:border-[#00b875]"
          />
          {errors.email && (
            <p className="text-red-600 mt-1">
              {errors.email.message as string}
            </p>
          )}
        </div>

        {/* Terms Checkbox */}
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            {...register("acceptTerms", {
              required: "You must accept the terms to proceed.",
            })}
            className="w-5 h-5 text-[#00b875] border-gray-300 rounded focus:ring-[#00b875]"
          />
          <span className="text-gray-700">
            I accept the{" "}
            <a
              href="#"
              className="text-[#00b875] font-semibold hover:underline"
            >
              Terms and Conditions
            </a>
            .
          </span>
        </label>
        {errors.acceptTerms && (
          <p className="text-red-600 mt-1">
            {errors.acceptTerms.message as string}
          </p>
        )}

        {/* Navigation & Submit */}
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onBack}
            className="w-full py-4 border border-gray-300 rounded-xl text-lg hover:bg-gray-50"
          >
            Back
          </button>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#00b875] text-white text-lg font-semibold rounded-xl disabled:opacity-50 hover:bg-[#009b61]"
          >
            {loading ? "Processing Payment..." : "Pay £14.00 Securely"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step5_ReviewAndAccept;
