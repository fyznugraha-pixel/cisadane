"use client";

import { Map, Marker } from "pigeon-maps";

const MAP_CENTER: [number, number] = [-6.173000, 106.628400];

// CartoDB Voyager for a colored, vibrant, yet still elegant look
function cartoVoyager(x: number, y: number, z: number, dpr?: number) {
  return `https://cartodb-basemaps-a.global.ssl.fastly.net/rastertiles/voyager/${z}/${x}/${y}${dpr && dpr >= 2 ? '@2x' : ''}.png`;
}

export default function MapWrapper() {
  return (
    <div className="group relative h-full min-h-[420px] w-full overflow-hidden rounded-xl border border-[#2654A4]/15 shadow-md bg-[#FDFBF7]">
      <Map
        provider={cartoVoyager}
        defaultCenter={MAP_CENTER}
        defaultZoom={17.5}
        mouseEvents={false} // Disable scroll zoom so user doesn't get stuck
        touchEvents={false}
      >
        <Marker width={45} anchor={MAP_CENTER} color="#EC3A24" />
      </Map>

      {/* Interactive Overlay linking to Google Maps */}
      <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#041020]/5 opacity-0 transition-opacity duration-300 pointer-events-none group-hover:opacity-100">
        <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-[#2654A4]/20 bg-white/95 px-6 py-3 shadow-xl backdrop-blur-md transition-transform duration-300 hover:scale-105">
          <a
            href="https://www.google.com/maps/place/Jemb.+Brendeng,+Kota+Tangerang,+Banten/@-6.1731701,106.6288026,638a,35y,90h/data=!3m1!1e3!4m6!3m5!1s0x2e69ff32e0d4665b:0x8c9409dcfb32d6f1!8m2!3d-6.1702835!4d106.6280751!16s%2Fg%2F11g03j60r0"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#2654A4] transition-colors hover:text-[#EC3A24]"
          >
            Buka di Google Maps
          </a>
        </div>
      </div>

      {/* Decorative Inner Glow */}
      <div className="pointer-events-none absolute inset-0 z-0 shadow-[inset_0_0_60px_rgba(253,251,247,0.9)]" />
    </div>
  );
}
