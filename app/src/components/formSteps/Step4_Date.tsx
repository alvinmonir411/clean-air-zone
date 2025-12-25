// components/formSteps/Step4_Date.tsx
"use client";

import { CalendarPlus, Trash2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";

// Define the component props (using 'any' as a quick fix, ideally define the types)
interface Step4Props {
  onNext: () => void;
  onBack: () => void;
}

// Maximum number of dates allowed
const MAX_DATES = 5;

const Step4_Date: React.FC<Step4Props> = ({ onNext, onBack }) => {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  // Watch the current value of 'selectedDates' from the form context
  const initialDates: string[] = watch("selectedDates") || [];
  const [selectedDates, setSelectedDates] = useState<string[]>(initialDates);
  const [newDate, setNewDate] = useState<string>("");

  // Update the react-hook-form state whenever local state changes
  useEffect(() => {
    // Register the field with the form context
    setValue("selectedDates", selectedDates, { shouldValidate: true });
  }, [selectedDates, setValue]);

  // --- Logic for Date Management ---

  const handleDateAdd = (date: string) => {
    if (!date) return;

    // 1. Check if max limit is reached
    if (selectedDates.length >= MAX_DATES) {
      alert(`You can only select a maximum of ${MAX_DATES} dates.`);
      return;
    }

    // 2. Check for duplicates and empty date
    if (selectedDates.includes(date)) {
      alert("This date has already been selected.");
      return;
    }

    // 3. Add the new date (keeping the array sorted is a good practice)
    setSelectedDates([...selectedDates, date].sort());
    setNewDate(""); // Clear the input field
  };

  const handleDateRemove = (dateToRemove: string) => {
    setSelectedDates(selectedDates.filter((date) => date !== dateToRemove));
  };

  const onSubmit = () => {
    // If validation fails (e.g., no dates selected), handleSubmit will stop here.
    onNext();
  };

  // Set today as the minimum selectable date
  const today = new Date().toISOString().substring(0, 10);

  return (
    <div className="px-10 py-6">
      <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800">
        Select the date(s) you need to pay for (Max {MAX_DATES})
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* --- 1. Date Input and Add Button --- */}
        <div className="mb-6 max-w-lg mx-auto text-left">
          <label
            htmlFor="newDateInput"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Add a Date
          </label>
          <div className="flex space-x-3">
            <input
              type="date"
              id="newDateInput"
              min={today} // Prevents selecting past dates
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-[#00b875] focus:border-[#00b875] transition"
              // No 'register' here, as we manage this input manually
            />
            <button
              type="button"
              onClick={() => handleDateAdd(newDate)}
              disabled={!newDate || selectedDates.length >= MAX_DATES}
              className="p-3 bg-[#00b875] text-white rounded-lg hover:bg-[#00995c] transition duration-200 disabled:opacity-50 flex items-center shadow-md"
            >
              <CalendarPlus /> Add
            </button>
          </div>

          {/* RHF Validation placeholder for the 'selectedDates' array */}
          <input
            type="hidden"
            {...register("selectedDates", {
              validate: (value: string[]) =>
                value.length > 0 || "At least one date must be selected.",
            })}
          />
          {errors.selectedDates && (
            <p className="mt-1 text-sm text-red-600">
              {errors.selectedDates.message as string}
            </p>
          )}
        </div>

        {/* --- 2. List of Selected Dates --- */}
        {selectedDates.length > 0 && (
          <div className="mb-8 max-w-lg mx-auto text-left border p-4 rounded-lg bg-gray-50 shadow-inner">
            <h3 className="font-semibold mb-3 text-gray-800">
              Selected Dates ({selectedDates.length} of {MAX_DATES})
            </h3>
            <ul className="space-y-2">
              {selectedDates.map((date) => (
                <li
                  key={date}
                  className="flex justify-between items-center bg-white p-3 rounded-md border border-gray-200"
                >
                  <span className="font-medium text-gray-700">{date}</span>
                  <button
                    type="button"
                    onClick={() => handleDateRemove(date)}
                    className="text-red-500 hover:text-red-700 transition"
                    aria-label={`Remove date ${date}`}
                  >
                    <Trash2 /> trush
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* --- 3. Navigation Buttons --- */}
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
