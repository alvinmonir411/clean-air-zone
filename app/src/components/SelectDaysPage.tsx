"use client";

import { useState } from "react";

export default function SelectDaysPage() {
  const dates = generateDates(12);

  const [selectedDates, setSelectedDates] = useState<string[]>([]);

  const toggleDate = (date: string) => {
    setSelectedDates((prev) =>
      prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date]
    );
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Which days do you want to pay for?
      </h1>

      <div className="space-y-3">
        {dates.map((date, index) => {
          const formatted = formatDate(date);
          const label =
            index === 0 ? " (Today)" : index === 1 ? " (Tomorrow)" : "";

          return (
            <label
              key={formatted}
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedDates.includes(formatted)}
                onChange={() => toggleDate(formatted)}
                className="h-5 w-5"
              />
              <span>
                {formatted}
                {label}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- helpers ---------- */

function generateDates(days: number) {
  const dates = [];

  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    dates.push(date);
  }

  return dates;
}

function formatDate(date: Date) {
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();

  return `${d}-${m}-${y}`;
}
