"use client";
import React from "react";

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "Overview",
      content:
        "This document outlines the privacy practices for https://greenerair.co.uk. It details the types of data we gather and how that data is utilized when you interact with our platform. By accessing our services, you consent to the practices described herein. We are committed to protecting your information and will only use it in accordance with this policy.",
    },
    {
      title: "Data Collection",
      content:
        "We may acquire the following categories of information:\n\n- Contact details, such as your email address.\n- Data regarding your usage of our website.\n- Information pertinent to customer support inquiries.\n- Responses to surveys or promotional offers.",
    },
    {
      title: "Analytics",
      content:
        "We utilize Google Analytics to monitor standard internet log data and visitor behavior patterns. This data is processed anonymously and does not personally identify any individual. We do not attempt to uncover the identities of our site visitors. Any collection of personally identifiable data will be clearly communicated, along with our intended use for it.",
    },
    {
      title: "Cookie Usage",
      content:
        "To improve your browsing experience, https://greenerair.co.uk employs cookies. For a comprehensive breakdown of our cookie usage, please refer to our dedicated Cookies Policy.",
    },
    {
      title: "Utilization of Information",
      content:
        "The data we collect is vital for understanding your needs and enhancing our service offerings. Specifically, we use this data to:\n\n- Maintain accurate internal records.\n- Refine and improve our products and services.\n- Address specific inquiries you may have.\n- Tailor the website experience to your preferences.",
    },
    {
      title: "Marketing Preferences",
      content:
        "You have control over your personal information. When providing details on our site, you may opt-in to:\n\n- Direct marketing communications from us (email, phone, text, or post).\n- Marketing communications from our third-party partners.\n\nIf you previously consented to marketing but wish to withdraw, simply email us at support@cazpayment.uk.",
    },
    {
      title: "Data Security",
      content:
        "We are dedicated to securing your data. Robust physical and electronic procedures are in place to safeguard your information against unauthorized access or disclosure.",
    },
    {
      title: "External Links",
      content:
        "Our site may link to external websites. Please be aware that we do not control these third-party sites. We are not responsible for the protection and privacy of any information you provide whilst visiting such sites, which are not governed by this privacy statement.",
    },
    {
      title: "Children's Privacy",
      content:
        "https://greenerair.co.uk does not knowingly collect data from individuals under the age of 16. By using our services, you confirm that you are at least 16 years old.",
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
          <p className="text-gray-700 text-lg">
            Last Updated: 01/02/2023
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
