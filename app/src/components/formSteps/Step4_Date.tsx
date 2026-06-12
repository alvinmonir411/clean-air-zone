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
  format,
  addMonths,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

// Get zone rates helper
const getZoneRate = (zoneName: string): number => {
  switch (zoneName) {
    case "Birmingham":
      return 8;
    case "Bath":
    case "Bradford":
    case "Bristol":
      return 9;
    case "Portsmouth":
    case "Sheffield":
      return 10;
    case "Tyneside":
      return 12.5;
    default:
      return 14;
  }
};

const generateCalendarDays = (currentDate: Date) => {
  const startM = startOfMonth(currentDate);
  const endM = endOfMonth(currentDate);
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

interface Step4Props {
  onNext: () => void;
  onBack: () => void;
}

const MAX_DATES = 30;

const Step4_Date: React.FC<Step4Props> = ({ onNext, onBack }) => {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
  } = useFormContext();

  const selectedDates: string[] = watch("selectedDates") || [];
  const cleanAirZone: string = watch("cleanAirZone") || "Bath";

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const calendarDays = useMemo(
    () => generateCalendarDays(currentMonth),
    [currentMonth]
  );

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const toggleDate = useCallback(
    (date: Date) => {
      const dateString = format(date, "dd-MM-yyyy");
      const isSelected = selectedDates.includes(dateString);

      if (isSelected) {
        setValue(
          "selectedDates",
          selectedDates.filter((d) => d !== dateString),
          { shouldValidate: true }
        );
      } else if (selectedDates.length < MAX_DATES) {
        setValue("selectedDates", [...selectedDates, dateString].sort(), {
          shouldValidate: true,
        });
      }
    },
    [selectedDates, setValue]
  );

  const zoneRate = getZoneRate(cleanAirZone);
  const subtotal = selectedDates.length * zoneRate;

  return (
    <div className="px-6 sm:px-12 py-8 space-y-6">
      {/* Step Header */}
      <div>
        <h2 className="text-3xl font-black text-[#0c2340]">Select Travel Dates</h2>
        <p className="text-gray-500 font-medium text-sm mt-1">
          Choose every day your trip touched the zone
        </p>
      </div>

      <form onSubmit={handleSubmit(onNext)} className="space-y-6">
        {/* Calendar Box */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-extrabold text-[#0c2340]">
              {format(currentMonth, "MMMM yyyy")}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={prevMonth}
                className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-50 rounded-full transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextMonth}
                className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-50 rounded-full transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Week labels */}
          <div className="grid grid-cols-7 text-center text-xs font-black text-gray-400 mb-4 uppercase tracking-wider">
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
            <div>S</div>
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-y-2 text-center">
            {calendarDays.map((day, index) => {
              const dateString = format(day, "dd-MM-yyyy");
              const isSelected = selectedDates.includes(dateString);
              const isCurrentMonth = isSameMonth(day, currentMonth);

              if (!isCurrentMonth) {
                return <div key={index} className="py-2.5" />;
              }

              return (
                <div key={index} className="flex justify-center py-1">
                  <button
                    type="button"
                    onClick={() => toggleDate(day)}
                    className={`w-9 h-9 rounded-full text-sm font-extrabold flex items-center justify-center transition-all ${
                      isSelected
                        ? "bg-brand-cyan text-white shadow-md shadow-brand-cyan/20"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {format(day, "d")}
                  </button>
                </div>
              );
            })}
          </div>

          <input
            type="hidden"
            {...register("selectedDates", {
              validate: (v: string[]) =>
                v.length > 0 || "Please select at least one date",
            })}
          />
        </div>

        {/* Rate Summary Card */}
        <div className="bg-[#f0f9ff]/30 border border-gray-100 rounded-2xl p-5 space-y-2 text-sm text-gray-500 font-semibold">
          <div className="flex justify-between">
            <span>Tariff rate:</span>
            <span className="text-[#0c2340] font-bold">£{zoneRate.toFixed(2)} / day</span>
          </div>
          <div className="flex justify-between">
            <span>Selected dates:</span>
            <span className="text-[#0c2340] font-bold">{selectedDates.length} Days</span>
          </div>
          <div className="flex justify-between border-t border-dashed border-gray-200/50 pt-2 text-base">
            <span>Subtotal:</span>
            <span className="text-brand-cyan font-black">£{subtotal.toFixed(2)}</span>
          </div>
        </div>

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
            disabled={selectedDates.length === 0}
            className={`px-8 py-3.5 rounded-xl font-bold text-sm transition flex items-center gap-1.5 shadow-md ${
              selectedDates.length === 0
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

export default Step4_Date;
