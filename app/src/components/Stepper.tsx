// components/Stepper.jsx
import React from "react";

const steps = ["Vehicle", "Type", "Location", "Date", "Accept", "Payment"];
const totalSteps = steps.length;

const Stepper = ({ currentStep }: any) => {
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="w-full pt-6 pb-2 border-b border-gray-200 mb-8">
      {/* Progress Bar Container */}
      <div className="relative h-1 bg-gray-200 rounded-full mx-6">
        <div
          className="absolute h-1 bg-[#00b875] rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      {/* Steps Indicators */}
      <div className="flex justify-between -mt-4 mx-6">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;

          return (
            <div
              key={index}
              className={`flex flex-col items-center flex-1 transition-colors duration-300 ${
                isActive
                  ? "text-[#00b875]"
                  : isCompleted
                  ? "text-[#00b875]"
                  : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm z-10 transition-all duration-300 ${
                  isCompleted
                    ? "bg-[#00b875] text-white"
                    : isActive
                    ? "bg-white border-2 border-[#00b875] text-[#00b875]"
                    : "bg-white border-2 border-gray-400 text-gray-400"
                }`}
              >
                {isCompleted ? (
                  // Checkmark icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.916 4.626a.75.75 0 0 1 .208 1.053l-6.858 9.352a.75.75 0 0 1-1.139.141L6.75 10.5h10.592.75l.138.169Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  stepNumber
                )}
              </div>
              <div
                className={`mt-2 text-xs font-semibold ${
                  isActive ? "text-[#00b875]" : "text-gray-600"
                }`}
              >
                {step}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
