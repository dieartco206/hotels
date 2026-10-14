import React from 'react';
import { X, Heart, Trash2, ChevronRight, Star } from 'lucide-react';
import { formatRupiah } from '../utils/formatters';

export function WishlistDrawer({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onSelectHotel
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <Heart className="w-4 h-4 fill-rose-500" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Hotel Disimpan</h3>
              <p className="text-xs text-slate-500">{wishlist.length} properti di wishlist Anda</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {wishlist.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                <Heart className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-slate-800">Belum ada hotel tersimpan</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Klik ikon hati pada hotel mana pun untuk menyimpannya ke daftar liburan favorit Anda.
              </p>
            </div>
          ) : (
            wishlist.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-white rounded-2xl border border-slate-200 p-3 shadow-xs hover:border-brand-300 transition-all flex gap-3 group"
              >
                <img
                  src={hotel.mainImage}
                  alt={hotel.name}
                  className="w-20 h-20 rounded-xl object-cover shrink-0 bg-slate-100"
                />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        {hotel.city}
                      </span>
                      <button
                        onClick={() => onRemoveFromWishlist(hotel.id)}
                        className="text-slate-300 hover:text-rose-500 transition-colors p-1"
                        title="Hapus"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <h5 className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                      {hotel.name}
                    </h5>
                    <div className="flex items-center gap-1 text-[11px] text-amber-500 font-semibold mt-0.5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{hotel.rating} / 10</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-100">
                    <span className="text-xs font-black text-cta">
                      {formatRupiah(hotel.price)}
                    </span>
                    <button
                      onClick={() => {
                        onClose();
                        onSelectHotel(hotel);
                      }}
                      className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center"
                    >
                      Pilih
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlist.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50">
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
            >
              Lanjutkan Eksplorasi
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
