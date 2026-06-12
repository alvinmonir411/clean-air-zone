// components/formSteps/Step3_Location.jsx
import React from "react";
import { useFormContext } from "react-hook-form";
import { ArrowRight } from "lucide-react";

const zoneOptions = [
  { name: "Bath", fee: "£9.00 / day", value: "Bath" },
  { name: "Birmingham", fee: "£8.00 / day", value: "Birmingham" },
  { name: "Bradford", fee: "£9.00 / day", value: "Bradford" },
  { name: "Bristol", fee: "£9.00 / day", value: "Bristol" },
  { name: "Portsmouth", fee: "£10.00 / day", value: "Portsmouth" },
  { name: "Sheffield", fee: "£10.00 / day", value: "Sheffield" },
  { name: "Tyneside", fee: "£12.50 / day", value: "Tyneside" },
];

const Step3_Location = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
  } = useFormContext();

  const selectedZone = watch("cleanAirZone");
  const onSubmit = () => onNext();

  const handleSelect = (val: string) => {
    setValue("cleanAirZone", val, { shouldValidate: true });
  };

  return (
    <div className="px-6 sm:px-12 py-8 space-y-8">
      {/* Step Header */}
      <div>
        <h2 className="text-3xl font-black text-[#0c2340]">Select Charging Zone</h2>
        <p className="text-gray-500 font-medium text-sm mt-1">
          Choose the city or area you drove through
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Scrollable grid list */}
        <div className="max-h-[300px] overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 gap-4 scrollbar-thin scrollbar-thumb-gray-200">
          {zoneOptions.map((zone) => {
            const isSelected = selectedZone === zone.value;
            return (
              <div
                key={zone.value}
                onClick={() => handleSelect(zone.value)}
                className={`p-5 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border-brand-cyan bg-[#f0f9ff]/50 shadow-sm"
                    : "border-gray-100 hover:border-gray-200 bg-white"
                }`}
              >
                <h4 className="text-base font-extrabold text-[#0c2340] mb-1">
                  {zone.name}
                </h4>
                <p className="text-xs font-semibold text-gray-400">
                  {zone.fee}
                </p>
              </div>
            );
          })}
        </div>

        {/* Hidden Input for hook form validation */}
        <input
          type="hidden"
          {...register("cleanAirZone", { required: "Charging zone is required" })}
        />

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
            disabled={!selectedZone}
            className={`px-8 py-3.5 rounded-xl font-bold text-sm transition flex items-center gap-1.5 shadow-md ${
              !selectedZone
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

export default Step3_Location;
