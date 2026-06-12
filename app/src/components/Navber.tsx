"use client";
import Link from "next/link";
import { Wind } from "lucide-react";

const Navber = () => (
  <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100/50 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#007cc2] flex items-center justify-center text-white shadow-md shadow-[#007cc2]/20 transition group-hover:scale-105">
            <Wind className="w-6 h-6" />
          </div>
          <span className="text-xl font-black text-[#0c2340] tracking-tight">
            CleanCityAir
          </span>
        </Link>

        {/* Center Pill Menu */}
        <nav className="hidden md:flex items-center">
          <div className="bg-white border border-gray-200/80 rounded-full px-8 py-2 shadow-sm flex items-center gap-8">
            <a
              href="#coverage"
              className="text-[#0c2340] font-semibold text-sm hover:text-brand-green transition duration-300"
            >
              Zones
            </a>
            <a
              href="#highlights"
              className="text-[#0c2340] font-semibold text-sm hover:text-brand-green transition duration-300"
            >
              Highlights
            </a>
            <a
              href="#process"
              className="text-[#0c2340] font-semibold text-sm hover:text-brand-green transition duration-300"
            >
              Coverage
            </a>
          </div>
        </nav>

        {/* Right Button */}
        <div className="flex items-center">
          <Link
            href="/MultistepForm"
            className="bg-brand-green hover:bg-brand-green-hover text-white font-bold text-sm px-6 py-2.5 rounded-full transition duration-300 shadow-md shadow-brand-green/20"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  </header>
);

export default Navber;
