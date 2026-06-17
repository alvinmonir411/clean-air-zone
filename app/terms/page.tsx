import React from "react";
import { Metadata } from "next";
import TermsClient from "./TermsClient";

export const metadata: Metadata = {
  title: "Terms of Service | CleanCityAir",
  description: "Read the CleanCityAir Terms of Service. Learn about our service fee, GOV.UK compliance, orders, and refund policies.",
  keywords: ["Terms of Service", "Clean Air Zone", "CAZ payment terms", "CleanCityAir terms"],
  openGraph: {
    title: "Terms of Service | CleanCityAir",
    description: "Read the CleanCityAir Terms of Service. Learn about our service fee, GOV.UK compliance, orders, and refund policies.",
    type: "website",
  },
};

export default function TermsPage() {
  return <TermsClient />;
}
