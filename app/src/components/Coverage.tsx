"use client";
import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import { Search, MapPin, X, ArrowRight } from "lucide-react";
import Link from "next/link";

// Fix Leaflet default icon paths (SSR safe)
const initLeafletIcons = () => {
  if (typeof window === "undefined") return;
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  });
};

const greenIcon = typeof window !== "undefined" ? new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
}) : null;

interface Zone {
  name: string;
  subtitle: string;
  class: "Class B" | "Class C" | "Class D";
  fee: string;
  coords: [number, number];
  description: string;
  vehiclesCharged: string[];
  exemptions: string;
}

const zones: Zone[] = [
  {
    name: "Bath",
    subtitle: "City Centre Area",
    class: "Class C",
    fee: "£9.00",
    coords: [51.3758, -2.3599],
    description: "Covers central Bath. Vans, HGVs, buses, coaches, taxis, and private hire vehicles are subject to the charge if non-compliant. Private cars are currently exempt.",
    vehiclesCharged: ["Diesel", "Petrol", "Non-compliant"],
    exemptions: "Hybrid vehicles, historic vehicles, and some emergency service vehicles are automatically exempt.",
  },
  {
    name: "Birmingham",
    subtitle: "City Centre Area",
    class: "Class D",
    fee: "£8.00",
    coords: [52.4862, -1.8904],
    description: "Covers all roads within the Middle Ring Road (A4540). All non-compliant vehicles, including private cars and motorcycles, must pay the daily charge.",
    vehiclesCharged: ["Diesel", "Petrol", "Non-compliant"],
    exemptions: "Vans or cars registered for disabled tax class, ultra-low emission vehicles (ULEVs).",
  },
  {
    name: "Bradford",
    subtitle: "Central Streets Area",
    class: "Class C",
    fee: "£9.00",
    coords: [53.795, -1.7594],
    description: "Covers the city center and outer ring road. Applies to non-compliant commercial vehicles, taxis, vans, and HGVs. Private passenger cars are not charged.",
    vehiclesCharged: ["Diesel", "Petrol", "Non-compliant"],
    exemptions: "Certain local businesses and residents can apply for exemptions.",
  },
  {
    name: "Bristol",
    subtitle: "City Centre Area",
    class: "Class D",
    fee: "£9.00",
    coords: [51.4545, -2.5879],
    description: "Covers the central Bristol zone. All non-compliant vehicles, including diesel/petrol private passenger cars, taxis, HGVs, and vans must pay the daily fee.",
    vehiclesCharged: ["Diesel", "Petrol", "Non-compliant"],
    exemptions: "Exemptions apply for blue badge holders, low-income workers, and emergency service vehicles.",
  },
  {
    name: "Portsmouth",
    subtitle: "Central Arteries Area",
    class: "Class B",
    fee: "£10.00",
    coords: [50.8198, -1.0879],
    description: "Applies to selected roads in southwest Portsmouth. Primarily targets heavy goods vehicles (HGVs), buses, coaches, and taxis. Private cars are exempt.",
    vehiclesCharged: ["Diesel", "Petrol", "Non-compliant"],
    exemptions: "Clean and electric HGVs/buses. Local community transport exemptions can apply.",
  },
  {
    name: "Sheffield",
    subtitle: "Inner Ring Road Area",
    class: "Class C",
    fee: "£10.00",
    coords: [53.3811, -1.4701],
    description: "Covers the inner ring road and city center. Applies to non-compliant light goods vehicles (LGVs), HGVs, buses, coaches, and taxis. Private cars are exempt.",
    vehiclesCharged: ["Diesel", "Petrol", "Non-compliant"],
    exemptions: "Local businesses, community groups, and private hire vehicles meeting local standards.",
  },
  {
    name: "Tyneside",
    subtitle: "Newcastle and Gateshead Area",
    class: "Class C",
    fee: "£12.50",
    coords: [54.9783, -1.6178],
    description: "Covers Newcastle city center and routes across the Tyne bridge. Applies to vans, HGVs, buses, coaches, and taxis. Private cars are exempt.",
    vehiclesCharged: ["Diesel", "Petrol", "Non-compliant"],
    exemptions: "Emergency vehicles, military vehicles, and retrofitted clean buses/HGVs.",
  },
];

const Coverage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "cars" | "vans" | "heavy" | "map">("all");
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);

  // Map Refs
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // Initialize Map when tab is 'map'
  useEffect(() => {
    if (activeTab !== "map" || !mapRef.current) {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      return;
    }

    initLeafletIcons();

    const map = L.map(mapRef.current, {
      center: [53.0, -1.5],
      zoom: 6,
      scrollWheelZoom: false,
    });
    mapInstanceRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    zones.forEach((zone) => {
      if (!greenIcon) return;
      const marker = L.marker(zone.coords, { icon: greenIcon }).addTo(map);
      marker.bindPopup(`
        <div style="padding:4px;font-family:inherit;">
          <h3 style="font-weight:800;font-size:15px;color:#02182b;margin-bottom:2px;">${zone.name}</h3>
          <p style="font-size:12px;color:#6b7280;margin-bottom:6px;">${zone.subtitle}</p>
          <div style="display:flex;align-items:center;gap:6px;background:#e6f8f1;padding:4px 8px;border-radius:4px;border:1px solid #c7f3e1;">
            <span style="font-size:11px;font-weight:700;color:#00b875;">Class: ${zone.class} (${zone.fee}/day)</span>
          </div>
        </div>
      `);
    });

    map.fitBounds(L.latLngBounds(zones.map((z) => z.coords)), {
      padding: [40, 40],
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [activeTab]);

  // Filter logic based on tabs and search term
  const filteredZones = zones.filter((zone) => {
    // 1. Search filter
    const matchesSearch =
      zone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      zone.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      zone.description.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    // 2. Tab filter
    // Class D charges cars, Class C charges vans/taxis/buses, Class B charges buses/HGVs
    if (activeTab === "cars") {
      return zone.class === "Class D"; // Only Class D charges private cars
    }
    if (activeTab === "vans") {
      return zone.class === "Class C" || zone.class === "Class D"; // Both Class C & D charge vans
    }
    if (activeTab === "heavy") {
      return true; // All active zones charge HGVs & Buses
    }

    return true; // "all" or "map"
  });

  return (
    <section id="coverage" className="py-20 bg-brand-bg-light/20 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest text-[#007cc2] uppercase block mb-3">
            Coverage
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0c2340] mb-4">
            We cover every UK zone.
          </h2>
          <p className="text-gray-500 font-medium">
            Search and filter to check compliance guidelines, operating times,
            and daily fee rates for each specific zone.
          </p>
        </div>

        {/* Controls Container */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by city or area..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#007cc2] focus:border-transparent transition text-gray-800 placeholder:text-gray-400 font-medium"
            />
          </div>

          {/* Filter tabs */}
          <div className="bg-gray-100/80 border border-gray-200/40 p-1 rounded-full flex flex-wrap items-center gap-1 self-start lg:self-center shadow-inner">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition ${
                activeTab === "all"
                  ? "bg-white text-[#0c2340] shadow-sm"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              All Zones
            </button>
            <button
              onClick={() => setActiveTab("cars")}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition ${
                activeTab === "cars"
                  ? "bg-white text-[#0c2340] shadow-sm"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Cars Charged
            </button>
            <button
              onClick={() => setActiveTab("vans")}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition ${
                activeTab === "vans"
                  ? "bg-white text-[#0c2340] shadow-sm"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Vans & Taxis
            </button>
            <button
              onClick={() => setActiveTab("heavy")}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition ${
                activeTab === "heavy"
                  ? "bg-white text-[#0c2340] shadow-sm"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              HGVs & Buses
            </button>
            <button
              onClick={() => setActiveTab("map")}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition ${
                activeTab === "map"
                  ? "bg-white text-[#0c2340] shadow-sm"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Map View
            </button>
          </div>
        </div>

        {/* View Selection (Grid vs Map) */}
        {activeTab === "map" ? (
          <div className="rounded-3xl overflow-hidden border border-gray-200 bg-white shadow-md">
            <div ref={mapRef} className="h-[500px] lg:h-[650px] w-full relative z-10" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredZones.map((zone) => (
              <div
                key={zone.name}
                className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-brand-green/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Header row */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Clean Air Zone
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#00c076] animate-pulse" />
                      <span className="text-xs font-bold text-[#00c076]">
                        Active
                      </span>
                    </div>
                  </div>

                  {/* Title & subtitle */}
                  <h3 className="text-xl font-extrabold text-[#0c2340]">
                    {zone.name}
                  </h3>
                  <p className="text-xs text-gray-400 font-semibold mb-6">
                    {zone.subtitle}
                  </p>

                  {/* Zone Details Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6 border-t border-b border-gray-100 py-4">
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 block mb-1">
                        ZONE CLASS
                      </span>
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold text-white uppercase ${
                          zone.class === "Class B"
                            ? "bg-[#007cc2]"
                            : zone.class === "Class C"
                            ? "bg-[#f59e0b]"
                            : "bg-[#7c3aed]"
                        }`}
                      >
                        {zone.class}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 block mb-1">
                        DAILY FEE
                      </span>
                      <span className="text-sm font-black text-[#0c2340]">
                        {zone.fee}
                      </span>
                    </div>
                  </div>

                  {/* Charged Vehicles badges */}
                  <div className="mb-6">
                    <span className="text-[10px] font-bold text-gray-400 block mb-2 uppercase tracking-wide">
                      Vehicles Charged:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {zone.vehiclesCharged.map((v, i) => (
                        <span
                          key={i}
                          className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full text-[10px] font-bold"
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer link */}
                <button
                  onClick={() => setSelectedZone(zone)}
                  className="w-full text-left font-bold text-sm text-[#007cc2] hover:text-[#005a8f] transition-colors flex items-center gap-1.5 group pt-2"
                >
                  View Full Details
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {activeTab !== "map" && filteredZones.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg text-gray-500 font-semibold mb-2">
              No matching clean air zones found.
            </p>
            <p className="text-sm text-gray-400">
              Try searching with another keyword or selecting a different
              category.
            </p>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedZone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-[2rem] w-full max-w-4xl overflow-hidden shadow-2xl animate-fade-in relative my-8 font-sans">
            {/* Modal Header */}
            <div className="p-8 border-b border-gray-100 flex justify-between items-start">
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="bg-slate-100 text-gray-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    UK Clean Air Zone
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider ${
                      selectedZone.class === "Class B"
                        ? "bg-[#007cc2]"
                        : selectedZone.class === "Class C"
                        ? "bg-[#f59e0b]"
                        : "bg-[#7c3aed]"
                    }`}
                  >
                    {selectedZone.class}
                  </span>
                </div>
                <h3 className="text-3xl font-black text-[#0c2340]">
                  {selectedZone.name}
                </h3>
                <p className="text-sm text-gray-400 font-semibold mt-1">
                  {selectedZone.name === "Birmingham"
                    ? "Encloses the central area inside the A4040 ring road."
                    : selectedZone.name === "Bath"
                    ? "Covers central Bath area."
                    : selectedZone.name === "Bradford"
                    ? "Covers the city center and outer ring road."
                    : selectedZone.name === "Bristol"
                    ? "Covers the central Bristol zone."
                    : selectedZone.name === "Portsmouth"
                    ? "Applies to selected roads in southwest Portsmouth."
                    : selectedZone.name === "Sheffield"
                    ? "Covers the inner ring road and city center."
                    : "Newcastle and Gateshead central bypass road."}
                </p>
              </div>
              <button
                onClick={() => setSelectedZone(null)}
                className="text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 p-2.5 rounded-full transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body (Two columns) */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-12 gap-8 max-h-[70vh] overflow-y-auto scrollbar-thin">
              {/* Left Column */}
              <div className="md:col-span-7 space-y-6 text-left">
                {/* Dynamic Callout Card */}
                <div className="bg-[#f0f9ff]/40 border border-[#e0f2fe] p-6 rounded-2xl">
                  <h4 className="font-extrabold text-[#0c2340] text-lg mb-2">
                    Drove through {selectedZone.name}?
                  </h4>
                  <p className="text-gray-500 text-sm font-medium leading-relaxed">
                    A daily charge may apply. Skipping payment when your vehicle
                    isn't compliant could mean a PCN.
                  </p>
                  <Link
                    href={`/MultistepForm?cleanAirZone=${encodeURIComponent(selectedZone.name)}`}
                    onClick={() => setSelectedZone(null)}
                    className="bg-[#0c2340] hover:bg-[#113158] text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-1.5 w-fit transition duration-200 mt-4 shadow-sm"
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* About Zone */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black tracking-wider text-gray-400 uppercase">
                    About the Zone
                  </h4>
                  <div className="bg-[#f0f9ff]/30 text-[#007cc2] border border-[#e0f2fe] px-3 py-1 rounded-full text-xs font-bold w-fit flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#007cc2] animate-pulse" />
                    Active: 24/7
                  </div>
                  <p className="text-gray-600 text-sm font-medium leading-relaxed">
                    {selectedZone.description}
                  </p>
                </div>

                {/* Vehicle Standards */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black tracking-wider text-gray-400 uppercase">
                    Vehicle Standards
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Diesel card */}
                    <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm">
                      <h5 className="font-extrabold text-sm text-[#0c2340] mb-2">
                        Diesel vehicles
                      </h5>
                      <p className="text-gray-500 text-xs font-medium leading-relaxed">
                        Diesel cars, vans and motorcycles need to meet Euro 6 to
                        travel through without a daily charge.
                      </p>
                    </div>
                    {/* Petrol card */}
                    <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm">
                      <h5 className="font-extrabold text-sm text-[#0c2340] mb-2">
                        Petrol vehicles
                      </h5>
                      <p className="text-gray-500 text-xs font-medium leading-relaxed">
                        Petrol cars, vans and motorcycles need to meet Euro 4 to
                        travel through without a daily charge.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Things worth knowing */}
                <div className="space-y-4 pt-2 border-t border-gray-100">
                  <h4 className="text-xs font-black tracking-wider text-gray-400 uppercase">
                    Things worth knowing
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-bold text-xs text-[#0c2340] mb-1">
                        Emission standards
                      </h5>
                      <p className="text-gray-500 text-xs font-medium leading-relaxed">
                        Diesel vehicles generally need to reach Euro 6, while
                        petrol vehicles must meet Euro 4 to drive in without paying.
                      </p>
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-[#0c2340] mb-1">
                        Charges & penalties
                      </h5>
                      <p className="text-gray-500 text-xs font-medium leading-relaxed">
                        Non-compliant vehicles pay a daily charge. Miss the
                        deadline and a penalty notice of up to £120 may follow.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="md:col-span-5 space-y-6">
                {/* SVG boundary box */}
                <div className="bg-[#0c2340] p-6 rounded-3xl relative overflow-hidden border border-white/5 shadow-xl text-left">
                  <div className="flex justify-between items-center text-[10px] font-black text-white/50 mb-4 uppercase tracking-wider">
                    <span>Abstract Zone Boundary Mockup</span>
                  </div>

                  <div className="h-44 w-full flex items-center justify-center relative bg-[#041224] rounded-2xl overflow-hidden border border-white/5 shadow-inner">
                    <svg width="100%" height="100%" className="absolute inset-0">
                      <line x1="50%" y1="0" x2="50%" y2="100%" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                      <line x1="0" y1="50%" x2="100%" y2="50%" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                      <circle cx="50%" cy="50%" r="45" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                      <circle cx="50%" cy="50%" r="75" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                      <line x1="10%" y1="10%" x2="90%" y2="90%" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="3 3" />
                      <line x1="90%" y1="10%" x2="10%" y2="90%" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="3 3" />

                      <polygon
                        points="105,45 155,55 175,90 145,135 95,115 85,75"
                        fill="rgba(16,185,129,0.08)"
                        stroke="#10b981"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                      />
                      <circle cx="130" cy="85" r="4" fill="#fff" className="animate-ping" />
                      <circle cx="130" cy="85" r="4" fill="#fff" />
                      <text x="95" y="90" fill="#10b981" fontSize="9" fontWeight="900" letterSpacing="1">
                        CAZ LIMITS
                      </text>
                    </svg>
                  </div>

                  <span className="text-[10px] text-white/50 font-bold block mt-4 text-center leading-relaxed">
                    Boundary area for {selectedZone.name}.
                  </span>
                </div>

                {/* Direct Actions */}
                <div className="space-y-3">
                  <Link
                    href={`/MultistepForm?cleanAirZone=${encodeURIComponent(selectedZone.name)}`}
                    onClick={() => setSelectedZone(null)}
                    className="block text-center w-full py-4 bg-[#00c076] hover:bg-[#00d884] text-white font-extrabold text-sm rounded-xl transition shadow-lg shadow-[#00c076]/20"
                  >
                    Process Payment for {selectedZone.name}
                  </Link>

                  <a
                    href="https://www.gov.uk/clean-air-zones"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center w-full py-4 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-extrabold text-sm rounded-xl transition"
                  >
                    Official Government Checker
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Coverage;


