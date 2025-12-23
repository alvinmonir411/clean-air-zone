// components/formSteps/Step1_Vehicle.jsx
import React from "react";
import { useFormContext } from "react-hook-form";

const Step1_Vehicle = ({ onNext }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();
  const onSubmit = () => onNext();

  return (
    <div className="px-10 py-6">
      <h2 className="text-2xl font-semibold text-center mb-10 text-gray-800">
        Enter the vehicle registration (number plate)
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6 max-w-sm mx-auto text-left">
          <label
            htmlFor="registrationNumber"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Registration Number
          </label>
          <input
            type="text"
            id="registrationNumber"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#00b875] focus:border-[#00b875] transition"
            {...register("registrationNumber", {
              required: "Registration Number is required",
            })}
          />

          <small className="text-gray-500 mt-1 block">
            Don't confuse "I" and "0" for "1" and "0"
          </small>
        </div>

        <div className="mb-6 max-w-sm mx-auto text-left">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Where is this vehicle registered?
          </label>
          <div className="custom-radio-group space-y-3">
            <label className="flex items-center text-gray-700 cursor-pointer">
              <input
                type="radio"
                value="UK"
                {...register("registrationLocation", { required: true })}
                defaultChecked
              />
              UK
            </label>
            <label className="flex items-center text-gray-700 cursor-pointer">
              <input
                type="radio"
                value="Non-UK"
                {...register("registrationLocation")}
              />
              Non-UK
            </label>
          </div>
        </div>

        <div className="flex justify-between mt-10 max-w-sm mx-auto">
          {/* Back button hidden on first step */}
          <div className="w-1/2"></div>
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

export default Step1_Vehicle;
