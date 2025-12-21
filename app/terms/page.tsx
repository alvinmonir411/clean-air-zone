"use client";
import React from "react";

const TermsAndConditions = () => {
  const sections = [
    {
      title: "Agreement to Terms",
      content:
        "These Terms govern the contract between you and us for the supply of services. They supersede any other terms you might seek to impose. This Contract constitutes the entire agreement, and you acknowledge that you have not relied on any other representations.",
    },
    {
      title: "Additional Policies",
      content:
        "Your use of our site is also subject to our Privacy Policy, which details how we handle your personal data and cookies.",
    },
    {
      title: "Changes to Terms & Website",
      content:
        "We reserve the right to modify these Terms at any time. Please check back regularly to stay informed. We may also update, suspend, or withdraw our Website without prior notice for operational reasons. We do not guarantee uninterrupted availability.",
    },
    {
      title: "Geographic Scope",
      content:
        "Our services are directed primarily at users in England. We make no representation that our content is appropriate for other locations.",
    },
    {
      title: "External Links",
      content:
        "Links to third-party sites are for information only and do not imply endorsement. We have no control over their content. You may link to our home page fairly and legally, but must not suggest any non-existent association. We may withdraw linking permission at any time.",
    },
    {
      title: "Disclaimer of Information",
      content:
        'Content on our site is provided "as is" without warranty. It does not constitute professional advice. We disclaim liability for any loss arising from reliance on our site\'s information, including inaccuracies or errors.',
    },
    {
      title: "Ordering Services",
      content:
        "Orders must be placed via the Website. Your order is an offer to buy services. A contract is formed only when we send an email accepting your order. If we cannot fulfill your order, we will notify you and refund any payment.",
    },
    {
      title: "Cancellations & Refunds",
      content:
        "You may cancel within 3 days of order confirmation for a full refund, provided we have not yet completed the services. To cancel, email us at support@cazpayment.uk with your order details.",
    },
    {
      title: "Liability",
      content:
        "We do not exclude liability for death or personal injury caused by negligence. However, for other losses:\n\n- We exclude implied warranties.\n- We are not liable for business losses (profit, interruption, opportunity).\n- We are not liable for indirect or consequential damages.\n- We are not liable for losses due to incorrect information provided by you (e.g., wrong registration number).",
    },
    {
      title: "Clean Air Zone (CAZ) Charge Disclaimer",
      content:
        "Important: This website is independent and NOT affiliated with gov.uk. We charge a £5.00 service fee on top of the standard government charge. You are responsible for verifying if a charge applies to your vehicle. Official payments can be made at the government website.",
    },
    {
      title: "Governing Law",
      content:
        "These Terms are governed by English law. Disputes are subject to the exclusive jurisdiction of the courts of England and Wales (with exceptions for residents of Northern Ireland and Scotland).",
    },
    {
      title: "Contact Us",
      content:
        "For any queries or complaints, please email: support@cazpayment.uk",
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
          <p className="text-gray-700 text-lg">
            Please review these terms carefully before utilizing our website or
            purchasing services. By accessing or using our Website, you confirm
            your acceptance of these Terms and agree to comply with them. If you
            do not agree, please refrain from using our services.
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
              <p className="text-gray-700 whitespace-pre-line">
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
