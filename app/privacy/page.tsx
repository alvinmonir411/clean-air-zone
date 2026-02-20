"use client";
import React from "react";

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "Overview",
      content:
        "This document outlines the privacy practices for londonmission.co.uk. It details the types of data we gather and how that data is utilized when you interact with our platform. By accessing our services, you consent to the practices described herein. We are committed to protecting your information and will only use it in accordance with this policy.",
    },
    {
      title: "Data Collection",
      content:
        "We may acquire the following categories of information:\n\n- Contact details, such as your email address.\n- Data regarding your vehicle (registration number) for processing payments.\n- Data regarding your usage of our website.\n- Information pertinent to customer support inquiries.",
    },
    {
      title: "Utilization of Information",
      content:
        "The data we collect is vital for understanding your needs and enhancing our service offerings. Specifically, we use this data to:\n\n- Process payments for Clean Air Zones.\n- Maintain accurate internal records.\n- Refine and improve our products and services.\n- Address specific inquiries you may have.",
    },
    {
      title: "Children's Privacy",
      content:
        "londonmission.co.uk does not knowingly collect data from individuals under the age of 16. By using our services, you confirm that you are at least 16 years old.",
    },
  ];

  return (
    <section className="py-24 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#057a55] mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-400 text-sm mb-4">
            Last Updated: 06 Aug 2024
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {sections.map((section, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300"
            >
              <h2 className="text-2xl font-bold text-[#057a55] mb-4">
                {section.title}
              </h2>
              <p className="text-gray-700 whitespace-pre-line">{section.content}</p>
            </div>
          ))}

          {/* Footer */}
          <div className="text-center text-gray-500 mt-12 text-sm">
            &copy; 2025 UQP™. All Rights Reserved.
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
