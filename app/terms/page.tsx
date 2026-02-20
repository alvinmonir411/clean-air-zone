"use client";
import React from "react";

const TermsAndConditions = () => {
  const sections = [
    {
      title: "Service Description",
      content:
        "We provide a convenient online platform for paying and checking Low Emission Charges for an additional service charge. The total cost for vehicle checking and processing the payment if required is £14.00.\n\nOur services are available exclusively online through our website.",
    },
    {
      title: "Payment Methods",
      content: "We accept payments via Visa, Mastercard, Apple Pay and Google Pay.",
    },
    {
      title: "Data Privacy",
      content: "Please refer to our Privacy Policy section for details on how we handle your data.",
    },
    {
      title: "Refund Policy",
      content:
        "A full refund will be granted if requested before the service has been provided or is requested within 24 hours of the purchase. To request a refund, please contact our customer support via our contact page.",
    },
    {
      title: "Website Usage",
      content:
        "Our website is intended solely for the purpose of facilitating payments for Low emission zones in England. Unauthorized use is prohibited.\n\nOur site is designed for payment vehicles under 7.5 ton.",
    },
    {
      title: "Dispute Resolution",
      content:
        "For any disputes, please contact our customer support via email. We will respond within 24 hours.",
    },
    {
      title: "Error in Payments",
      content:
        "We are not liable for payments made in error, including incorrect payments or accidental transactions. We are not liable for any incorrect inputs by users for the following: registration numbers, vehicle type, date of travel.\n\nPayments made after the 6-day window of travel will be refunded. By using this service you are confirming that your vehicle is not exempt from the low emission charge at the time of travel and understand that transactions for exempt vehicles may not be refunded automatically. To check your vehicle please visit the official government website.",
    },
    {
      title: "Age Requirement",
      content: "Users of our service must be a minimum of 16 years old.",
    },
    {
      title: "Liability",
      content:
        "We assume no liability for the usage of our service, including but not limited to payment errors by anyone other than LONDONMISSION Ltd, service interruptions, or any losses incurred.\n\nLondonMission is liable for any fines that result from the correct usage of our site that are paid within the time window of 15 days before travel – current day – 6 days after date of travel.",
    },
    {
      title: "Fees",
      content:
        "LondonMission Ltd will charge a service fee of up to £5.00 per transaction for all vehicle types.",
    },
    {
      title: "City Specific Charges (Cars and Vans)",
      content:
        "- Bath: £14.00 per day inclusive of Clean Air Zone Payments service fee.\n- Birmingham: £12.50 per day inclusive of Clean Air Zone Payments service fee.\n- Bradford: £14.00 per day inclusive of Clean Air Zone Payments service fee.\n- Bristol: £14.00 per day inclusive of Clean Air Zone Payments service fee.\n\nFor HGV vehicles over 7.5 Tonnes, please visit the official gov.uk website.",
    },
    {
      title: "Exemptions",
      content:
        "Vehicles that meet the following emissions standards will not need to pay:\n- Euro 6 (VI) or better for diesel engines\n- Euro 4 or better for petrol engines\n- For diesel/petrol electric hybrids, the vehicle should meet the relevant emission standards.\n- Fully electric or hydrogen fuel cell-powered vehicles will not need to pay the charge.\n\nThere are also certain exceptions, including for some people who live or work in the Clean Air Zone, who may be able to apply for temporary exemption permits if certain criteria are met.",
    },
  ];

  return (
    <section className="py-24 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#057a55] mb-4">
            Terms & Conditions
          </h1>
          <p className="text-gray-400 text-sm mb-4">Last Updated: 06 Aug 2024</p>
          <p className="text-gray-700 text-lg">
            Terms and Conditions for Toll Charge Limited trading as
            londonmission.co.uk.
          </p>
          <p className="mt-4 text-gray-600">
            These terms and conditions outline the agreement between you (“Customer,” “User,” “You”) and [Toll Charge Limited] (“We,” “Us,” “Our”) regarding the use of our online payment service for Clean Air Zones, including any associated service charges. By using our website, you agree to abide by these terms and conditions.
          </p>
        </div>

        {/* Terms Sections */}
        <div className="space-y-12">
          {sections.map((section, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 shadow-md border border-gray-200"
            >
              <h2 className="text-2xl font-bold text-[#057a55] mb-4">
                {section.title}
              </h2>
              <p className="text-gray-700 whitespace-pre-line text-lg leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TermsAndConditions;
