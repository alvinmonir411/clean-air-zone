"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, Check, Printer, Home } from "lucide-react";

interface SuccessActionsProps {
  sessionId: string;
}

export default function SuccessActions({ sessionId }: SuccessActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sessionId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text", err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4 w-full mt-8 print:hidden">
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handlePrint}
          type="button"
          className="flex-1 inline-flex justify-center items-center gap-2 bg-[#0c314b]/80 hover:bg-[#0c314b]/95 text-sky-200 hover:text-white py-3.5 px-5 rounded-xl font-bold tracking-wide transition-all border border-sky-900/40 hover:border-sky-500/30 active:scale-[0.98] cursor-pointer shadow-md"
        >
          <Printer className="w-5 h-5 text-sky-400" />
          Print Receipt
        </button>

        <button
          onClick={handleCopy}
          type="button"
          className="flex-1 inline-flex justify-center items-center gap-2 bg-[#0d2238]/80 hover:bg-[#0d2238]/95 text-slate-300 hover:text-white py-3.5 px-5 rounded-xl font-bold tracking-wide transition-all border border-slate-700/30 hover:border-slate-500/20 active:scale-[0.98] cursor-pointer shadow-md"
        >
          {copied ? (
            <>
              <Check className="w-5 h-5 text-emerald-400" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-5 h-5 text-sky-500" />
              Copy Reference
            </>
          )}
        </button>
      </div>

      <Link
        href="/"
        className="inline-flex w-full justify-center items-center gap-2 bg-[#00b875] text-white py-4 px-6 rounded-xl hover:bg-green-600 font-bold tracking-wide transition-all shadow-lg hover:shadow-green-500/20 active:scale-[0.98]"
      >
        <Home className="w-5 h-5" />
        Back to Home
      </Link>
    </div>
  );
}
