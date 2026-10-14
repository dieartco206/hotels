import React, { useState, useEffect } from 'react';
import { Flame, Clock, Tag, ChevronRight, Star, MapPin, Check } from 'lucide-react';
import { formatRupiah } from '../utils/formatters';

export function FlashSaleBanner({ flashHotels, onSelectHotel }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Real-time ticking countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 43,
    seconds: 28
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatPad = (num) => String(num).padStart(2, '0');

  // Filter flash hotels based on tab
  const filteredFlashHotels = flashHotels.filter(hotel => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'bali') return hotel.city === 'Bali';
    if (selectedCategory === 'jakarta') return hotel.city === 'Jakarta';
    if (selectedCategory === 'bandung') return hotel.city === 'Bandung';
    if (selectedCategory === 'luxury') return hotel.starRating === 5;
    return true;
  });

  return (
    <section id="flash-sale" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
      {/* Container with warm light red/coral subtle border and gradient */}
      <div className="bg-gradient-to-r from-red-50/80 via-rose-50/60 to-orange-50/80 rounded-3xl border border-rose-200/90 p-5 sm:p-7 shadow-sm">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-cta text-white flex items-center justify-center shadow-md shadow-rose-200 shrink-0">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-rose-600 bg-rose-100 px-2.5 py-0.5 rounded-full">
                  Penawaran Kilat
                </span>
                <span className="text-xs text-slate-500 font-medium hidden sm:inline">Harga terendah dalam 30 hari terakhir</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                Koleksi Spesial Periode Terbatas
              </h2>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-white px-4 py-2 rounded-2xl border border-rose-200 shadow-xs">
            <Clock className="w-4 h-4 text-rose-500" />
            <span className="text-xs font-bold text-slate-600">Berakhir Dalam:</span>
            <div className="flex items-center gap-1 font-mono font-black text-rose-600 text-sm">
              <span className="bg-rose-50 px-2 py-0.5 rounded border border-rose-100">{formatPad(timeLeft.hours)}</span>
              <span>:</span>
              <span className="bg-rose-50 px-2 py-0.5 rounded border border-rose-100">{formatPad(timeLeft.minutes)}</span>
              <span>:</span>
              <span className="bg-rose-50 px-2 py-0.5 rounded border border-rose-100">{formatPad(timeLeft.seconds)}</span>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {[
            { id: 'all', label: 'Semua Penawaran' },
            { id: 'bali', label: '🏝️ Bali Retreat' },
            { id: 'jakarta', label: '🏙️ Jakarta Metropolitan' },
            { id: 'bandung', label: '⛰️ Bandung Sejuk' },
            { id: 'luxury', label: '⭐ Resor Bintang 5' },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 4 High-Discount Flash Sale Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredFlashHotels.slice(0, 4).map(hotel => (
            <div
              key={hotel.id}
              onClick={() => onSelectHotel(hotel)}
              className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-card hover:shadow-float hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              {/* Photo & Badges - STRICT UNIFORM HEIGHT (h-48) */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100 shrink-0">
                <img
                  src={hotel.mainImage}
                  alt={hotel.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Top-Left Discount Badge */}
                <div className="absolute top-2.5 left-2.5 bg-rose-600 text-white font-black text-xs px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  Hemat {hotel.discountPercent}%
                </div>

                {/* Top-Right Property Type Pill */}
                <div className="absolute top-2.5 right-2.5 bg-slate-900/70 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                  {hotel.type}
                </div>

                {/* Bottom-Left Rating Chip */}
                <div className="absolute bottom-2.5 left-2.5 bg-white/95 backdrop-blur-xs text-slate-900 text-[11px] font-black px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs border border-slate-200">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{hotel.rating}</span>
                  <span className="text-[10px] font-medium text-slate-500">/ 10</span>
                </div>
              </div>

              {/* Card Body - Dense, well-spaced, no awkward empty void */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 font-semibold">
                    <MapPin className="w-3 h-3 text-brand-600 shrink-0" />
                    <span className="truncate">{hotel.area}</span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base line-clamp-1 group-hover:text-brand-600 transition-colors">
                    {hotel.name}
                  </h3>

                  {/* Highlights pills */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-0.5 text-[10px] font-semibold text-emerald-700">
                    <span className="bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 flex items-center gap-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                      Sarapan Gratis
                    </span>
                    <span className="bg-blue-50 text-brand-700 px-2 py-0.5 rounded border border-blue-100">
                      Kolam Renang
                    </span>
                  </div>

                  {/* Quota Progress */}
                  <div className="pt-1.5">
                    <div className="flex justify-between items-center text-[11px] font-bold text-rose-600 mb-1">
                      <span>🔥 Sisa {hotel.flashSaleRemaining || 2} kamar promo</span>
                    </div>
                    <div className="w-full bg-rose-100 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-rose-500 h-full rounded-full transition-all"
                        style={{ width: `${100 - (hotel.flashSaleRemaining || 2) * 15}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="pt-3 border-t border-slate-100 flex items-end justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 line-through block font-medium">
                      {formatRupiah(hotel.originalPrice)}
                    </span>
                    <span className="text-base sm:text-lg font-black text-rose-600 leading-tight block">
                      {formatRupiah(hotel.price)}
                    </span>
                    <span className="text-[10px] text-slate-400 block font-medium">/malam (bersih)</span>
                  </div>
                  <button
                    type="button"
                    className="px-3.5 py-2 bg-cta hover:bg-cta-hover text-white text-xs font-black rounded-xl shadow-xs transition-colors shrink-0"
                  >
                    Klaim Kamar
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
