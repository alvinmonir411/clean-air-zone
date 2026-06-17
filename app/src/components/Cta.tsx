"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Cta = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0c314b] via-[#02182b] to-[#0b3558] rounded-[2rem] p-12 text-center relative overflow-hidden shadow-xl shadow-brand-navy/10">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-brand-cyan/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Ready to start?
            </h2>
            <p className="text-white/75 font-semibold max-w-md mx-auto text-sm sm:text-base">
              Skip the queue and register your vehicle right now.
            </p>
            <div className="pt-4 flex justify-center">
              <Link
                href="/MultistepForm"
                className="bg-[#00c076] hover:bg-[#00d884] text-white font-bold px-8 py-4 rounded-full transition duration-300 shadow-lg shadow-[#00c076]/25 flex items-center justify-center gap-2 group"
              >
                Get Started
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
