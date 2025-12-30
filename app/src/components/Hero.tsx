"use client";
import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/heroBg.jpg"
          alt="Clean green city aerial view"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#057a55] opacity-80" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 rounded-full bg-white/10 blur-xl animate-float" />
      <div
        className="absolute bottom-1/3 right-20 w-32 h-32 rounded-full bg-white/10 blur-2xl animate-float"
        style={{ animationDelay: "2s" }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-soft" />
            UK Clean Air Zone Information Hub
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            Breathe Easier with
            <br />
            <span className="text-primary-green">Cleaner Air</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10">
            To combat increasing vehicle emissions and air pollution throughout
            the UK, a daily fee for non-compliant vehicles has been implemented
            in several cities.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/MultistepForm"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white text-[#057a55] font-bold text-lg hover:bg-gray-200 transition shadow-xl"
            >
              Start Now
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="#zones"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-white text-white font-medium text-lg hover:bg-white/10 transition"
            >
              <MapPin className="w-5 h-5" />
              View Zones
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-16 max-w-lg mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">6+</div>
              <div className="text-sm text-white/60">Active Zones</div>
            </div>
            <div className="text-center border-x border-white/20">
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-sm text-white/60">Monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">100%</div>
              <div className="text-sm text-white/60">Free Info</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-white/60" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
