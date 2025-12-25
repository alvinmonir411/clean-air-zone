// ComplianceStandards.tsx
import React from "react";
import { BarChart4, Car, BadgeCheck } from "lucide-react";
import Link from "next/link";

// --- Interfaces ---

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

// --- Data ---

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

// --- Small Components ---

const ZoneBadge: React.FC<ZoneClassification> = ({ class: cls, zones }) => (
  <div className="flex items-center mb-3">
    <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-[#057a55] text-white min-w-[100px] text-center shadow-md mr-4">
      {cls}
    </span>
    <span className="text-gray-700">{zones}</span>
  </div>
);

const VehicleItem: React.FC<AffectedVehicle> = ({
  class: cls,
  description,
}) => (
  <div className="mb-3">
    <p className="text-gray-700">
      <span className="font-bold text-[#057a55]">{cls}</span> {description}
    </p>
  </div>
);

const EmissionCard: React.FC<EmissionStandard> = ({
  standard,
  fuel,
  vehicles,
}) => (
  <div className="p-6 bg-white rounded-xl border border-gray-200 text-center shadow-sm hover:shadow-lg transition duration-300">
    <BadgeCheck size={32} className="mx-auto text-[#057a55] mb-2" />
    <h4 className="text-2xl font-bold text-[#057a55]">{standard}</h4>
    <p className="text-sm font-medium text-gray-500 uppercase mb-2">{fuel}</p>
    <p className="text-sm text-gray-600">{vehicles}</p>
  </div>
);

// --- Main Component ---

const Chech: React.FC = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white p-10 rounded-3xl shadow-2xl border-t-8 border-[#057a55]">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Compliance Standards
          </h1>
          <p className="text-lg text-gray-600">
            Understand the vehicle classifications and emission standards for
            each zone.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Zone Classifications */}
          <div className="p-6 border rounded-2xl bg-gray-50 shadow-inner">
            <div className="flex items-center mb-6 border-b pb-3">
              <BarChart4 size={24} className="text-[#057a55]" />
              <h2 className="text-xl font-bold text-gray-800 ml-3">
                Zone Classifications
              </h2>
            </div>
            {zoneData.map((item, index) => (
              <ZoneBadge key={index} {...item} />
            ))}
          </div>

          {/* Affected Vehicles */}
          <div className="p-6 border rounded-2xl bg-gray-50 shadow-inner">
            <div className="flex items-center mb-6 border-b pb-3">
              <Car size={24} className="text-[#057a55]" />
              <h2 className="text-xl font-bold text-gray-800 ml-3">
                Affected Vehicles
              </h2>
            </div>
            {vehicleData.map((item, index) => (
              <VehicleItem key={index} {...item} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mb-10">
          <Link
            href="/MultistepForm"
            className="block text-center w-full py-4 px-7 bg-[#057a55] text-white font-semibold text-lg rounded-xl hover:bg-[#046347] transition shadow-lg shadow-[#057a55]/40"
          >
            Check Compliance
          </Link>
        </div>

        {/* Emission Standards */}
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
 