"use client";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="bg-brand-bg-light/40 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Banner Block */}
        <div className="bg-gradient-to-br from-[#0c314b] via-[#02182b] to-[#128aae] rounded-[2rem] p-8 md:p-16 relative overflow-hidden shadow-2xl shadow-brand-navy/15 flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Angled lines decoration */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-15 pointer-events-none hidden md:block">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <pattern
                  id="grid"
                  width="10"
                  height="10"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 10 0 L 0 0 0 10"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>

          <div className="max-w-2xl relative z-10 text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold uppercase tracking-wider mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
              UK Clean Air Zones
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.1] mb-6">
              UK{" "}
              <span className="bg-[#149ec9] text-white px-4 py-1 rounded-2xl inline-block align-middle transform -rotate-1 shadow-md">
                Clean Air
              </span>
              <br />
              online.
            </h1>

            {/* Description */}
            <p className="text-lg text-white/80 font-medium leading-relaxed max-w-xl mb-8">
              The fastest way to settle a UK Clean Air Zone daily fee - no apps,
              no paperwork, no wasted time.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/MultistepForm"
                className="bg-[#00c076] hover:bg-[#00d884] text-white font-bold px-8 py-4 rounded-full transition duration-300 shadow-lg shadow-[#00c076]/25 flex items-center justify-center gap-2 group"
              >
                Get Started
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="#coverage"
                className="border border-white/30 hover:border-white/80 hover:bg-white/5 text-white text-center font-semibold px-8 py-4 rounded-full transition duration-300"
              >
                Check zones
              </a>
            </div>

            {/* Bullet points */}
            <div className="flex items-center gap-2 text-white/75 text-xs sm:text-sm mt-8">
              <ShieldCheck className="w-4 h-4 text-[#00c076]" />
              <span className="font-medium">
                Service fee | Secure payment | Instant receipt
              </span>
            </div>
          </div>

          {/* Grid visual element */}
          <div className="w-full md:w-[320px] h-[180px] border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm relative overflow-hidden hidden lg:block self-center mr-8">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 to-white/10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full opacity-20 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]" />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100/80 shadow-sm flex flex-col justify-center gap-2">
            <span className="text-4xl font-extrabold text-[#0c2340]">7</span>
            <span className="text-sm font-medium text-gray-500">
              UK zones covered
            </span>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100/80 shadow-sm flex flex-col justify-center gap-2">
            <span className="text-4xl font-extrabold text-[#0c2340]">24/7</span>
            <span className="text-sm font-medium text-gray-500">
              Online payment access
            </span>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100/80 shadow-sm flex flex-col justify-center gap-2">
            <span className="text-4xl font-extrabold text-[#0c2340]">
              Instant
            </span>
            <span className="text-sm font-medium text-gray-500">
              Receipt after checkout
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
