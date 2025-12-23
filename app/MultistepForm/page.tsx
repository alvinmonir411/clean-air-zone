// app/page.js
"use client";

import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Step1_Vehicle from "../src/components/formSteps/Step1_Vehicle";
import Step2_Type from "../src/components/formSteps/Step2_Type";
import Step3_Location from "../src/components/formSteps/Step3_Location";
import Step4_Date from "../src/components/formSteps/Step4_Date";
import Step5_ReviewAndAccept from "../src/components/formSteps/Step5_ReviewAndAccept";
import StripePayment from "../src/components/formSteps/StripePayment";
import Stepper from "../src/components/Stepper";

// Componen
// *** WARNING: Replace 'YOUR_STRIPE_PUBLISHABLE_KEY' with your actual key ***
const stripePromise = loadStripe("YOUR_STRIPE_PUBLISHABLE_KEY");

const defaultValues = {
  registrationNumber: "",
  registrationLocation: "UK",
  vehicleType: "Car",
  cleanAirZone: "Bristol",
  paymentDate: new Date().toISOString().substring(0, 10),
  email: "",
  acceptTerms: false,
  country: "Bangladesh",
};

const totalSteps = 6; // 5 steps in the picture + 1 payment step

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const methods = useForm({ defaultValues, mode: "onBlur" });
  const formData = methods.watch();
  console.log(formData);
  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFinalSubmit = () => {
    // This function is called after successful payment (simulated in StripePayment.jsx)
    setCurrentStep(totalSteps + 1); // Go to Success Screen
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1_Vehicle onNext={handleNext} />;
      case 2:
        return <Step2_Type onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <Step3_Location onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <Step4_Date onNext={handleNext} onBack={handleBack} />;
      case 5:
        return (
          <Step5_ReviewAndAccept
            onNext={handleNext}
            onBack={handleBack}
            formData={formData}
          />
        );
      case 6:
        return (
          <Elements stripe={stripePromise}>
            <StripePayment
              onFinalSubmit={handleFinalSubmit}
              onBack={handleBack}
              formData={formData}
            />
          </Elements>
        );
      default:
        return (
          <div className="p-10 text-center text-xl font-bold text-[#00b875]">
            🎉 Submission Successful! Thank you for your payment.
          </div>
        );
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50 pt-10 pb-20">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-xl overflow-hidden">
        <Stepper currentStep={currentStep} />
        <FormProvider {...methods}>{renderStep()}</FormProvider>
      </div>
    </div>
  );
};

export default MultiStepForm;
