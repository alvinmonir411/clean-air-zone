"use client";
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin } from "lucide-react";

// Fix Leaflet default icon paths
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Custom green icon
const greenIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface Zone {
  name: string;
  coords: [number, number];
  description: string;
  charge: string;
}

const zones: Zone[] = [
  {
    name: "Bath",
    coords: [51.3758, -2.3599],
    description: "Class C zone covering central Bath",
    charge: "£9 for non-compliant vehicles",
  },
  {
    name: "Birmingham",
    coords: [52.4862, -1.8904],
    description: "Class D zone covering city centre",
    charge: "£8 for cars, £50 for HGVs",
  },
  {
    name: "Bradford",
    coords: [53.795, -1.7594],
    description: "Class C zone in city centre",
    charge: "£12.50 for HGVs, buses, coaches",
  },
  {
    name: "Bristol",
    coords: [51.4545, -2.5879],
    description: "Small zone in central Bristol",
    charge: "£9 for non-compliant cars",
  },
  {
    name: "Portsmouth",
    coords: [50.8198, -1.0879],
    description: "Class B zone on selected roads",
    charge: "£10 for non-compliant vehicles",
  },
  {
    name: "Newcastle & Gateshead",
    coords: [54.9783, -1.6178],
    description: "Tyneside zone covering Newcastle city centre",
    charge: "£12.50 for buses, coaches, HGVs",
  },
];

const ZonesMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [53, -1.5],
      zoom: 6,
      scrollWheelZoom: false,
    });
    mapInstanceRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    zones.forEach((zone) => {
      const marker = L.marker(zone.coords, { icon: greenIcon }).addTo(map);
      marker.bindPopup(`
        <div style="padding:4px;font-family:Inter,sans-serif;">
          <h3 style="font-weight:700;font-size:16px;color:#057a55;margin-bottom:4px;">${zone.name}</h3>
          <p style="font-size:13px;color:#4B5563;margin-bottom:8px;">${zone.description}</p>
          <div style="display:flex;align-items:center;gap:6px;background:#E0F2F1;padding:6px 10px;border-radius:6px;border:1px solid #CCFBF1;">
            <span style="width:8px;height:8px;border-radius:50%;background:#057a55;"></span>
            <span style="font-size:12px;font-weight:600;color:#057a55;">${zone.charge}</span>
          </div>
        </div>
      `);
    });

    map.fitBounds(L.latLngBounds(zones.map((z) => z.coords)), {
      padding: [50, 50],
    });

    return () => {
      mapInstanceRef.current?.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  const handleZoneClick = (coords: [number, number]) => {
    mapInstanceRef.current?.flyTo(coords, 12, { duration: 1.5 });
  };

  return (
    <section id="zones" className="pt-24 pb-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-5 py-2 rounded-full bg-[#057a55]/10 text-[#057a55] text-sm font-semibold mb-4">
            Active Locations
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#057a55] mb-4">
            UK Clean Air Zones Map
          </h2>
          <p className="text-gray-600 text-lg">
            Explore the current Clean Air Zones (CAZ) across the UK. Click on a
            zone card or map marker for detailed charge information.
          </p>
        </div>

        {/* Map + Zones */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2 rounded-2xl overflow-hidden border border-gray-200 bg-white">
            <div ref={mapRef} className="h-[450px] lg:h-[600px] w-full" />
          </div>

          {/* Zone Cards */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#057a55] mb-4">
              All Active Zones ({zones.length})
            </h3>
            {zones.map((zone, index) => (
              <div
                key={zone.name}
                onClick={() => handleZoneClick(zone.coords)}
                className="group bg-white p-5 rounded-xl border border-gray-200 hover:border-[#057a55] hover:shadow-lg transition-all duration-300 cursor-pointer animate-fade-up transform hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#057a55]/15 flex items-center justify-center group-hover:bg-[#057a55] transition-colors shrink-0">
                    <MapPin className="w-5 h-5 text-[#057a55] group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-extrabold text-lg text-gray-800 group-hover:text-[#057a55] transition-colors truncate">
                      {zone.name}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      <span className="font-semibold text-[#057a55]">
                        {zone.charge}
                      </span>
                      <span className="mx-2">•</span>
                      {zone.description.split(" ").slice(0, 5).join(" ")}...
                    </p>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#057a55] shadow-md shrink-0" />
                </div>
              </div>
            ))}
            <p className="text-xs text-gray-500 pt-4">
              * Tyneside includes both Newcastle and Gateshead CAZs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ZonesMap;
