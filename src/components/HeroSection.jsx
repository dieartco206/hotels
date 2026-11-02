import React from 'react';

export function HeroSection() {
  return (
    <section className="relative bg-slate-950 text-white overflow-hidden min-h-[440px] sm:min-h-[500px] lg:min-h-[560px] flex flex-col justify-center items-center pt-24 sm:pt-32 lg:pt-36 pb-36 sm:pb-44 lg:pb-48">
      {/* Background Photography with Grand Luxury Atmosphere */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=1920&q=85"
          alt="Luxury Resort Malaysia"
          className="w-full h-full object-cover object-center filter brightness-[0.55] contrast-[1.05]"
        />
        {/* Deep Slate to Oceanic Sapphire subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-900/35" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center">
        {/* Heading Only - Centered with Grand Luxury Typography */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight drop-shadow-md text-center max-w-4xl mx-auto">
          Hotel & Resort Mewah Terbaik di Malaysia
        </h1>
      </div>
    </section>
  );
}

