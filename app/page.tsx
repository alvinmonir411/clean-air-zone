"use client";

import dynamic from "next/dynamic";
import Hero from "./src/components/Hero";
import Process from "./src/components/Process";
import Benefits from "./src/components/Benefits";
import Cta from "./src/components/Cta";

// Dynamically import Coverage since it contains Leaflet map and depends on the browser environment
const Coverage = dynamic(() => import("./src/components/Coverage"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="bg-white min-h-screen text-gray-900">
      <Hero />
      <Coverage />
      <Process />
      <Benefits />
      <Cta />
    </div>
  );
}
