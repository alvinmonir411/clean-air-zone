import React from "react";
import { Metadata } from "next";
import PrivacyClient from "./PrivacyClient";

export const metadata: Metadata = {
  title: "Privacy Notice | CleanCityAir",
  description: "Read the CleanCityAir Privacy Notice. Understand how we check compliance live without storing number plates or sharing private data.",
  keywords: ["Privacy Notice", "Clean Air Zone privacy", "data protection", "CleanCityAir privacy policy"],
  openGraph: {
    title: "Privacy Notice | CleanCityAir",
    description: "Read the CleanCityAir Privacy Notice. Understand how we check compliance live without storing number plates or sharing private data.",
    type: "website",
  },
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
