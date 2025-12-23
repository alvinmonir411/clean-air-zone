import { BookOpen, CircleCheckBig } from "lucide-react";
import Link from "next/link";

const Compliance = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="py-10 flex flex-col md:flex-row justify-center items-stretch gap-6 md:gap-10">
        {/* Compliance Card */}
        <div className="w-full md:w-1/2 lg:w-[420px] border border-gray-300 p-6 md:p-8 rounded-2xl flex flex-col gap-5 items-center text-center">
          <h1 className="text-xl md:text-2xl text-green-600 flex items-center gap-3">
            <CircleCheckBig />
            Compliance
          </h1>

          <p className="text-sm md:text-base text-gray-700">
            Not sure if your vehicle
            <br /> meets the Euro Emission Standards?
          </p>

          <Link
            href="/Chech"
            className="bg-green-400 hover:bg-green-500 transition px-6 py-3 rounded-2xl text-sm md:text-base font-medium"
          >
            Check Standards
          </Link>
        </div>

        {/* Exemptions Card */}
        <div className="w-full md:w-1/2 lg:w-[420px] border border-gray-300 p-6 md:p-8 rounded-2xl flex flex-col gap-5 items-center text-center">
          <h1 className="text-xl md:text-2xl text-green-600 flex items-center gap-3">
            <BookOpen />
            Exemptions
          </h1>

          <p className="text-sm md:text-base text-gray-700">
            Some vehicles are exempt from
            <br />
            daily charges. Find out if you qualify.
          </p>

          <Link
            href="/Exemptions"
            className="bg-green-400 hover:bg-green-500 transition px-6 py-3 rounded-2xl text-sm md:text-base font-medium"
          >
            View Exemptions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Compliance;
