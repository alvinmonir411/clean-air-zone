"use client";

import React, { useState, useMemo, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  format,
  addMonths,
  subMonths,
} from "date-fns";

// --- Helper function for Calendar Grid ---
/**
 * Generates an array of Date objects representing the days in the calendar grid
 * for the currently displayed month.
 */
const generateCalendarDays = (currentDate: Date) => {
  const startM = startOfMonth(currentDate);
  const endM = endOfMonth(currentDate);

  // Start week on Monday
  const startW = startOfWeek(startM, { weekStartsOn: 1 });
  const endW = endOfWeek(endM, { weekStartsOn: 1 });

  const days: Date[] = [];
  let day = startW;

  while (day <= endW) {
    days.push(day);
    day = addDays(day, 1);
  }

  return days;
};

// --- Component Interface & Constants ---
interface Step4Props {
  onNext: () => void;
  onBack: () => void;
}

const MAX_DATES = 100;

// --- Step 4 Component ---
const Step4_Date: React.FC<Step4Props> = ({ onNext, onBack }) => {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const selectedDates: string[] = watch("selectedDates") || [];

  // State for controlling which month is currently viewed in the calendar
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const today = useMemo(() => new Date(), []);

  const calendarDays = useMemo(
    () => generateCalendarDays(currentMonth),
    [currentMonth]
  );

  // Handlers for month navigation
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  // Centralized date selection logic
  const toggleDate = useCallback(
    (date: Date) => {
      // Format the date to the YYYY-MM-DD string used in the form
      const dateString = format(date, "yyyy-MM-dd");

      const isSelected = selectedDates.includes(dateString);

      if (isSelected) {
        // Remove date
        setValue(
          "selectedDates",
          selectedDates.filter((d) => d !== dateString),
          { shouldValidate: true }
        );
      } else if (selectedDates.length < MAX_DATES) {
        // Add date and sort for consistency
        setValue("selectedDates", [...selectedDates, dateString].sort(), {
          shouldValidate: true,
        });
      }
    },
    [selectedDates, setValue]
  );

  // Calendar header with month and navigation
  const renderHeader = () => (
    <div className="flex justify-between items-center mb-4">
      <button
        type="button"
        onClick={prevMonth}
        className="text-gray-600 p-2 hover:bg-gray-100 rounded-full disabled:opacity-30"
        // Disable if the current month is the actual current month (preventing selection of past months)
        disabled={isSameMonth(currentMonth, today)}
      >
        &lt;
      </button>
      <span className="text-xl font-semibold">
        {format(currentMonth, "MMMM yyyy")}
      </span>
      <button
        type="button"
        onClick={nextMonth}
        className="text-white p-2 bg-green-600 hover:bg-green-700 rounded-full"
        // Applying the requested green background color here
      >
        &gt;
      </button>
    </div>
  );

  // Weekday labels
  const renderDaysOfWeek = () => {
    const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return (
      <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-500 mb-2">
        {dayNames.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
    );
  };

  // Calendar grid
  const renderCells = () => (
    <div className="grid grid-cols-7 gap-1">
      {calendarDays.map((day, index) => {
        const dateString = format(day, "yyyy-MM-dd");
        const isSelected = selectedDates.includes(dateString);
        // Date is in the past, but only if it's not the current day
        const isPast = day < today && !isSameDay(day, today);
        const isCurrentMonth = isSameMonth(day, currentMonth);

        // Base styles
        let classes = `p-3 text-center rounded-lg transition-colors text-lg font-medium select-none`;

        // Apply styles based on state
        if (!isCurrentMonth) {
          classes += " text-gray-300 pointer-events-none"; // Dates outside current month
        } else if (isPast) {
          classes += " text-gray-400 cursor-not-allowed"; // Past dates in current month
        } else if (isSelected) {
          classes +=
            " bg-[#00b875] text-white shadow-md cursor-pointer hover:bg-[#009b61]"; // Selected date (Primary Green)
        } else if (selectedDates.length >= MAX_DATES) {
          classes += " bg-white text-gray-800 opacity-60 cursor-not-allowed"; // Available but max reached
        } else {
          classes += " bg-white hover:bg-gray-100 text-gray-800 cursor-pointer"; // Available for selection
        }

        const isDisabled =
          isPast ||
          !isCurrentMonth ||
          (selectedDates.length >= MAX_DATES && !isSelected);

        return (
          <div
            key={index}
            className={classes}
            onClick={() => !isDisabled && toggleDate(day)}
          >
            {format(day, "d")}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="max-w-xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-semibold text-center mb-2">
        Select Payment Dates
      </h2>

      <p className="text-center text-gray-500 mb-8">
        Click on dates in the calendar. You can choose up to **{MAX_DATES}**
        dates.
      </p>

      <form onSubmit={handleSubmit(onNext)}>
        {/* Calendar Picker UI */}
        <div className="mb-8 border p-4 rounded-xl shadow-lg bg-white">
          {renderHeader()}
          {renderDaysOfWeek()}
          {renderCells()}

          <input
            type="hidden"
            {...register("selectedDates", {
              validate: (v: string[]) =>
                v.length > 0 || "Please select at least one date",
            })}
          />
        </div>

        {errors.selectedDates && (
          <p className="text-red-600 mt-2 text-center mb-6">
            {errors.selectedDates.message as string}
          </p>
        )}

        {/* Selected Dates Display (Tags/Pills) */}
        {selectedDates.length > 0 && (
          <div className="mb-8 p-4 bg-gray-50 rounded-xl">
            <p className="mb-3 text-gray-700 font-semibold">
              Selected Dates ({selectedDates.length}/{MAX_DATES})
            </p>

            <div className="flex flex-wrap gap-3">
              {selectedDates.map((date) => (
                <div
                  key={date}
                  className="flex items-center bg-[#e6fff2] text-[#00b875] border border-[#00b875] rounded-full px-4 py-2 font-medium text-sm"
                >
                  <span className="mr-2">{date}</span>
                  <button
                    type="button"
                    onClick={() => toggleDate(new Date(date))}
                    className="ml-1 text-[#00b875] hover:text-[#008f5a] font-bold"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={onBack}
            className="w-full py-4 border border-gray-300 rounded-xl text-lg hover:bg-gray-50"
          >
            Back
          </button>

          <button
            type="submit"
            className="w-full py-4 bg-[#00b875] text-white text-lg font-semibold rounded-xl disabled:opacity-50 hover:bg-[#009b61]"
            disabled={selectedDates.length === 0}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step4_Date;
