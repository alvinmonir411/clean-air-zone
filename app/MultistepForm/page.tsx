"use client";

import React, { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Step1_Vehicle from "../src/components/formSteps/Step1_Vehicle";
import Step2_Type from "../src/components/formSteps/Step2_Type";
import Step3_Location from "../src/components/formSteps/Step3_Location";
import Step4_Date from "../src/components/formSteps/Step4_Date";
import Step5_ReviewAndAccept from "../src/components/formSteps/Step5_ReviewAndAccept";
import Stepper from "../src/components/Stepper";
import { createCheckoutSession } from "../action";

/* ✅ RENAMED TYPE (avoid clash with browser FormData) */
export interface CheckoutFormData {
  registrationNumber: string;
  registrationLocation: string;
  vehicleType: string;
  cleanAirZone: string;
  paymentDate: string;
  selectedDates: string[]; // ✅ FIXED
  email: string;
  acceptTerms: boolean;
  country: string;
}

/* ✅ DEFAULT VALUES FIXED */
const defaultValues: CheckoutFormData = {
  registrationNumber: "",
  registrationLocation: "UK",
  vehicleType: "Car",
  cleanAirZone: "Bristol",
  paymentDate: "",
  selectedDates: [], // ✅ REQUIRED FIELD ADDED
  email: "",
  acceptTerms: false,
  country: "UK",
};

const totalSteps = 6;

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [canceled, setCanceled] = useState(false);

  const methods = useForm<CheckoutFormData>({
    defaultValues,
    mode: "onBlur",
  });

  /* ✅ FIX HYDRATION ISSUE */
  useEffect(() => {
    methods.setValue("paymentDate", new Date().toISOString().substring(0, 10));
  }, [methods]);

  const formData = methods.watch();

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: CheckoutFormData) => {
    if (!data.acceptTerms) {
      alert("Please accept terms before payment");
      return;
    }

    setLoading(true);

    const formDataToSend = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => formDataToSend.append(key, v));
      } else {
        formDataToSend.append(key, String(value));
      }
    });

    try {
      const result = await createCheckoutSession(formDataToSend);
      if (result?.url) {
        window.location.href = result.url;
      }
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Payment initiation failed. Please try again.");
      setLoading(false);
    }
   
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("canceled") === "true") {
        setCanceled(true);
        setCurrentStep(6);
      }
    }
  }, []);

  const renderStep = () => {
    if (canceled) {
      return (
        <div className="p-10 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Payment Canceled
          </h2>
          <button
            onClick={() => {
              setCanceled(false);
              setCurrentStep(5);
            }}
            className="bg-[#00b875] text-white px-8 py-3 rounded-lg"
          >
            Try Again
          </button>
        </div>
      );
    }

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
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="p-8 space-y-4"
          >
            <input
              type="email"
              {...methods.register("email", { required: true })}
              placeholder="Confirm your email"
              className="w-full p-3 border rounded"
            />

            <label className="flex items-center space-x-2">
              <input type="checkbox" {...methods.register("acceptTerms")} />
              <span>I accept the terms</span>
            </label>

            <button
              type="submit"
              disabled={loading || !formData.acceptTerms}
              className="bg-[#00b875] text-white px-6 py-3 rounded w-full"
            >
              {loading ? "Processing..." : "Pay £14.00 Securely"}
            </button>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-50 pt-10">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow">
        <Stepper currentStep={currentStep} />
        <FormProvider {...methods}>{renderStep()}</FormProvider>
      </div>
    </div>
  );
};

export default MultiStepForm;
