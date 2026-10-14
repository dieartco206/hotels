import React, { useState } from 'react';
import { X, MapPin, Star, Building2, ChevronRight } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export function InteractiveMapModal({ 
  hotels, 
  onClose, 
  onSelectHotel,
  t,
  currency = 'IDR'
}) {
  const [activeHotel, setActiveHotel] = useState(hotels[0] || null);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-modal border border-slate-200 w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-white px-6 py-4 border-b border-slate-200 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">{t?.mapTitle || 'Peta Lokasi Hotel & Resor'}</h3>
              <p className="text-xs text-slate-500">{t?.mapSubtitle || 'Klik pin harga untuk melihat pratinjau akomodasi'}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Map Canvas and Interactive Pins */}
        <div className="relative flex-1 bg-slate-100 overflow-hidden">
          
          {/* Subtle Map Grid & Vector Terrain Styling */}
          <div className="absolute inset-0 bg-[#E8ECEF] bg-[radial-gradient(#cbd5e1_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>
          
          {/* Mockup River / Coastline & Roads */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
            <path d="M-50,200 Q200,100 450,250 T900,150 T1400,300" fill="none" stroke="#93c5fd" strokeWidth="32" />
            <path d="M100,-20 L300,600" fill="none" stroke="#cbd5e1" strokeWidth="8" />
            <path d="M-20,380 L1200,380" fill="none" stroke="#cbd5e1" strokeWidth="12" />
            <path d="M400,-50 L650,650" fill="none" stroke="#cbd5e1" strokeWidth="6" />
          </svg>

          {/* Interactive Hotel Pins */}
          <div className="absolute inset-0 p-8 sm:p-12 overflow-auto">
            <div className="relative w-full h-full min-h-[450px]">
              {hotels.map((hotel, index) => {
                // Distribute pins across the map canvas visually
                const topPercent = 20 + ((index * 37) % 65);
                const leftPercent = 15 + ((index * 43) % 70);
                const isSelected = activeHotel?.id === hotel.id;

                return (
                  <div
                    key={hotel.id}
                    style={{ top: `${topPercent}%`, left: `${leftPercent}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                  >
                    <button
                      onClick={() => setActiveHotel(hotel)}
                      className={`group transition-all duration-200 flex flex-col items-center ${
                        isSelected ? 'scale-115 z-30' : 'hover:scale-105'
                      }`}
                    >
                      {/* Price Pill Tag */}
                      <div className={`px-2.5 py-1 rounded-full text-xs font-black shadow-md border flex items-center gap-1 transition-all ${
                        isSelected 
                          ? 'bg-cta text-white border-cta shadow-lg' 
                          : 'bg-white text-slate-800 border-slate-300 hover:border-brand-500 hover:text-brand-600'
                      }`}>
                        <span>{formatCurrency(hotel.price, currency)}</span>
                      </div>
                      {/* Pin arrow indicator */}
                      <div className={`w-2 h-2 rotate-45 -mt-1 ${isSelected ? 'bg-cta' : 'bg-white'}`} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Floating Selected Hotel Card (Bottom Left) */}
          {activeHotel && (
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-96 bg-white rounded-2xl shadow-float border border-slate-200 p-4 z-30 animate-in slide-in-from-bottom-4 duration-200">
              <div className="flex gap-3.5">
                <img
                  src={activeHotel.mainImage}
                  alt={activeHotel.name}
                  className="w-24 h-24 rounded-xl object-cover shrink-0 bg-slate-100"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 mb-0.5">
                    <span>{activeHotel.type}</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5 text-amber-500">
                      <Star className="w-3 h-3 fill-amber-400" />
                      {activeHotel.starRating}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm truncate">
                    {activeHotel.name}
                  </h4>
                  <p className="text-xs text-slate-500 truncate mt-0.5">
                    {activeHotel.area}
                  </p>

                  <div className="mt-2 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 line-through block text-[10px]">
                        {formatCurrency(activeHotel.originalPrice, currency)}
                      </span>
                      <span className="text-sm font-black text-cta">
                        {formatCurrency(activeHotel.price, currency)}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        onClose();
                        onSelectHotel(activeHotel);
                      }}
                      className="px-3 py-1.5 bg-cta hover:bg-cta-hover text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center gap-0.5"
                    >
                      {t?.selectRoomBtn || 'Pilih Kamar'}
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
