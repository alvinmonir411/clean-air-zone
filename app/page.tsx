"use client";

import dynamic from "next/dynamic";
import Hero from "./src/components/Hero";
import Compliance from "./src/components/Compliance";

// 👇 THIS IS NON-NEGOTIABLE
const ZonesMap = dynamic(() => import("./src/components/ZoneMaps"), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <Hero />
      <ZonesMap />

      {/* Moved from Hero */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            To combat increasing vehicle emissions and air pollution throughout
            the UK, a daily fee for non-compliant vehicles has been implemented
            in several cities.
          </p>
        </div>
      </section>
      <Compliance />
    </div>
  );
}
