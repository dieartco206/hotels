import React, { useState, useRef, useEffect } from 'react';
import { 
  Building2, 
  Palmtree, 
  Clock, 
  Sparkles, 
  MapPin, 
  Calendar, 
  Users, 
  Search, 
  Plus, 
  Minus, 
  Check,
  ChevronDown,
  X
} from 'lucide-react';
import { calculateNights, formatDateIndo } from '../utils/formatters';

const POPULAR_DESTINATIONS = [
  { city: 'Semua Kota', province: 'Seluruh Indonesia', type: 'Semua' },
  { city: 'Bali', province: 'Pulau Dewata', type: 'Destinasi Populer' },
  { city: 'Jakarta', province: 'DKI Jakarta', type: 'Kota Metropolitan' },
  { city: 'Bandung', province: 'Jawa Barat', type: 'Wisata Sejuk' },
  { city: 'Yogyakarta', province: 'DI Yogyakarta', type: 'Wisata Budaya' },
  { city: 'Surabaya', province: 'Jawa Timur', type: 'Pusat Bisnis' },
];

export function SearchWidget({
  activeCity,
  setActiveCity,
  searchQuery,
  setSearchQuery,
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
  guests,
  setGuests,
  quickFilters,
  setQuickFilters,
  onSearchSubmit
}) {
  const [activeTab, setActiveTab] = useState('hotel'); // 'hotel' | 'villa' | 'hourly' | 'special'
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);

  const cityRef = useRef(null);
  const guestsRef = useRef(null);
  const dateRef = useRef(null);

  // Close popovers on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (cityRef.current && !cityRef.current.contains(event.target)) {
        setIsCityOpen(false);
      }
      if (guestsRef.current && !guestsRef.current.contains(event.target)) {
        setIsGuestsOpen(false);
      }
      if (dateRef.current && !dateRef.current.contains(event.target)) {
        setIsDateOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const nights = calculateNights(checkInDate, checkOutDate);

  const handleCitySelect = (cityName) => {
    setActiveCity(cityName);
    setIsCityOpen(false);
  };

  const handleQuickFilterToggle = (key) => {
    setQuickFilters(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="relative z-30 max-w-6xl mx-auto px-4 sm:px-6 -mt-20 sm:-mt-24">
      {/* Container Card */}
      <div className="bg-white rounded-3xl shadow-float border border-slate-200/90 p-4 sm:p-6 transition-all">
        {/* Tabs inside Widget */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 border-b border-slate-100 scrollbar-none">
          <button
            onClick={() => setActiveTab('hotel')}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'hotel'
                ? 'bg-brand-50 text-brand-600 border border-brand-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Building2 className="w-4 h-4" />
            Hotel
          </button>

          <button
            onClick={() => setActiveTab('villa')}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'villa'
                ? 'bg-brand-50 text-brand-600 border border-brand-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Palmtree className="w-4 h-4 text-emerald-600" />
            Villa & Apartemen
          </button>

          <button
            onClick={() => setActiveTab('hourly')}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'hourly'
                ? 'bg-brand-50 text-brand-600 border border-brand-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Clock className="w-4 h-4 text-amber-500" />
            Hotel Jam-jaman
            <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold">Transit</span>
          </button>

          <button
            onClick={() => setActiveTab('special')}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'special'
                ? 'bg-brand-50 text-brand-600 border border-brand-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Sparkles className="w-4 h-4 text-rose-500" />
            Penawaran Spesial
            <span className="text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded font-bold">Hemat 60%</span>
          </button>
        </div>

        {/* Input Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">
          
          {/* 1. Destination Input */}
          <div className="md:col-span-4 relative" ref={cityRef}>
            <label className="block text-xs font-bold text-slate-500 mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-brand-500" />
              Kota, Tujuan, atau Nama Hotel
            </label>
            <div 
              onClick={() => setIsCityOpen(!isCityOpen)}
              className="flex items-center gap-3 px-3.5 py-2.5 bg-slate-50 hover:bg-white border border-slate-300 hover:border-brand-500 rounded-xl cursor-pointer transition-all h-[52px]"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-brand-600 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-slate-400 font-medium">Tujuan Liburan</p>
                <p className="text-sm font-bold text-slate-800 truncate">
                  {searchQuery ? searchQuery : activeCity}
                </p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
            </div>

            {/* City Selector Dropdown */}
            {isCityOpen && (
              <div className="absolute left-0 top-[82px] w-full sm:w-[360px] bg-white rounded-2xl shadow-float border border-slate-200 p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cari Tujuan</span>
                  <button onClick={() => setIsCityOpen(false)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Search field inside dropdown */}
                <div className="relative mb-3">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Ketik kota atau nama hotel..."
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
                    >
                      Hapus
                    </button>
                  )}
                </div>

                {/* Popular City Pills */}
                <div className="mb-2">
                  <span className="text-xs font-semibold text-slate-700 block mb-2">Destinasi Populer:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {POPULAR_DESTINATIONS.map((dest) => (
                      <button
                        key={dest.city}
                        onClick={() => handleCitySelect(dest.city)}
                        className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${
                          activeCity === dest.city && !searchQuery
                            ? 'bg-brand-500 text-white font-bold'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {dest.city}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Destination List */}
                <div className="mt-3 pt-3 border-t border-slate-100 max-h-52 overflow-y-auto space-y-1">
                  {POPULAR_DESTINATIONS.map((dest) => (
                    <button
                      key={dest.city}
                      onClick={() => handleCitySelect(dest.city)}
                      className="w-full text-left p-2 rounded-xl hover:bg-slate-50 flex items-center justify-between group transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <MapPin className="w-4 h-4 text-slate-400 group-hover:text-brand-500" />
                        <div>
                          <div className="text-sm font-bold text-slate-800">{dest.city}</div>
                          <div className="text-xs text-slate-500">{dest.province}</div>
                        </div>
                      </div>
                      <span className="text-[11px] text-slate-400 font-medium">{dest.type}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 2. Check-in & Check-out Date Selector */}
          <div className="md:col-span-4 relative" ref={dateRef}>
            <label className="block text-xs font-bold text-slate-500 mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-brand-500" />
                Tanggal Check-in & Check-out
              </span>
              <span className="text-[11px] font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">
                {nights} Malam
              </span>
            </label>
            <div 
              onClick={() => setIsDateOpen(!isDateOpen)}
              className="flex items-center justify-between px-3.5 py-2.5 bg-slate-50 hover:bg-white border border-slate-300 hover:border-brand-500 rounded-xl cursor-pointer transition-all h-[52px]"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-slate-400 font-medium">Jadwal Menginap</div>
                  <div className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                    {formatDateIndo(checkInDate)} - {formatDateIndo(checkOutDate)}
                  </div>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
            </div>

            {/* Date Picker Popover */}
            {isDateOpen && (
              <div className="absolute left-0 top-[82px] w-full sm:w-[380px] bg-white rounded-2xl shadow-float border border-slate-200 p-5 z-50 animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Pilih Tanggal Menginap</h4>
                    <p className="text-xs text-slate-500">Durasi: {nights} Malam</p>
                  </div>
                  <button onClick={() => setIsDateOpen(false)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Check-in</label>
                    <input
                      type="date"
                      value={checkInDate}
                      onChange={(e) => {
                        setCheckInDate(e.target.value);
                        if (new Date(e.target.value) >= new Date(checkOutDate)) {
                          const nextDay = new Date(e.target.value);
                          nextDay.setDate(nextDay.getDate() + 1);
                          setCheckOutDate(nextDay.toISOString().split('T')[0]);
                        }
                      }}
                      className="w-full text-xs font-semibold px-2.5 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Check-out</label>
                    <input
                      type="date"
                      value={checkOutDate}
                      min={checkInDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      className="w-full text-xs font-semibold px-2.5 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="bg-blue-50/70 rounded-xl p-3 text-xs text-slate-600 flex items-center justify-between mb-3">
                  <span>Total Durasi Menginap:</span>
                  <span className="font-bold text-brand-700 bg-white px-2 py-0.5 rounded shadow-2xs">
                    {nights} Malam Menginap
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsDateOpen(false)}
                  className="w-full py-2 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl transition-colors"
                >
                  Terapkan Tanggal
                </button>
              </div>
            )}
          </div>

          {/* 3. Guests & Rooms Selector */}
          <div className="md:col-span-3 relative" ref={guestsRef}>
            <label className="block text-xs font-bold text-slate-500 mb-1 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-brand-500" />
              Tamu & Kamar
            </label>
            <div 
              onClick={() => setIsGuestsOpen(!isGuestsOpen)}
              className="flex items-center justify-between px-3.5 py-2.5 bg-slate-50 hover:bg-white border border-slate-300 hover:border-brand-500 rounded-xl cursor-pointer transition-all h-[52px]"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-slate-400 font-medium">Kapasitas Tamu</div>
                  <div className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                    {guests.adults} Dewasa, {guests.rooms} Kamar
                  </div>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
            </div>

            {/* Guests Popover Counter */}
            {isGuestsOpen && (
              <div className="absolute right-0 top-[82px] w-full sm:w-72 bg-white rounded-2xl shadow-float border border-slate-200 p-4 z-50 animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
                  <h4 className="text-sm font-bold text-slate-800">Jumlah Tamu & Kamar</h4>
                  <button onClick={() => setIsGuestsOpen(false)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Dewasa */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-slate-800">Dewasa</div>
                      <div className="text-xs text-slate-500">Usia 18 tahun ke atas</div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => setGuests(prev => ({ ...prev, adults: Math.max(1, prev.adults - 1) }))}
                        disabled={guests.adults <= 1}
                        className="w-8 h-8 rounded-lg border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-40"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm font-bold text-slate-800">{guests.adults}</span>
                      <button
                        type="button"
                        onClick={() => setGuests(prev => ({ ...prev, adults: prev.adults + 1 }))}
                        className="w-8 h-8 rounded-lg border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Anak-anak */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-slate-800">Anak-anak</div>
                      <div className="text-xs text-slate-500">Usia 0 - 17 tahun</div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => setGuests(prev => ({ ...prev, children: Math.max(0, prev.children - 1) }))}
                        disabled={guests.children <= 0}
                        className="w-8 h-8 rounded-lg border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-40"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm font-bold text-slate-800">{guests.children}</span>
                      <button
                        type="button"
                        onClick={() => setGuests(prev => ({ ...prev, children: prev.children + 1 }))}
                        className="w-8 h-8 rounded-lg border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Kamar */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div>
                      <div className="text-sm font-bold text-slate-800">Kamar</div>
                      <div className="text-xs text-slate-500">Jumlah unit kamar</div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => setGuests(prev => ({ ...prev, rooms: Math.max(1, prev.rooms - 1) }))}
                        disabled={guests.rooms <= 1}
                        className="w-8 h-8 rounded-lg border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-40"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm font-bold text-slate-800">{guests.rooms}</span>
                      <button
                        type="button"
                        onClick={() => setGuests(prev => ({ ...prev, rooms: prev.rooms + 1 }))}
                        className="w-8 h-8 rounded-lg border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsGuestsOpen(false)}
                  className="w-full mt-4 py-2 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl transition-colors"
                >
                  Selesai
                </button>
              </div>
            )}
          </div>

          {/* 4. Search CTA Button (#FF5E1F Vibrant Coral Orange) */}
          <div className="md:col-span-1 flex flex-col justify-end">
            <button
              onClick={onSearchSubmit}
              className="w-full h-[52px] bg-cta hover:bg-cta-hover text-white font-extrabold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group active:scale-95"
              title="Cari Hotel Sekarang"
            >
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="md:hidden font-bold">Cari Hotel</span>
            </button>
          </div>

        </div>

        {/* Bottom Quick Filter Bar inside Widget */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-semibold text-slate-500">Filter Cepat:</span>
            
            {/* Bayar di Hotel */}
            <label className="flex items-center gap-1.5 cursor-pointer hover:text-slate-900 select-none">
              <input
                type="checkbox"
                checked={quickFilters.payAtHotel}
                onChange={() => handleQuickFilterToggle('payAtHotel')}
                className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300"
              />
              <span className="font-medium">Bayar di Hotel</span>
            </label>

            {/* Sarapan Gratis */}
            <label className="flex items-center gap-1.5 cursor-pointer hover:text-slate-900 select-none">
              <input
                type="checkbox"
                checked={quickFilters.freeBreakfast}
                onChange={() => handleQuickFilterToggle('freeBreakfast')}
                className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300"
              />
              <span className="font-medium text-emerald-700">✓ Sarapan Gratis</span>
            </label>

            {/* Bintang 4+ */}
            <label className="flex items-center gap-1.5 cursor-pointer hover:text-slate-900 select-none">
              <input
                type="checkbox"
                checked={quickFilters.fourStarsPlus}
                onChange={() => handleQuickFilterToggle('fourStarsPlus')}
                className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300"
              />
              <span className="font-medium">Hotel Bintang 4+</span>
            </label>

            {/* Pembatalan Gratis */}
            <label className="flex items-center gap-1.5 cursor-pointer hover:text-slate-900 select-none">
              <input
                type="checkbox"
                checked={quickFilters.freeCancellation}
                onChange={() => handleQuickFilterToggle('freeCancellation')}
                className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300"
              />
              <span className="font-medium text-emerald-700">✓ Pembatalan Gratis</span>
            </label>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-slate-400">
            <span>💡 Lebih dari 128.000 hotel mitra terpercaya</span>
          </div>
        </div>

      </div>
    </div>
  );
}
