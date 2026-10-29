import React from 'react';
import { ShieldCheck, Award, Tag, Compass } from 'lucide-react';

export function HeroSection({ t }) {
  return (
    <section className="relative bg-slate-950 text-white overflow-hidden pb-24 sm:pb-28 pt-8 sm:pt-12">
      {/* Background Photography with Curated Luxury Atmosphere */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=1920&q=85"
          alt="Luxury Resort Nusantara"
          className="w-full h-full object-cover object-center filter brightness-[0.55] contrast-[1.05]"
        />
        {/* Deep Slate to Oceanic Sapphire subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        <div className="max-w-2xl">
          {/* Top Pill - Real travel badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold mb-3 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400"></span>
            <Compass className="w-3.5 h-3.5 text-blue-300" />
            <span>{t.heroBadge}</span>
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
            {t.heroTitle}
          </h1>

          {/* Subheading */}
          <p className="mt-2 text-sm sm:text-base text-slate-200 font-normal leading-relaxed max-w-xl">
            {t.heroSubtitle}
          </p>

          {/* Value Propositions */}
          <div className="mt-4 flex flex-wrap items-center gap-3 sm:gap-5 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.heroOfficialPartner}</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <Award className="w-3.5 h-3.5 text-amber-300" />
              <span>{t.heroRealReviews}</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <Tag className="w-3.5 h-3.5 text-rose-400" />
              <span>{t.heroTransparentPricing}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
