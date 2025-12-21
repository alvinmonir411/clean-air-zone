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
      <Compliance />
    </div>
  );
}
