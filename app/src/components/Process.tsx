"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

const Process = () => {
  const [regNumber, setRegNumber] = useState("LO26 CAZ");
  const router = useRouter();

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regNumber.trim()) return;
    router.push(`/MultistepForm?registrationNumber=${encodeURIComponent(regNumber.toUpperCase())}`);
  };

  return (
    <section id="process" className="py-20 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Side: Step checklist */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-xs font-bold tracking-widest text-[#007cc2] uppercase block mb-3">
                Process
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0c2340] mb-4">
                Three taps. Done.
              </h2>
              <p className="text-gray-500 font-medium text-lg">
                Built around a phone-first journey.
              </p>
            </div>

            <div className="space-y-4">
              {/* Step 1 */}
              <div className="flex items-center gap-6 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#007cc2] flex items-center justify-center text-white font-bold text-lg shrink-0">
                  01
                </div>
                <div>
                  <h4 className="font-extrabold text-[#0c2340] text-lg mb-1">
                    Enter your reg
                  </h4>
                  <p className="text-gray-500 text-sm font-medium">
                    Tap in the plate of the vehicle that crossed a charging zone.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-center gap-6 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl border-2 border-[#139ec9]/30 text-[#139ec9] flex items-center justify-center font-bold text-lg shrink-0">
                  02
                </div>
                <div>
                  <h4 className="font-extrabold text-[#0c2340] text-lg mb-1">
                    Pick your dates
                  </h4>
                  <p className="text-gray-500 text-sm font-medium">
                    Choose every day your trip touched a Clean Air Zone.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-center gap-6 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl border-2 border-[#139ec9]/30 text-[#139ec9] flex items-center justify-center font-bold text-lg shrink-0">
                  03
                </div>
                <div>
                  <h4 className="font-extrabold text-[#0c2340] text-lg mb-1">
                    Pay & relax
                  </h4>
                  <p className="text-gray-500 text-sm font-medium">
                    Settle the daily fee in seconds and avoid a PCN.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Phone Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            {/* Phone Bezel */}
            <div className="w-[310px] h-[610px] bg-[#0c2340] rounded-[45px] p-3 shadow-2xl relative border-4 border-gray-800 ring-8 ring-gray-700/10">
              {/* Speaker Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-20 flex items-center justify-center">
                <div className="w-12 h-1 bg-gray-800 rounded-full mb-1.5" />
              </div>

              {/* Screen Content Container */}
              <div className="w-full h-full bg-white rounded-[35px] overflow-hidden flex flex-col justify-between p-6 pt-10 relative select-none">
                {/* Simulated status bar */}
                <div className="flex justify-between items-center text-[10px] font-bold text-gray-500 absolute top-3 left-6 right-6">
                  <span>17:33</span>
                  <div className="flex items-center gap-1">
                    <span>5G</span>
                    <span className="w-4 h-2 bg-gray-400 rounded-sm inline-block" />
                  </div>
                </div>

                {/* Main Mockup Form */}
                <form onSubmit={handleVerify} className="flex-1 flex flex-col justify-between mt-4">
                  <div className="text-center space-y-6">
                    {/* Header */}
                    <div className="text-sm font-black text-[#007cc2]">
                      CleanCityAir
                    </div>

                    <h3 className="text-base font-extrabold text-[#0c2340]">
                      Quick Compliance Check
                    </h3>

                    {/* Interactive Yellow License Plate */}
                    <div className="relative inline-block mx-auto max-w-[240px] shadow-md rounded-lg overflow-hidden border border-gray-400">
                      <div className="flex items-stretch bg-[#f7d117] h-14">
                        {/* Blue GB side banner */}
                        <div className="bg-[#002f6c] w-6 flex flex-col justify-between items-center py-2 text-white text-[8px] font-bold select-none leading-none shrink-0">
                          <span className="text-[#f7d117]">★</span>
                          <span>GB</span>
                        </div>
                        {/* Input field */}
                        <input
                          type="text"
                          value={regNumber}
                          onChange={(e) => setRegNumber(e.target.value.toUpperCase())}
                          className="w-full bg-transparent border-none outline-none font-sans font-black text-center text-[#111] text-2xl uppercase tracking-wider px-2 placeholder:text-black/30"
                          maxLength={8}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button & Subtext */}
                  <div className="space-y-3">
                    <button
                      type="submit"
                      className="w-full bg-[#004f7c] hover:bg-[#00395a] text-white py-3.5 rounded-xl text-sm font-bold shadow-md transition-colors flex items-center justify-center gap-2 group"
                    >
                      Verify & Continue
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </button>

                    <p className="text-[10px] text-gray-400 font-semibold text-center leading-relaxed">
                      Daily fee matches vehicle type automatically
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
