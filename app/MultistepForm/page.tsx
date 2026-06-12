"use client";

import React, { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Link from "next/link";
import { X } from "lucide-react";
import Step1_Vehicle from "../src/components/formSteps/Step1_Vehicle";
import Step2_Type from "../src/components/formSteps/Step2_Type";
import Step3_Location from "../src/components/formSteps/Step3_Location";
import Step4_Date from "../src/components/formSteps/Step4_Date";
/* ✅ Step 5 কম্পোনেন্টটি ইমপোর্ট করা হলো */
import Step5_ReviewAndAccept from "../src/components/formSteps/Step5_ReviewAndAccept";
import Stepper from "../src/components/Stepper";
import { createCheckoutSession } from "../action";

/* ✅ RENAMED TYPE */
export interface CheckoutFormData {
  registrationNumber: string;
  registrationLocation: string;
  vehicleType: string;
  cleanAirZone: string;
  paymentDate: string;
  selectedDates: string[];
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
  selectedDates: [],
  email: "",
  acceptTerms: true,
  country: "UK",
};

const totalSteps = 5; // ✅ যেহেতু Step 6 নেই, তাই এটি 5 হবে।

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [canceled, setCanceled] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const methods = useForm<CheckoutFormData>({
    defaultValues,
    mode: "onBlur",
  });

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
    setLoading(true);

    const formDataToSend = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        // If it's an array (like selectedDates), append each value
        value.forEach((v) => formDataToSend.append(key, v));
      } else {
        formDataToSend.append(key, String(value));
      }
    });

    try {
      const result = await createCheckoutSession(formDataToSend);
      if (result && result.success && result.url) {
        window.location.href = result.url;
      } else {
        console.error("Checkout failed:", result?.error);
        alert(result?.error ? `Payment initiation failed: ${result.error}` : "Payment initiation failed. Please try again.");
        setLoading(false);
      }
    } catch (error: any) {
      console.error("Checkout failed:", error);
      alert(`Payment initiation failed: ${error.message || "Unknown error"}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      
      const regNum = urlParams.get("registrationNumber");
      const caz = urlParams.get("cleanAirZone");
      const vType = urlParams.get("vehicleType");
      
      if (regNum) {
        methods.setValue("registrationNumber", regNum.toUpperCase());
      }
      if (caz) {
        methods.setValue("cleanAirZone", caz);
      }
      if (vType) {
        methods.setValue("vehicleType", vType);
      }

      if (urlParams.get("canceled") === "true") {
        setCanceled(true);
        setCurrentStep(5);
      }
      setIsInitialized(true);
    }
  }, [methods]);

  // Sync state to URL whenever formData changes
  useEffect(() => {
    if (!isInitialized || typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);

    // Helper to update specific keys
    const updateParam = (key: string, value: any) => {
      if (value && value.toString().length > 0) {
        if (Array.isArray(value)) {
          if (value.length > 0) params.set(key, value.join(","));
          else params.delete(key);
        } else {
          params.set(key, String(value));
        }
      } else {
        params.delete(key);
      }
    };

    updateParam("registrationNumber", formData.registrationNumber);
    updateParam("vehicleType", formData.vehicleType);
    updateParam("cleanAirZone", formData.cleanAirZone);
    updateParam("selectedDates", formData.selectedDates);
    // We don't necessarily need to sync email or sensitive info to URL if not needed, 
    // but user asked for "value that user selected", so we sync major fields.

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, "", newUrl);

  }, [formData]);

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
          /* ✅ Step 5 এ এখন নতুন কম্পোনেন্ট রেন্ডার করা হলো */
          <Step5_ReviewAndAccept
            onBack={handleBack}
            onSubmit={methods.handleSubmit(onSubmit)}
            loading={loading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#0b3558] via-[#02182B] to-[#0c314b] p-4 font-sans select-none">
      <div className="w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl relative border border-white/5 overflow-hidden">
        {/* Step Header with Close Button */}
        <div className="text-center pt-8 relative">
          <span className="text-xs font-black tracking-widest text-[#0c4068] uppercase">
            Step {currentStep} of 5
          </span>
          <Link
            href="/"
            className="absolute top-6 right-8 text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition"
          >
            <X className="w-4 h-4" />
          </Link>
        </div>

        {/* Stepper progress circles */}
        <Stepper currentStep={currentStep} />
        
        {/* Step Contents */}
        <FormProvider {...methods}>
          {renderStep()}
        </FormProvider>
      </div>
    </div>
  );
};

export default MultiStepForm;
