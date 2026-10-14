import React, { useState } from 'react';
import { 
  Building2, 
  Heart, 
  User, 
  Percent, 
  FileText, 
  Menu, 
  X,
  Palmtree,
  ShieldCheck,
  ChevronDown,
  Compass,
  PhoneCall
} from 'lucide-react';

export function Navbar({ wishlistCount = 0, onOpenWishlist, onSelectPromo }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [authModal, setAuthModal] = useState(null); // 'login' | 'register' | null

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all duration-200 shadow-xs">
        {/* Top Utility Bar */}
        <div className="hidden lg:block border-b border-slate-100 bg-slate-50/80 text-xs text-slate-500 py-1.5 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Jaminan Harga Terbaik & Konfirmasi Langsung dari Hotel
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1 text-slate-600">
                <PhoneCall className="w-3 h-3 text-slate-400" />
                Concierge 24 Jam: 021-5088-9000
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <a 
                href="#partner" 
                onClick={(e) => { e.preventDefault(); alert('Portal Mitra Properti NusaStay: Gabung bersama lebih dari 2.500 akomodasi terbaik di Indonesia.'); }}
                className="hover:text-brand-600 flex items-center gap-1.5 font-medium transition-colors"
              >
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                Daftarkan Properti
              </a>
              <span className="text-slate-300">•</span>
              
              {/* Currency Selector */}
              <div className="relative">
                <button 
                  onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                  className="flex items-center gap-1.5 hover:text-slate-900 transition-colors font-semibold text-slate-700"
                >
                  <span className="inline-block w-4 h-3 bg-red-600 relative overflow-hidden rounded-xs border border-slate-200 shadow-2xs">
                    <span className="absolute bottom-0 left-0 right-0 h-1/2 bg-white"></span>
                  </span>
                  <span>IDR (Rp)</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {currencyDropdownOpen && (
                  <div className="absolute right-0 top-6 w-44 bg-white rounded-xl shadow-float border border-slate-200 py-2 text-left z-50">
                    <div className="px-3 py-1 font-bold text-slate-400 text-[10px] uppercase tracking-wider">Mata Uang</div>
                    <button className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-brand-600 font-bold flex items-center justify-between text-xs">
                      <span>Rupiah Indonesia (IDR)</span>
                      <span>✓</span>
                    </button>
                    <button className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-600 text-xs">
                      US Dollar (USD)
                    </button>
                    <button className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-600 text-xs">
                      Singapore Dollar (SGD)
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-[70px]">
            
            {/* Bespoke Logo */}
            <div className="flex items-center gap-8">
              <a href="#" className="flex items-center gap-2.5 group select-none">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center text-white shadow-sm shadow-blue-900/10 group-hover:scale-105 transition-transform">
                  <Compass className="w-5 h-5 text-white stroke-[2.2]" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="text-2xl font-black tracking-tight text-slate-900 leading-none">
                      Nusa<span className="text-brand-600">Stay</span>
                    </span>
                  </div>
                  <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mt-0.5">
                    Kurasi Hotel Nusantara
                  </span>
                </div>
              </a>

              {/* Navigation Links (Desktop) */}
              <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5">
                <a 
                  href="#search-section" 
                  className="px-3.5 py-2 text-sm font-bold text-brand-700 bg-brand-50 rounded-xl flex items-center gap-2 border border-brand-100"
                >
                  <Building2 className="w-4 h-4 text-brand-600" />
                  Eksplor Hotel
                </a>
                
                <a 
                  href="#villas"
                  onClick={(e) => { e.preventDefault(); onSelectPromo && onSelectPromo('villa'); }}
                  className="px-3.5 py-2 text-sm font-semibold text-slate-600 hover:text-brand-600 hover:bg-slate-50 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <Palmtree className="w-4 h-4 text-emerald-600" />
                  Resor & Villa
                </a>

                <a 
                  href="#flash-sale" 
                  className="px-3.5 py-2 text-sm font-semibold text-slate-600 hover:text-rose-600 hover:bg-slate-50 rounded-xl transition-colors flex items-center gap-1.5 relative"
                >
                  <Percent className="w-4 h-4 text-rose-500" />
                  Promo Terbatas
                  <span className="px-1.5 py-0.5 bg-rose-500 text-[10px] font-extrabold text-white rounded-full uppercase tracking-wider">
                    DEAL
                  </span>
                </a>

                <a 
                  href="#orders" 
                  onClick={(e) => { e.preventDefault(); alert('Cek Pesanan: Masukkan Kode Booking NusaStay (contoh: NUSA-123456) dan alamat email pemesan.'); }}
                  className="px-3.5 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <FileText className="w-4 h-4 text-slate-400" />
                  Cek Pesanan
                </a>
              </nav>
            </div>

            {/* Right Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Wishlist Button */}
              <button 
                onClick={onOpenWishlist}
                className="relative p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50/40 transition-all duration-150 group"
                title="Daftar Simpanan (Wishlist)"
              >
                <Heart className={`w-5 h-5 transition-transform group-hover:scale-110 ${wishlistCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Login Button */}
              <button 
                onClick={() => setAuthModal('login')}
                className="px-4 py-2 text-sm font-bold text-brand-600 border border-brand-500 hover:bg-brand-50 rounded-xl transition-all duration-150 flex items-center gap-1.5 shadow-2xs"
              >
                <User className="w-4 h-4" />
                Masuk
              </button>

              {/* Register Button */}
              <button 
                onClick={() => setAuthModal('register')}
                className="px-5 py-2 text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm hover:shadow transition-all duration-150 flex items-center gap-1.5"
              >
                Daftar
              </button>
            </div>

            {/* Mobile Hamburger */}
            <div className="sm:hidden flex items-center gap-2">
              <button 
                onClick={onOpenWishlist}
                className="relative p-2 rounded-xl border border-slate-200 text-slate-600"
              >
                <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2.5">
            <a 
              href="#search-section" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 text-sm font-bold text-brand-700 bg-brand-50 rounded-xl"
            >
              🏨 Eksplor Hotel
            </a>
            <a 
              href="#flash-sale" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-xl"
            >
              🏷️ Promo Terbatas
            </a>
            <a 
              href="#villas" 
              onClick={() => { setMobileMenuOpen(false); onSelectPromo && onSelectPromo('villa'); }}
              className="block px-3.5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-xl"
            >
              🌴 Resor & Villa
            </a>
            <div className="pt-2 border-t border-slate-100 flex gap-2">
              <button 
                onClick={() => { setMobileMenuOpen(false); setAuthModal('login'); }}
                className="w-1/2 py-2.5 text-center text-sm font-bold text-brand-600 border border-brand-500 rounded-xl"
              >
                Masuk
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); setAuthModal('register'); }}
                className="w-1/2 py-2.5 text-center text-sm font-bold text-white bg-brand-600 rounded-xl"
              >
                Daftar
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal (Clean Bespoke Identity) */}
      {authModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-modal border border-slate-200 w-full max-w-md p-6 relative">
            <button 
              onClick={() => setAuthModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-brand-100">
                <Compass className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="text-xl font-black text-slate-900">
                {authModal === 'login' ? 'Masuk ke Akun NusaStay' : 'Bergabung Bersama NusaStay'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Dapatkan harga khusus anggota hingga 30% dan jaminan konfirmasi instan
              </p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); alert(`Berhasil ${authModal === 'login' ? 'masuk' : 'mendaftar'}! Selamat datang di NusaStay.`); setAuthModal(null); }} className="space-y-3.5">
              {authModal === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Contoh: Budi Pratama"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500" 
                  />
                </div>
              )}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email atau No. Handphone</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Contoh: budi@gmail.com / 08123456789"
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kata Sandi</label>
                <input 
                  type="password" 
                  required 
                  placeholder="Minimal 8 karakter"
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500" 
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-extrabold rounded-xl shadow-sm transition-all duration-150 mt-2"
              >
                {authModal === 'login' ? 'Masuk Sekarang' : 'Daftar Akun Baru'}
              </button>

              <div className="text-center text-xs text-slate-500 pt-2">
                {authModal === 'login' ? (
                  <span>Belum punya akun? <button type="button" onClick={() => setAuthModal('register')} className="text-brand-600 font-bold hover:underline">Daftar sekarang</button></span>
                ) : (
                  <span>Sudah punya akun? <button type="button" onClick={() => setAuthModal('login')} className="text-brand-600 font-bold hover:underline">Masuk di sini</button></span>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
