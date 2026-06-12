import Link from "next/link";

interface ErrorPageProps {
  searchParams: Promise<{ reason?: string }> | { reason?: string };
}

export default async function ErrorPage({ searchParams }: ErrorPageProps) {
  const resolvedParams = await searchParams;
  const reason = resolvedParams?.reason || "unknown";

  const messages: Record<string, string> = {
    no_session: "No payment session was found. Please check details and try again.",
    not_paid: "Your payment was not completed or has been canceled. Please try again.",
    fetch_failed: "We were unable to verify the checkout session. Please try again.",
    unknown: "An unexpected error occurred during payment processing. Please try again.",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b3558] via-[#02182B] to-[#0c314b] p-4 font-sans select-none">
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl p-10 text-center relative border border-white/5 overflow-hidden">
        {/* Glowing top effect */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-500 to-[#0c314b]" />

        {/* Warning Exclamation Icon */}
        <div className="mx-auto h-24 w-24 bg-red-50 rounded-full flex items-center justify-center mb-8 shadow-inner">
          <svg
            className="h-12 w-12 text-red-500 animate-pulse"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h2 className="text-3xl font-black text-[#02182B] tracking-tight">Payment Issue</h2>
        
        <p className="mt-3 text-gray-600 text-md leading-relaxed">
          {messages[reason] || messages.unknown}
        </p>

        {/* Details Card */}
        <div className="mt-8 bg-gray-50 border border-gray-100 rounded-2xl p-6 text-left space-y-4">
          <div className="flex justify-between items-center pb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Error Code</span>
            <span className="font-mono text-xs font-bold text-red-600 uppercase bg-red-50 px-3 py-1 rounded-full border border-red-100">
              {reason}
            </span>
          </div>
        </div>

        <div className="space-y-3 mt-8">
          <Link
            href="/MultistepForm"
            className="inline-flex w-full justify-center items-center bg-[#00b875] text-white py-4 px-6 rounded-xl hover:bg-green-600 font-bold tracking-wide transition-all shadow-lg hover:shadow-green-500/20 active:scale-[0.98]"
          >
            Try Payment Again
          </Link>
          <Link
            href="/"
            className="inline-flex w-full justify-center items-center bg-[#02182B] text-white py-4 px-6 rounded-xl hover:bg-opacity-90 font-bold tracking-wide transition-all shadow-lg active:scale-[0.98]"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex w-full justify-center items-center border border-gray-200 text-gray-600 hover:text-gray-800 hover:bg-gray-50 py-4 px-6 rounded-xl font-bold tracking-wide transition-all"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}

