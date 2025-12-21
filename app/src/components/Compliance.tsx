import { BookOpen, CircleCheckBig } from "lucide-react";
import Link from "next/link";

const Compliance = () => {
  return (
    <div className=" container mx-auto">
      <div className="p-7 flex justify-center gap-10">
        <div className="border border-gray-400 p-8 rounded-2xl flex justify-between gap-5 items-center flex-col">
          <h1 className="text-2xl text-green-600 text-center flex justify-center gap-5 items-center">
            <CircleCheckBig /> Compliance
          </h1>
          <p className="text-center">
            Not sure if your vehicle
            <br /> meets the Euro Emission Standards?
          </p>
          <Link href={"/Chech"} className="bg-green-400 p-3 rounded-2xl">
            Check Standards
          </Link>
        </div>
        <div className="border border-gray-400 p-8 rounded-2xl flex justify-between gap-5 items-center flex-col">
          <h1 className="text-2xl text-green-600 flex justify-center gap-5 items-center">
            <BookOpen /> Exemptions
          </h1>
          <p className="text-center">
            Some vehicles are exempt from
            <br />
            daily charges. Find out if you qualify.
          </p>
          <Link href={"/Exemptions"} className="bg-green-400 p-3 rounded-2xl ">
            View Exemptions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Compliance;
