"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { Shield, ArrowRight } from "lucide-react";
import { CheckoutFormData } from "@/app/MultistepForm/page";

interface Step5Props {
  onBack: () => void;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  loading: boolean;
}

const getZoneRate = (zoneName: string): number => {
  switch (zoneName) {
    case "Birmingham":
      return 8;
    case "Bath":
    case "Bradford":
    case "Bristol":
      return 9;
    case "Portsmouth":
    case "Sheffield":
      return 10;
    case "Tyneside":
      return 12.5;
    default:
      return 14;
  }
};

const Step5_ReviewAndAccept: React.FC<Step5Props> = ({
  onBack,
  onSubmit,
  loading,
}) => {
  const {
    watch,
    register,
    setValue,
    formState: { errors },
  } = useFormContext<CheckoutFormData>();

  const formData = watch();
  
  // Set acceptTerms to true implicitly since the checkbox is not in the visual mockup
  React.useEffect(() => {
    setValue("acceptTerms", true);
  }, [setValue]);

  const totalDays = formData.selectedDates?.length || 0;
  const zoneRate = getZoneRate(formData.cleanAirZone);
  const subtotal = totalDays * zoneRate;
  const serviceFee = 5.00;
  const grandTotal = subtotal + serviceFee;

  return (
    <div className="px-6 sm:px-12 py-8 space-y-6">
      {/* Step Header */}
      <div>
        <h2 className="text-3xl font-black text-[#0c2340]">Settle Payment</h2>
        <p className="text-gray-500 font-medium text-sm mt-1">
          Confirm details & enter email for receipt
        </p>
      </div>

      {/* Summary Card */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-4 font-semibold text-sm text-gray-500">
        <div className="flex justify-between items-center py-1">
          <span>Registration:</span>
          <span className="text-[#0c2340] font-bold text-base">{formData.registrationNumber}</span>
        </div>
        <div className="flex justify-between items-center py-1">
          <span>Charging Zone:</span>
          <span className="text-[#0c2340] font-bold text-base">{formData.cleanAirZone}</span>
        </div>
        <div className="flex justify-between items-center py-1">
          <span>Subtotal ({totalDays} days):</span>
          <span className="text-[#0c2340] font-bold text-base">£{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center py-1">
          <span>Service Fee:</span>
          <span className="text-[#0c2340] font-bold text-base">£{serviceFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center border-t border-dashed border-gray-200/50 pt-4 text-lg">
          <span>Grand Total:</span>
          <span className="text-brand-green font-black text-xl">£{grandTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Email Form */}
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400">
            Email Address
          </label>
          <input
            type="email"
            placeholder="driver@example.com"
            {...register("email", {
              required: "Email is required for receipt",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className="w-full p-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent transition text-gray-700 placeholder:text-gray-400 font-semibold text-sm"
          />
          {errors.email && (
            <p className="text-red-500 text-xs font-semibold">{errors.email.message}</p>
          )}
        </div>

        {/* Divider & Navigation */}
        <div className="border-t border-dashed border-gray-200 pt-6 flex justify-between items-center">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-600 rounded-xl font-bold transition text-sm"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-8 py-3.5 rounded-xl font-bold text-sm transition flex items-center justify-center gap-1.5 shadow-md ${
              loading
                ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                : "bg-[#0c4068] hover:bg-[#0c395a] text-white shadow-[#0c4068]/20"
            }`}
          >
            {loading ? "Processing..." : "Pay Securely"}
            {!loading && <Shield className="w-4 h-4" />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step5_ReviewAndAccept;
