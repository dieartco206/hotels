import React from 'react';
import { 
  Heart, 
  MapPin, 
  Star, 
  Award, 
  Check, 
  CreditCard 
} from 'lucide-react';
import { formatRupiah, getRatingDescription } from '../utils/formatters';

export function HotelGridCard({ 
  hotel, 
  onSelectHotel, 
  onToggleWishlist, 
  isWishlisted 
}) {
  return (
    <div 
      onClick={() => onSelectHotel(hotel)}
      className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-card hover:shadow-float hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between group"
    >
      {/* Photo & Top Badges */}
      <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
        <img
          src={hotel.mainImage}
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
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Ribbon Badge - Zero AI sparkles */}
        {hotel.badge && (
          <div className="absolute top-2.5 left-2.5 bg-brand-700/95 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
            <Award className="w-3 h-3 text-amber-300" />
            {hotel.badge}
          </div>
        )}

        {/* Rating Floating Tag */}
        <div className="absolute bottom-2.5 right-2.5 bg-brand-500 text-white text-xs font-black px-2 py-0.5 rounded-lg shadow-sm">
          {hotel.rating} / 10
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Property Type & Star Rating */}
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded uppercase">
              {hotel.type}
            </span>
            <div className="flex items-center">
              {Array.from({ length: hotel.starRating }).map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>

          {/* Hotel Name */}
          <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-1">
            {hotel.name}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
            <MapPin className="w-3.5 h-3.5 text-brand-500 shrink-0" />
            <span className="truncate">{hotel.area}</span>
          </div>

          {/* Badges */}
          <div className="mt-2.5 flex flex-wrap gap-1.5 text-[11px]">
            {hotel.freeBreakfast && (
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold flex items-center gap-1">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
                Sarapan
              </span>
            )}
            {hotel.freeCancellation && (
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold flex items-center gap-1">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
                Bisa Refund
              </span>
            )}
          </div>
        </div>

        {/* Bottom Price & CTA */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-1">
              <span className="text-[11px] text-slate-400 line-through">
                {formatRupiah(hotel.originalPrice)}
              </span>
              <span className="bg-rose-100 text-rose-700 font-extrabold text-[9px] px-1 py-0.2 rounded">
                -{hotel.discountPercent}%
              </span>
            </div>
            <div className="text-lg font-black text-cta">
              {formatRupiah(hotel.price)}
            </div>
            <span className="text-[10px] text-slate-400 block">/malam</span>
          </div>

          <button
            type="button"
            className="px-3 py-2 bg-cta hover:bg-cta-hover text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
          >
            Pilih Kamar
          </button>
        </div>
      </div>
    </div>
  );
}
