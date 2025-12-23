// components/formSteps/Step2_Type.jsx
import React from "react";
import { useFormContext } from "react-hook-form";

const vehicleTypes = [
  "Bus",
  "Car",
  "Coach",
  "Heavy Goods Vehicle",
  "Minibus",
  "Motorcycle",
  "Van",
];

const Step2_Type = ({ onNext, onBack }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();
  const onSubmit = () => onNext();

  return (
    <div className="px-10 py-6">
      <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800">
        What is your vehicle type?
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="custom-radio-group space-y-3 max-w-sm mx-auto text-left">
          {vehicleTypes.map((type) => (
            <label
              key={type}
              className="flex items-center text-gray-700 cursor-pointer"
            >
              <input
                type="radio"
                value={type}
                {...register("vehicleType", {
                  required: "Vehicle Type is required",
                })}
              />
              {type}
            </label>
          ))}
        </div>

        <div className="flex justify-between mt-10 max-w-sm mx-auto">
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
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step2_Type;
