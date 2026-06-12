// components/Stepper.jsx
import React from "react";
import { Check } from "lucide-react";

const steps = ["Vehicle", "Type", "Zone", "Dates", "Email"];
const totalSteps = steps.length;

const Stepper = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="w-full pt-8 pb-6 border-b border-gray-100 px-6 sm:px-12 relative">
      {/* Steps Indicators */}
      <div className="flex items-center justify-between relative max-w-2xl mx-auto">
        {/* Connecting Lines */}
        <div className="absolute left-0 right-0 top-[18px] h-0.5 bg-gray-100 -z-10" />
        <div
          className="absolute left-0 top-[18px] h-0.5 bg-brand-green transition-all duration-500 ease-in-out -z-10"
          style={{ width: `${((Math.min(currentStep, totalSteps) - 1) / (totalSteps - 1)) * 100}%` }}
        />

        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;

          return (
            <div
              key={index}
              className="flex flex-col items-center flex-1 relative z-10"
            >
              {/* Circle */}
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  isCompleted
                    ? "bg-brand-green text-white shadow-sm"
                    : isActive
                    ? "bg-[#0c4068] text-white ring-4 ring-[#0c4068]/10"
                    : "bg-white border-2 border-gray-200 text-gray-400"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 stroke-[3px]" />
                ) : (
                  stepNumber
                )}
              </div>
              
              {/* Step Label */}
              <span
                className={`mt-2 text-xs font-bold transition-colors duration-300 ${
                  isActive
                    ? "text-[#0c4068]"
                    : isCompleted
                    ? "text-gray-400"
                    : "text-gray-400 font-semibold"
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
