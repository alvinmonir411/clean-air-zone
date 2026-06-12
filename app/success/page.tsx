import { stripe } from "../lib/stripe";
import { getDataSource } from "../lib/db";
import { Payment, PaymentSchema } from "../lib/entities/payment.entity";
import SuccessActions from "./SuccessActions";
import { MapPin, Car, Calendar, Mail, BadgeCheck } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface SuccessPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  // ✅ unwrap the search params
  const { session_id } = await searchParams;

  if (!session_id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#02182B] text-white">
        <div className="text-center p-6 bg-red-950/20 border border-red-900/30 rounded-2xl max-w-md">
          <p className="text-red-400 font-semibold text-lg">
            No payment session identifier found in URL.
          </p>
        </div>
      </div>
    );
  }

  // Retrieve Stripe session if needed
  let session: any = null;
  let paymentUpdated = false;
  let dbPayment: any = null;

  try {
    console.log(`SuccessPage: Retrieving Stripe session ${session_id}`);
    session = await stripe.checkout.sessions.retrieve(session_id);

    const dataSource = await getDataSource();
    const paymentRepository = dataSource.getRepository(PaymentSchema);

    if (session.payment_status === "paid") {
      const paymentId = session.metadata?.paymentId;
      console.log(`SuccessPage: Session is paid. PaymentId in metadata: ${paymentId}`);

      if (paymentId) {
        // Check current status to avoid double-sending emails
        const existingPayment = await paymentRepository.findOne({
          where: { id: paymentId }
        });

        dbPayment = existingPayment;

        console.log(`SuccessPage: Existing payment status: ${existingPayment?.status}`);

        if (existingPayment && existingPayment.status !== "paid") {
          console.log(`SuccessPage: Updating payment ${paymentId} to paid`);
          
          existingPayment.status = "paid";
          existingPayment.paidAt = new Date();
          existingPayment.stripeSessionId = session.id;

          const resultPatch = await paymentRepository.save(existingPayment);
          dbPayment = resultPatch;

          if (resultPatch) {
            console.log("SuccessPage: Update successful. Confirmation email skipped.");
            paymentUpdated = true;
          }
        } else if (existingPayment && existingPayment.status === "paid") {
          console.log("SuccessPage: Payment already marked as paid.");
          paymentUpdated = true; // Still show success message to user
        }
      } else {
        console.warn("SuccessPage: No paymentId found in session metadata.");
      }

      // If dbPayment is still null, try finding by stripeSessionId
      if (!dbPayment) {
        dbPayment = await paymentRepository.findOne({
          where: { stripeSessionId: session_id }
        });
      }
    } else {
      console.log(`SuccessPage: Session payment status is ${session.payment_status}`);
      dbPayment = await paymentRepository.findOne({
        where: { stripeSessionId: session_id }
      });
    }
  } catch (error) {
    console.error("Error retrieving or updating Stripe session:", error);
    // Fallback: search by stripeSessionId in db
    try {
      const dataSource = await getDataSource();
      const paymentRepository = dataSource.getRepository(PaymentSchema);
      dbPayment = await paymentRepository.findOne({
        where: { stripeSessionId: session_id }
      });
    } catch (dbErr) {
      console.error("Fallback DB lookup failed:", dbErr);
    }
  }

  // Helper to format dates
  const formatDate = (dateStr: string) => {
    try {
      // Split DD-MM-YYYY format if applicable
      const parts = dateStr.split("-");
      if (parts.length === 3) {
        const date = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
        return date.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric"
        });
      }
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
    } catch (e) {
      return dateStr;
    }
  };

  const datesArray = dbPayment
    ? Array.isArray(dbPayment.selectedDates)
      ? dbPayment.selectedDates
      : typeof dbPayment.selectedDates === "string"
        ? (dbPayment.selectedDates as string).split(",")
        : []
    : [];

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#02182B] p-4 font-sans select-none relative overflow-hidden">
      {/* Background glow blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none print:hidden" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-sky-500/10 blur-[120px] pointer-events-none print:hidden" />

      {/* Embedded print styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          .min-h-screen {
            min-height: auto !important;
            padding: 0 !important;
            background: transparent !important;
          }
          .print-card {
            background: white !important;
            color: black !important;
            border: 1px solid #ccc !important;
            box-shadow: none !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 20px !important;
            border-radius: 12px !important;
          }
          .print-text-black {
            color: black !important;
          }
          .print-bg-light {
            background: #f9fafb !important;
            border: 1px solid #e5e7eb !important;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}} />

      <div className="w-full max-w-2xl bg-gradient-to-b from-[#0b2844] to-[#041d33] rounded-[2.5rem] shadow-2xl p-8 md:p-12 text-center relative border border-white/10 overflow-hidden print-card">
        {/* Glowing top effect */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400 print:hidden" />

        {/* Animated Check Success Circle */}
        <div className="mx-auto h-20 w-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mb-6 shadow-inner print:bg-emerald-50 print:border-emerald-200">
          <BadgeCheck className="h-10 w-10 text-emerald-400 print:text-emerald-700 animate-pulse" />
        </div>

        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent print:from-black print:to-black">
          Payment Successful!
        </h2>
        <p className="mt-3 text-slate-300 text-md max-w-md mx-auto leading-relaxed print:text-gray-700">
          Your Clean Air Zone charge has been processed and fully confirmed.
        </p>

        {/* UK License Plate Design */}
        {dbPayment?.registrationNumber && (
          <div className="flex justify-center mt-6 mb-2">
            <div className="inline-flex items-stretch rounded-lg overflow-hidden border-2 border-black/80 shadow-lg bg-[#FFD300]">
              {/* Blue GB strip on the left */}
              <div className="bg-[#002FA7] text-white flex flex-col justify-center items-center px-2 py-1 select-none font-sans border-r border-black/10 print:border-black">
                <div className="flex flex-col items-center">
                  <span className="text-[6px] text-amber-300 leading-none">★ ★</span>
                  <span className="text-[6px] text-amber-300 leading-none">★   ★</span>
                  <span className="text-[6px] text-amber-300 leading-none">★ ★</span>
                </div>
                <span className="text-[8px] font-bold tracking-wider mt-1 text-white leading-none">GB</span>
              </div>
              {/* Yellow main registration plate area */}
              <div className="text-black font-extrabold text-2xl md:text-3xl px-6 py-2.5 font-mono flex items-center justify-center tracking-widest select-all">
                {dbPayment.registrationNumber.toUpperCase()}
              </div>
            </div>
          </div>
        )}

        {/* Details Card */}
        {dbPayment ? (
          <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-6 text-left space-y-4 print-bg-light">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-white/10 print:border-gray-200">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">Clean Air Zone</span>
                <span className="text-md font-bold text-white flex items-center gap-1.5 print-text-black">
                  <MapPin className="w-4.5 h-4.5 text-emerald-400 print:text-gray-600" />
                  {dbPayment.cleanAirZone}
                </span>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">Vehicle Type</span>
                <span className="text-md font-bold text-white flex items-center gap-1.5 print-text-black">
                  <Car className="w-4.5 h-4.5 text-sky-400 print:text-gray-600" />
                  {dbPayment.vehicleType}
                </span>
              </div>
            </div>

            <div className="pb-4 border-b border-white/10 print:border-gray-200">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">Active Travel Dates</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {datesArray.map((date: string, idx: number) => (
                  <span key={idx} className="inline-flex items-center gap-1.5 bg-sky-950/60 text-sky-300 border border-sky-800/30 px-3 py-1 rounded-lg text-xs font-bold print:bg-gray-100 print:text-black print:border-gray-300">
                    <Calendar className="w-3.5 h-3.5 text-sky-400 print:text-gray-600" />
                    {formatDate(date)}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-white/10 print:border-gray-200">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">Total Paid</span>
                <span className="text-2xl font-black text-emerald-400 print:text-emerald-700">
                  £{(dbPayment.totalAmount / 100).toFixed(2)}
                </span>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">Payment Status</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 print:bg-emerald-100 print:text-emerald-800">
                  ● Confirmed Paid
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">Payment Reference</span>
                <span className="font-mono text-sm text-sky-200 break-all select-all block bg-white/5 p-2 rounded-lg border border-white/10 print:border-gray-300 print:text-black">
                  {session_id}
                </span>
              </div>
              {dbPayment.email && (
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">Customer Email</span>
                  <span className="text-sm font-semibold text-slate-200 flex items-center gap-1.5 print-text-black">
                    <Mail className="w-4.5 h-4.5 text-slate-500 print:text-gray-600" />
                    {dbPayment.email}
                  </span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-6 text-left space-y-4 print-bg-light">
            <div className="flex flex-col space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Payment Reference</span>
              <span className="font-mono text-sm text-sky-200 break-all select-all bg-white/5 p-2.5 rounded-lg border border-white/10 print:text-black">
                {session_id}
              </span>
            </div>

            {session?.customer_details?.email && (
              <div className="flex justify-between items-center pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Customer Email</span>
                <span className="text-sm font-semibold text-slate-200 print-text-black">{session.customer_details.email}</span>
              </div>
            )}
          </div>
        )}



        <SuccessActions sessionId={session_id} />
      </div>
    </div>
  );
}

