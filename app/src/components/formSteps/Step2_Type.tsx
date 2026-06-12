// components/formSteps/Step2_Type.jsx
import React from "react";
import { useFormContext } from "react-hook-form";
import { Smartphone, Wind, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";

const vehicleOptions = [
  { label: "Car", value: "Car", icon: Smartphone },
  { label: "Van / Minibus", value: "Van", icon: Wind },
  { label: "HGV / Bus", value: "Heavy Goods Vehicle", icon: ShieldCheck },
  { label: "Motorcycle", value: "Motorcycle", icon: Sparkles },
];

const Step2_Type = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
  } = useFormContext();

  const selectedType = watch("vehicleType");
  const onSubmit = () => onNext();

  const handleSelect = (value: string) => {
    setValue("vehicleType", value, { shouldValidate: true });
  };

  return (
    <div className="px-6 sm:px-12 py-8 space-y-8">
      {/* Step Header */}
      <div>
        <h2 className="text-3xl font-black text-[#0c2340]">Select Vehicle Type</h2>
        <p className="text-gray-500 font-medium text-sm mt-1">
          Specify your vehicle classification
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* 2x2 Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {vehicleOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = selectedType === opt.value;

            return (
              <div
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border-brand-cyan bg-[#f0f9ff]/50 shadow-sm"
                    : "border-gray-100 hover:border-gray-200 bg-white"
                }`}
              >
                {/* Icon Circle */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                    isSelected ? "bg-brand-cyan text-white" : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* Label */}
                <span className="text-base font-extrabold text-[#0c2340]">
                  {opt.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Hidden Input for Hook Form */}
        <input
          type="hidden"
          {...register("vehicleType", { required: "Vehicle type is required" })}
        />

        {/* Divider */}
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
            disabled={!selectedType}
            className={`px-8 py-3.5 rounded-xl font-bold text-sm transition flex items-center gap-1.5 shadow-md ${
              !selectedType
                ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                : "bg-[#0c4068] hover:bg-[#0c395a] text-white shadow-[#0c4068]/20"
            }`}
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step2_Type;
