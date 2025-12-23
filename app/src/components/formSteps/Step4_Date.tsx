// components/formSteps/Step4_Date.jsx
import React from "react";
import { useFormContext } from "react-hook-form";

const Step4_Date = ({ onNext, onBack }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();
  const onSubmit = () => onNext();

  return (
    <div className="px-10 py-6">
      <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800">
        Select the date you need to pay for
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6 max-w-sm mx-auto text-left">
          <label
            htmlFor="paymentDate"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Date of Payment
          </label>
          <input
            type="date"
            id="paymentDate"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#00b875] focus:border-[#00b875] transition"
            {...register("paymentDate", { required: "Date is required" })}
          />
          {/* {errors.paymentDate && (
            <p className="mt-1 text-sm text-red-600">
              {errors.paymentDate.message}
            </p>
          )} */}
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

export default Step4_Date;
