// ComplianceStandards.tsx
import React from "react";
import {
  BarChart4, // Zone classifications এর জন্য
  Car, // Affected Vehicles এর জন্য
  BadgeCheck, // Emission Standards এর জন্য
  MonitorPlay, // Alternative Icon
  CheckCircle2, // Alternative Icon
} from "lucide-react";
import Link from "next/link";

// --- ডেটা স্ট্রাকচার (TypeScript Interfaces) ---

interface ZoneClassification {
  class: string;
  zones: string;
}

interface AffectedVehicle {
  class: string;
  description: string;
}

interface EmissionStandard {
  standard: string;
  fuel: string;
  vehicles: string;
}

// --- ডেটা ---

const zoneData: ZoneClassification[] = [
  { class: "Class B", zones: "Portsmouth" },
  { class: "Class C", zones: "Bath, Bradford, Sheffield, Tyneside" },
  { class: "Class D", zones: "Birmingham, Bristol" },
];

const vehicleData: AffectedVehicle[] = [
  { class: "Class B:", description: "Buses, coaches, taxis, PHVs, HGVs." },
  { class: "Class C:", description: "All Class B + Vans and minibuses." },
  {
    class: "Class D:",
    description: "All Class C + Cars (motorcycles optional).",
  },
];

const emissionData: EmissionStandard[] = [
  { standard: "Euro 6", fuel: "DIESEL", vehicles: "Cars, Vans, Taxis, PHVs" },
  { standard: "Euro 4", fuel: "PETROL", vehicles: "Cars, Vans, Taxis, PHVs" },
  { standard: "Euro 5", fuel: "HEAVY DUTY", vehicles: "Buses, Coaches, HGVs" },
];

// --- ছোট কম্পোনেন্ট ---

// জোন এবং ক্লাসের জন্য ব্যাজ
const ZoneBadge: React.FC<ZoneClassification> = ({ class: cls, zones }) => (
  <div className="flex items-center mb-3">
    {/* Unique Design: Rounded Badge */}
    <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-blue-600 text-white min-w-[100px] text-center shadow-md mr-4">
      {cls}
    </span>
    <span className="text-gray-700">{zones}</span>
  </div>
);

// এফেক্টেড ভেহিকল আইটেম
const VehicleItem: React.FC<AffectedVehicle> = ({
  class: cls,
  description,
}) => (
  <div className="mb-3">
    <p className="text-gray-700">
      <span className="font-bold text-blue-700">{cls}</span> {description}
    </p>
  </div>
);

// ইমিশন স্ট্যান্ডার্ড কার্ড
const EmissionCard: React.FC<EmissionStandard> = ({
  standard,
  fuel,
  vehicles,
}) => (
  <div className="p-6 bg-white rounded-xl border border-gray-200 text-center shadow-sm hover:shadow-lg transition duration-300">
    <BadgeCheck size={32} className="mx-auto text-green-600 mb-2" />
    <h4 className="text-2xl font-bold text-blue-800">{standard}</h4>
    <p className="text-sm font-medium text-gray-500 uppercase mb-2">{fuel}</p>
    <p className="text-sm text-gray-600">{vehicles}</p>
  </div>
);

// --- মাস্টার কম্পোনেন্ট ---

const Chech: React.FC = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white p-10 rounded-3xl shadow-2xl border-t-8 border-blue-600">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Compliance Standards
          </h1>
          <p className="text-lg text-gray-600">
            Understand the vehicle classifications and emission standards for
            each zone.
          </p>
        </div>

        {/* Zone & Vehicle Classification Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Zone Classifications Panel */}
          <div className="p-6 border rounded-2xl bg-gray-50 shadow-inner">
            <div className="flex items-center mb-6 border-b pb-3">
              <BarChart4 size={24} className="text-blue-600" />
              <h2 className="text-xl font-bold text-gray-800 ml-3">
                Zone Classifications
              </h2>
            </div>
            <div className="space-y-4">
              {zoneData.map((item, index) => (
                <ZoneBadge key={index} {...item} />
              ))}
            </div>
          </div>

          {/* Affected Vehicles Panel */}
          <div className="p-6 border rounded-2xl bg-gray-50 shadow-inner">
            <div className="flex items-center mb-6 border-b pb-3">
              <Car size={24} className="text-blue-600" />
              <h2 className="text-xl font-bold text-gray-800 ml-3">
                Affected Vehicles
              </h2>
            </div>
            <div className="space-y-3">
              {vehicleData.map((item, index) => (
                <VehicleItem key={index} {...item} />
              ))}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mb-10">
          <Link
            href={"/MultistepForm"}
            className="w-full py-4 px-7  bg-blue-600 text-white font-semibold text-lg rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200/50"
          >
            Check Compliance
          </Link>
        </div>

        {/* Emission Standards Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Emission Standards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {emissionData.map((item, index) => (
              <EmissionCard key={index} {...item} />
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-6">
            Motorcycles generally require Euro 3 compliance where applicable.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chech;
