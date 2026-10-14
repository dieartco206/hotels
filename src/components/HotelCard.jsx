import React, { useState } from 'react';
import { 
  Heart, 
  MapPin, 
  Star, 
  Wifi, 
  Waves, 
  Utensils, 
  Sparkles, 
  Check, 
  CreditCard,
  Building,
  Dumbbell
} from 'lucide-react';
import { formatRupiah, getRatingDescription } from '../utils/formatters';

export function HotelCard({ 
  hotel, 
  onSelectHotel, 
  onToggleWishlist, 
  isWishlisted 
}) {
  const [activePhoto, setActivePhoto] = useState(hotel.mainImage);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-card hover:shadow-float hover:border-slate-300 transition-all duration-200 group flex flex-col md:flex-row">
      
      {/* 1. Left (32% width): Photos & Badges */}
      <div className="w-full md:w-[32%] p-3 flex flex-col justify-between shrink-0">
        <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-slate-100">
          <img
            src={activePhoto}
            alt={hotel.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Wishlist Heart Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(hotel);
            }}
            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-500 hover:text-rose-500 hover:bg-white shadow-sm transition-all z-10"
            title={isWishlisted ? "Hapus dari Wishlist" : "Simpan ke Wishlist"}
          >
            <Heart className={`w-4 h-4 transition-transform active:scale-125 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>

          {/* Ribbon Badge */}
          {hotel.badge && (
            <div className="absolute top-2.5 left-2.5 bg-brand-600/95 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              {hotel.badge}
            </div>
          )}
        </div>

        {/* Thumbnail Strip (3 smaller photos) */}
        {hotel.thumbnails && hotel.thumbnails.length > 0 && (
          <div className="grid grid-cols-4 gap-1.5 mt-2">
            <button
              onClick={() => setActivePhoto(hotel.mainImage)}
              className={`relative aspect-4/3 rounded-lg overflow-hidden border-2 transition-all ${
                activePhoto === hotel.mainImage ? 'border-brand-500 shadow-2xs' : 'border-transparent opacity-75 hover:opacity-100'
              }`}
            >
              <img src={hotel.mainImage} alt="Main" className="w-full h-full object-cover" />
            </button>
            {hotel.thumbnails.slice(0, 3).map((thumb, idx) => (
              <button
                key={idx}
                onClick={() => setActivePhoto(thumb)}
                className={`relative aspect-4/3 rounded-lg overflow-hidden border-2 transition-all ${
                  activePhoto === thumb ? 'border-brand-500 shadow-2xs' : 'border-transparent opacity-75 hover:opacity-100'
                }`}
              >
                <img src={thumb} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 2. Middle (43% width): Hotel Details & Facilities */}
      <div 
        onClick={() => onSelectHotel(hotel)}
        className="w-full md:w-[43%] p-4 flex flex-col justify-between cursor-pointer border-t md:border-t-0 md:border-r border-slate-100"
      >
        <div>
          {/* Property Type & Star Rating */}
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md uppercase tracking-wider">
              {hotel.type}
            </span>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: hotel.starRating }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>

          {/* Hotel Name */}
          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-1">
            {hotel.name}
          </h3>

          {/* Location & Distance */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
            <MapPin className="w-3.5 h-3.5 text-brand-500 shrink-0" />
            <span className="font-medium text-slate-700">{hotel.area}</span>
            <span className="text-slate-300">•</span>
            <span className="truncate">{hotel.distanceText}</span>
          </div>

          {/* Facilities Icons Row */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mt-3 pt-3 border-t border-slate-100">
            {hotel.hasWifi && (
              <span className="flex items-center gap-1">
                <Wifi className="w-3.5 h-3.5 text-slate-500" />
                WiFi
              </span>
            )}
            {hotel.hasPool && (
              <span className="flex items-center gap-1">
                <Waves className="w-3.5 h-3.5 text-blue-500" />
                Kolam Renang
              </span>
            )}
            {hotel.hasRestaurant && (
              <span className="flex items-center gap-1">
                <Utensils className="w-3.5 h-3.5 text-amber-600" />
                Restoran
              </span>
            )}
            {hotel.hasGym && (
              <span className="flex items-center gap-1">
                <Dumbbell className="w-3.5 h-3.5 text-slate-500" />
                Gym
              </span>
            )}
          </div>
        </div>

        {/* Green Trust Badges */}
        <div className="mt-3.5 flex flex-wrap gap-2 text-xs">
          {hotel.freeBreakfast && (
            <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md font-semibold">
              <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
              Sarapan Gratis
            </span>
          )}
          {hotel.freeCancellation && (
            <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md font-semibold">
              <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
              Bisa Refund
            </span>
          )}
          {hotel.payAtHotel && (
            <span className="inline-flex items-center gap-1 text-slate-700 bg-slate-100 px-2 py-1 rounded-md font-medium text-[11px]">
              <CreditCard className="w-3 h-3 text-slate-500" />
              Bayar di Hotel
            </span>
          )}
        </div>
      </div>

      {/* 3. Right (25% width): Rating Badge, Pricing & CTA */}
      <div className="w-full md:w-[25%] p-4 bg-slate-50/50 flex flex-col justify-between">
        
        {/* Top Right: Traveloka-style Rating Badge */}
        <div className="flex items-start justify-end gap-2.5 text-right">
          <div>
            <div className="text-xs font-bold text-slate-800">
              {getRatingDescription(hotel.rating)}
            </div>
            <div className="text-[11px] text-slate-400">
              {hotel.reviewsCount.toLocaleString('id-ID')} ulasan
            </div>
          </div>
          <div className="w-10 h-8 rounded-lg bg-brand-500 text-white font-extrabold text-sm flex items-center justify-center shadow-xs shrink-0">
            {hotel.rating}
          </div>
        </div>

        {/* Bottom Right: Price & CTA Button */}
        <div className="mt-4 pt-3 text-right">
          {/* Strikethrough original price & discount tag */}
          <div className="flex items-center justify-end gap-1.5 mb-0.5">
            <span className="text-xs text-slate-400 line-through">
              {formatRupiah(hotel.originalPrice)}
            </span>
            <span className="bg-rose-100 text-rose-700 font-extrabold text-[10px] px-1.5 py-0.5 rounded">
              Hemat {hotel.discountPercent}%
            </span>
          </div>

          {/* Large Bold Final Price */}
          <div className="text-xl sm:text-2xl font-black text-cta leading-tight">
            {formatRupiah(hotel.price)}
          </div>
          <span className="text-[10px] text-slate-400 block mb-3 font-medium">
            Di luar pajak & biaya
          </span>

          {/* CTA "Pilih Kamar" */}
          <button
            onClick={() => onSelectHotel(hotel)}
            className="w-full py-2.5 bg-cta hover:bg-cta-hover text-white font-extrabold text-sm rounded-xl shadow-sm hover:shadow transition-all duration-150 flex items-center justify-center gap-1 active:scale-98"
          >
            Pilih Kamar
          </button>
        </div>

      </div>

    </div>
  );
}
