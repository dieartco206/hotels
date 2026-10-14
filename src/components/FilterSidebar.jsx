import React from 'react';
import { 
  MapPin, 
  RotateCcw, 
  Star, 
  Coffee, 
  CreditCard, 
  CheckCircle2, 
  Waves, 
  Wifi, 
  Building,
  Palmtree,
  Home
} from 'lucide-react';
import { formatRupiah } from '../utils/formatters';

export function FilterSidebar({
  priceRange,
  setPriceRange,
  selectedStars,
  setSelectedStars,
  selectedFacilities,
  setSelectedFacilities,
  selectedPropertyType,
  setSelectedPropertyType,
  onResetFilters,
  onOpenMap,
  totalHotelsCount
}) {
  const handleStarToggle = (star) => {
    setSelectedStars(prev => 
      prev.includes(star) ? prev.filter(s => s !== star) : [...prev, star]
    );
  };

  const handleFacilityToggle = (facilityKey) => {
    setSelectedFacilities(prev => ({
      ...prev,
      [facilityKey]: !prev[facilityKey]
    }));
  };

  return (
    <aside className="w-full lg:w-[280px] shrink-0 space-y-5">
      
      {/* 1. Map Entry Card */}
      <div 
        onClick={onOpenMap}
        className="group relative h-32 rounded-2xl overflow-hidden border border-slate-200 cursor-pointer shadow-card hover:shadow-float transition-all duration-200"
      >
        {/* Realistic Styled Map Background */}
        <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
          <div className="w-full h-full bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:12px_12px] opacity-70"></div>
          {/* Mockup Map Roads */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-3/4 h-1 bg-slate-300 transform -rotate-12"></div>
            <div className="w-full h-1 bg-slate-300 transform rotate-45"></div>
            <div className="w-1 h-3/4 bg-blue-200"></div>
          </div>
        </div>

        {/* Center Pin Button */}
        <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/30 transition-colors flex flex-col items-center justify-center p-3 text-center">
          <div className="w-10 h-10 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform mb-1.5">
            <MapPin className="w-5 h-5" />
          </div>
          <span className="bg-white text-slate-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm border border-slate-200 group-hover:border-brand-500">
            Lihat di Peta Interaktif
          </span>
        </div>
      </div>

      {/* Main Filter Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-card space-y-6">
        
        {/* Filter Header with Reset */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">Filter Pencarian</h3>
            <span className="text-xs text-slate-500">{totalHotelsCount} properti cocok</span>
          </div>
          <button
            onClick={onResetFilters}
            className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 hover:underline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>

        {/* 2. Price Range Slider */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Harga Per Malam
            </label>
            <span className="text-xs font-extrabold text-brand-600">
              s.d {formatRupiah(priceRange)}
            </span>
          </div>
          <input
            type="range"
            min="1000000"
            max="10000000"
            step="200000"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full accent-brand-500"
          />
          <div className="flex justify-between items-center text-[11px] text-slate-400 mt-1.5 font-medium">
            <span>Rp 1.000.000</span>
            <span>Rp 10.000.000+</span>
          </div>
        </div>

        {/* 3. Star Rating Checkboxes */}
        <div className="pt-4 border-t border-slate-100">
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-3">
            Bintang Hotel
          </label>
          <div className="space-y-2.5">
            {[5, 4, 3].map((star) => (
              <label 
                key={star}
                className="flex items-center justify-between cursor-pointer group select-none text-xs"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedStars.includes(star)}
                    onChange={() => handleStarToggle(star)}
                    className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300"
                  />
                  <div className="flex items-center gap-1">
                    {Array.from({ length: star }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="font-semibold text-slate-700 ml-1">Bintang {star}</span>
                  </div>
                </div>
                <span className="text-slate-400 text-[11px]">
                  {star === 5 ? '9' : star === 4 ? '2' : '1'}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* 4. Popular & Facility Filters */}
        <div className="pt-4 border-t border-slate-100">
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-3">
            Fasilitas Populer
          </label>
          <div className="space-y-2.5">
            {/* Sarapan Gratis */}
            <label className="flex items-center justify-between cursor-pointer select-none text-xs">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedFacilities.freeBreakfast}
                  onChange={() => handleFacilityToggle('freeBreakfast')}
                  className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300"
                />
                <span className="font-medium text-slate-700 flex items-center gap-1.5">
                  <Coffee className="w-3.5 h-3.5 text-amber-600" />
                  Sarapan Gratis
                </span>
              </div>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded">
                Hemat
              </span>
            </label>

            {/* Pembatalan Gratis */}
            <label className="flex items-center justify-between cursor-pointer select-none text-xs">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedFacilities.freeCancellation}
                  onChange={() => handleFacilityToggle('freeCancellation')}
                  className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300"
                />
                <span className="font-medium text-slate-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Pembatalan Gratis
                </span>
              </div>
            </label>

            {/* Kolam Renang */}
            <label className="flex items-center justify-between cursor-pointer select-none text-xs">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedFacilities.hasPool}
                  onChange={() => handleFacilityToggle('hasPool')}
                  className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300"
                />
                <span className="font-medium text-slate-700 flex items-center gap-1.5">
                  <Waves className="w-3.5 h-3.5 text-blue-500" />
                  Kolam Renang
                </span>
              </div>
            </label>

            {/* WiFi Gratis */}
            <label className="flex items-center justify-between cursor-pointer select-none text-xs">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedFacilities.hasWifi}
                  onChange={() => handleFacilityToggle('hasWifi')}
                  className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300"
                />
                <span className="font-medium text-slate-700 flex items-center gap-1.5">
                  <Wifi className="w-3.5 h-3.5 text-slate-600" />
                  WiFi Gratis Cepat
                </span>
              </div>
            </label>

            {/* Bayar di Hotel */}
            <label className="flex items-center justify-between cursor-pointer select-none text-xs">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedFacilities.payAtHotel}
                  onChange={() => handleFacilityToggle('payAtHotel')}
                  className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300"
                />
                <span className="font-medium text-slate-700 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-purple-600" />
                  Bayar di Hotel
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* 5. Property Type */}
        <div className="pt-4 border-t border-slate-100">
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-3">
            Tipe Akomodasi
          </label>
          <div className="space-y-1.5">
            {[
              { id: 'all', label: 'Semua Tipe' },
              { id: 'Hotel', label: 'Hotel Bintang' },
              { id: 'Resort', label: 'Resor Liburan' },
              { id: 'Villa', label: 'Private Villa' },
              { id: 'Boutique Hotel', label: 'Hotel Butik Seni' },
            ].map(type => (
              <button
                key={type.id}
                onClick={() => setSelectedPropertyType(type.id)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                  selectedPropertyType === type.id
                    ? 'bg-brand-50 text-brand-600 font-bold border border-brand-200'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>{type.label}</span>
                {selectedPropertyType === type.id && <span className="text-brand-600">✓</span>}
              </button>
            ))}
          </div>
        </div>

      </div>
    </aside>
  );
}
