import React from 'react';
import { ShieldCheck, Award, Tag, Compass, MapPin } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative bg-slate-950 text-white overflow-hidden pb-24 sm:pb-32 pt-10 sm:pt-16">
      {/* Background Photography with Curated Luxury Atmosphere */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1920&q=85"
          alt="Luxury Resort Nusantara"
          className="w-full h-full object-cover object-center filter brightness-[0.55] contrast-[1.05]"
        />
        {/* Deep Slate to Oceanic Sapphire subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        <div className="max-w-3xl">
          {/* Top Pill - Real travel badge, NO AI sparkles */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold mb-4 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400"></span>
            <Compass className="w-3.5 h-3.5 text-blue-300" />
            <span>Koleksi Eksklusif Musim Liburan 2026</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Kurasi Hotel & Resor Berkarakter di Seluruh Nusantara
          </h1>

          {/* Subheading */}
          <p className="mt-3.5 text-base sm:text-lg text-slate-200 font-normal leading-relaxed max-w-2xl">
            Dari villa tebing samudra di Bali hingga suite metropolitan di Jakarta. 
            Setiap properti dikurasi dengan standar kenyamanan tinggi dan jaminan harga terbaik.
          </p>

          {/* Value Propositions */}
          <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-2 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Mitra Resmi Terverifikasi</span>
            </div>
            <div className="flex items-center gap-2 font-medium">
              <Award className="w-4 h-4 text-amber-300" />
              <span>100% Ulasan Tamu Asli</span>
            </div>
            <div className="flex items-center gap-2 font-medium">
              <Tag className="w-4 h-4 text-rose-400" />
              <span>Harga Transparan & Bebas Biaya Terselubung</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
