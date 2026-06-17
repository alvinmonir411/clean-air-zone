"use client";
import React from "react";
import { Smartphone, Clock, ShieldCheck, CheckCircle2 } from "lucide-react";

const benefits = [
  {
    title: "Phone-first journey",
    description: "Every screen is sized for your thumb — no pinch-zooming.",
    icon: Smartphone,
    colorClass: "bg-sky-50 text-[#007cc2] border-sky-100",
  },
  {
    title: "Under 60 seconds",
    description: "Plate, dates, confirm. The whole flow takes less than a minute.",
    icon: Clock,
    colorClass: "bg-amber-50 text-amber-600 border-amber-100",
  },
  {
    title: "PCN protection",
    description: "Register the daily entry in time and dodge a penalty.",
    icon: ShieldCheck,
    colorClass: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
  {
    title: "Live UK coverage",
    description: "Every active charging city in the United Kingdom.",
    icon: CheckCircle2,
    colorClass: "bg-purple-50 text-purple-600 border-purple-100",
  },
];

const Benefits = () => {
  return (
    <section id="highlights" className="py-20 bg-brand-bg-light/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-[#007cc2] uppercase block mb-3">
            Benefits
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0c2340] mb-4">
            Why drivers choose us
          </h2>
          <p className="text-gray-500 font-medium">
            Our service is designed to be the simplest, fastest, and most secure
            way to register for Clean Air Zones in the UK.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-start"
              >
                {/* Icon Container */}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${b.colorClass} mb-6 shrink-0`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                {/* Text Content */}
                <h3 className="text-lg font-extrabold text-[#0c2340] mb-3">
                  {b.title}
                </h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">
                  {b.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
