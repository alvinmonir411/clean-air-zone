// components/formSteps/Step1_Vehicle.jsx
import React from "react";
import { useFormContext } from "react-hook-form";

const Step1_Vehicle = ({ onNext }: { onNext: () => void }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useFormContext();

  const regNo = watch("registrationNumber") || "";
  const onSubmit = () => onNext();

  const isNextDisabled = !regNo.trim();

  return (
    <div className="px-6 sm:px-12 py-8 space-y-8">
      {/* Step Header */}
      <div>
        <h2 className="text-3xl font-black text-[#0c2340]">Find Vehicle</h2>
        <p className="text-gray-500 font-medium text-sm mt-1">
          Enter your vehicle registration number
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Yellow License Plate */}
        <div className="flex justify-center py-4">
          <div className="relative inline-block w-full max-w-md shadow-lg rounded-2xl overflow-hidden border-2 border-black">
            <div className="flex items-stretch bg-[#f7d117] h-20">
              {/* Blue GB banner */}
              <div className="bg-[#002f6c] w-10 flex flex-col justify-between items-center py-3 text-white text-[10px] font-bold select-none leading-none shrink-0">
                <span className="text-[#f7d117] text-xs">★</span>
                <span>GB</span>
              </div>
              {/* Input field */}
              <input
                type="text"
                id="registrationNumber"
                placeholder="AB12 CDE"
                className="w-full bg-transparent border-none outline-none font-sans font-black text-center text-[#111] text-3xl uppercase tracking-wider px-4 placeholder:text-black/25"
                maxLength={8}
                {...register("registrationNumber", {
                  required: "Registration Number is required",
                })}
              />
            </div>
          </div>
        </div>

        {/* Hidden inputs to keep form structure intact */}
        <input type="hidden" value="UK" {...register("registrationLocation")} />

        {/* Divider */}
        <div className="border-t border-dashed border-gray-200 pt-6">
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isNextDisabled}
              className={`px-8 py-3.5 rounded-xl font-bold text-sm transition flex items-center gap-1.5 shadow-md ${
                isNextDisabled
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                  : "bg-[#0c4068] hover:bg-[#0c395a] text-white shadow-[#0c4068]/20"
              }`}
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Step1_Vehicle;
