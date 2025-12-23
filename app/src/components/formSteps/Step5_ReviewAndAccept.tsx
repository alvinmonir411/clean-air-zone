// components/formSteps/Step5_ReviewAndAccept.jsx
import React from "react";
import { useFormContext } from "react-hook-form";

const Step5_ReviewAndAccept = ({ onNext, onBack, formData }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();
  const totalAmount = 14.0;

  const onSubmit = () => {
    // Submit button here acts as 'Next' to go to payment step (Step 6)
    onNext();
  };

  return (
    <div className="px-10 py-6">
      <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800">
        Review your information
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto">
        <div className="mb-6 text-left">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#00b875] focus:border-[#00b875] transition"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
          />
          {/* {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )} */}
        </div>

        <div className="p-4 bg-gray-50 border border-red-200 rounded-lg mb-6 text-center text-red-700 italic">
          Cannot find vehicle details at this time. Please proceed with payment.
        </div>

        <div className="mb-6 text-left">
          <label className="flex items-center text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 text-[#00b875] border-gray-300 rounded focus:ring-[#00b875] mr-3"
              {...register("acceptTerms", {
                required: "You must accept the Terms and Conditions",
              })}
            />
            I accept the{" "}
            <a
              href="#"
              className="ml-1 text-blue-600 hover:text-blue-800 underline"
            >
              Terms and Conditions
            </a>
          </label>
          {/* {errors.acceptTerms && (
            <p className="mt-1 text-sm text-red-600">
              {errors.acceptTerms.message}
            </p>
          )} */}
        </div>

        <div className="text-right text-xl font-bold text-gray-800 mb-6">
          Total: £{totalAmount.toFixed(2)}
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

export default Step5_ReviewAndAccept;
