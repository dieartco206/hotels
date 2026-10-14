import React, { useState, useEffect } from 'react';
import { Flame, Clock, Sparkles, ChevronRight, Star, MapPin } from 'lucide-react';
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
        return { hours: 12, minutes: 0, seconds: 0 }; // reset cycle
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
      <div className="bg-gradient-to-r from-red-50/70 via-rose-50/50 to-orange-50/70 rounded-3xl border border-rose-200/80 p-5 sm:p-7 shadow-sm">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-cta text-white flex items-center justify-center shadow-md shadow-rose-200">
              <Flame className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-rose-600 bg-rose-100 px-2 py-0.5 rounded-full">
                  Flash Deal Terbatas
                </span>
                <span className="text-xs text-slate-500 font-medium hidden sm:inline">Diperbarui setiap hari</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                Epic Sale Hotel Pilihan
              </h2>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-white px-4 py-2 rounded-2xl border border-rose-200 shadow-xs">
            <Clock className="w-4 h-4 text-rose-500 animate-spin-slow" />
            <span className="text-xs font-bold text-slate-600">Berakhir Dalam:</span>
            <div className="flex items-center gap-1 font-mono font-bold text-rose-600 text-sm">
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
            { id: 'all', label: 'Semua Flash Deal' },
            { id: 'bali', label: '🏝️ Bali Staycation' },
            { id: 'jakarta', label: '🏙️ Jakarta Central' },
            { id: 'bandung', label: '⛰️ Bandung Dingin' },
            { id: 'luxury', label: '⭐ Bintang 5 Eksklusif' },
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
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-card hover:shadow-float hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              {/* Photo & Badges */}
              <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                <img
                  src={hotel.mainImage}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2.5 left-2.5 bg-rose-600 text-white font-extrabold text-xs px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Hemat {hotel.discountPercent}%
                </div>
                <div className="absolute bottom-2.5 left-2.5 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  {hotel.rating} / 10
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium mb-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{hotel.area}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base line-clamp-1 group-hover:text-brand-600 transition-colors">
                    {hotel.name}
                  </h3>

                  {/* Quota Progress */}
                  <div className="mt-2.5">
                    <div className="flex justify-between items-center text-[11px] font-semibold text-rose-600 mb-1">
                      <span>🔥 Sisa {hotel.flashSaleRemaining || 2} kamar harga promo!</span>
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
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-end justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 line-through block">
                      {formatRupiah(hotel.originalPrice)}
                    </span>
                    <span className="text-base sm:text-lg font-black text-rose-600">
                      {formatRupiah(hotel.price)}
                    </span>
                    <span className="text-[10px] text-slate-500 block">/malam</span>
                  </div>
                  <button
                    type="button"
                    className="px-3 py-1.5 bg-cta hover:bg-cta-hover text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
                  >
                    Klaim Promo
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
