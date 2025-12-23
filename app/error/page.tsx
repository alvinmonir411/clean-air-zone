interface ErrorPageProps {
  searchParams: { reason?: string };
}

export default function ErrorPage({ searchParams }: ErrorPageProps) {
  const reason = searchParams.reason || "unknown";

  const messages: Record<string, string> = {
    no_session: "No payment session found. Please try again.",
    not_paid: "Payment not completed. Please try again.",
    fetch_failed: "Unable to verify payment. Please try again.",
    unknown: "Something went wrong. Please try again.",
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-xl text-center">
        <div className="mx-auto h-24 w-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <svg
            className="h-12 w-12 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h2 className="text-3xl font-bold text-gray-900">Payment Issue</h2>
        <p className="text-lg text-gray-600 mt-2">
          {messages[reason] || messages.unknown}
        </p>

        <div className="space-y-3 mt-8">
          <a
            href="/"
            className="block w-full bg-[#00b875] text-white py-3 px-6 rounded-lg hover:bg-green-600 font-medium"
          >
            Try Payment Again
          </a>
          <a
            href="/contact"
            className="block w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 font-medium"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
