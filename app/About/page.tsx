import React from "react";
import { ShieldCheck, Leaf, Globe } from "lucide-react";

const AboutUs: React.FC = () => {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Driving a Cleaner, Smarter Future
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We help drivers understand compliance, reduce emissions, and move
            confidently toward a sustainable tomorrow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="group bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-lg transition">
            <ShieldCheck className="text-green-600 mb-4" size={36} />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Trusted Compliance
            </h3>
            <p className="text-gray-600">
              We simplify complex emission regulations so you can instantly
              understand whether your vehicle meets official standards.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-lg transition">
            <Leaf className="text-emerald-600 mb-4" size={36} />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Sustainability First
            </h3>
            <p className="text-gray-600">
              Our mission is rooted in environmental responsibility—helping
              reduce pollution while supporting smarter transport choices.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-lg transition">
            <Globe className="text-indigo-600 mb-4" size={36} />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Built for Everyone
            </h3>
            <p className="text-gray-600">
              Whether you're an individual driver or an organization, our
              platform is designed to be accessible, accurate, and reliable.
            </p>
          </div>
        </div>
        <div className="mt-16 text-center">
          <p className="text-gray-700 text-lg font-medium">
            Compliance isn’t just a rule — it’s a responsibility.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
