import Link from "next/link";
import { Wind, ShieldCheck } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#02182b] text-gray-400 py-16 mt-12 border-t border-white/5 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-[#007cc2] flex items-center justify-center text-white shadow-md shadow-[#007cc2]/20 transition group-hover:scale-105">
                <Wind className="w-6 h-6" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                CleanCityAir
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed font-medium">
              Simplifying clean air payments for drivers across the UK. Fast
              checkouts, automatic compliance matching, and secure checkout
              processing.
            </p>
            <p className="text-xs text-gray-500 font-medium leading-relaxed max-w-sm pt-2">
              Disclaimer: CleanCityAir is an independent portal facilitating
              daily fee payments. We are not affiliated with local city councils
              or any government agencies.
            </p>
          </div>

          {/* Links columns */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Column 1 */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                Navigation
              </h4>
              <ul className="space-y-3 text-sm font-semibold">
                <li>
                  <a href="#coverage" className="hover:text-white transition">
                    UK Zones
                  </a>
                </li>
                <li>
                  <a href="#highlights" className="hover:text-white transition">
                    Highlights
                  </a>
                </li>
                <li>
                  <a href="#process" className="hover:text-white transition">
                    Payment Process
                  </a>
                </li>
                <li>
                  <a href="#highlights" className="hover:text-white transition">
                    Benefits
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                Official Resources
              </h4>
              <ul className="space-y-3 text-sm font-semibold">
                <li>
                  <a
                    href="https://www.gov.uk/clean-air-zones"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition"
                  >
                    GOV.UK Clean Air Zones
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.gov.uk/contact-the-dvla"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition"
                  >
                    DVLA Assistance
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.gov.uk/guidance/driving-in-a-clean-air-zone"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition"
                  >
                    Compliance Guidance
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                Support & Policies
              </h4>
              <ul className="space-y-3 text-sm font-semibold">
                <li>
                  <Link href="/contact" className="hover:text-white transition">
                    Help & FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 gap-4">
          <div className="text-xs text-gray-500 font-semibold flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} CleanCityAir. All rights reserved.</span>
            <Link href="/adminDashboard" className="opacity-0 hover:opacity-100 transition-opacity text-gray-600 text-[10px] cursor-default">
              Admin
            </Link>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#00b875]">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Secure Checkout</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
