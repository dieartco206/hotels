import React from 'react';
import { ShieldCheck, Award, ThumbsUp, Sparkles, Star, Tag } from 'lucide-react';

export function HeroSection({ onExploreDeals }) {
  return (
    <section className="relative bg-slate-900 text-white overflow-hidden pb-24 sm:pb-32 pt-8 sm:pt-14">
      {/* Background Photography with Sophisticated Dark/Blue Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1920&q=85"
          alt="Luxury Resort Indonesia"
          className="w-full h-full object-cover object-center filter brightness-[0.62] contrast-[1.08] scale-105"
        />
        {/* Subtle Traveloka-branded deep cerulean gradient overlay for high contrast text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-brand-900/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        <div className="max-w-3xl">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-semibold mb-4 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Epic Sale Awal Pekan: Diskon Kamar s.d 60%</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Pesan Hotel & Staycation Impian di Seluruh Indonesia
          </h1>

          {/* Subheading */}
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-200 font-normal leading-relaxed max-w-2xl">
            Dari resor tepi pantai di Bali hingga hotel bisnis bintang 5 di Jakarta. 
            Nikmati jaminan harga terendah, pembatalan fleksibel, dan bayar saat check-in.
          </p>

          {/* Value Propositions / Social Proof Badges */}
          <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-200">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Jaminan Harga Terbaik</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-300" />
              <span>100% Ulasan Tamu Asli</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-rose-400" />
              <span>Bebas Biaya Pemesanan</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
