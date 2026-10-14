import React, { useState } from 'react';
import { 
  Building2, 
  Heart, 
  Globe2, 
  User, 
  Sparkles, 
  Percent, 
  FileText, 
  Menu, 
  X,
  Palmtree,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

export function Navbar({ wishlistCount = 0, onOpenWishlist, onSelectPromo }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [authModal, setAuthModal] = useState(null); // 'login' | 'register' | null

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all duration-200 shadow-xs">
        {/* Top Mini Utility Bar for Trust & Partnership */}
        <div className="hidden lg:block border-b border-slate-100 bg-slate-50/70 text-xs text-slate-500 py-1.5 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Jaminan Harga Terbaik & Transaksi 100% Aman
              </span>
              <span className="text-slate-300">•</span>
              <span className="hover:text-slate-700 cursor-pointer">Bantuan 24/7 (Customer Care)</span>
            </div>
            <div className="flex items-center gap-4">
              <a 
                href="#partner" 
                onClick={(e) => { e.preventDefault(); alert('Portal Mitra Hotel Traveloka: Daftarkan akomodasi Anda dan raih jutaan tamu setiap hari!'); }}
                className="hover:text-brand-600 flex items-center gap-1 transition-colors"
              >
                <Building2 className="w-3.5 h-3.5" />
                Jadi Mitra Akomodasi
              </a>
              <span className="text-slate-300">•</span>
              <button 
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="relative flex items-center gap-1.5 hover:text-slate-800 transition-colors font-medium text-slate-700"
              >
                <span className="inline-block w-4 h-3 bg-red-600 relative overflow-hidden rounded-xs border border-slate-200 shadow-2xs">
                  <span className="absolute bottom-0 left-0 right-0 h-1/2 bg-white"></span>
                </span>
                <span>IDR | ID</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />

                {currencyDropdownOpen && (
                  <div className="absolute right-0 top-6 w-44 bg-white rounded-lg shadow-float border border-slate-200 py-2 text-left z-50">
                    <div className="px-3 py-1 font-semibold text-slate-800 text-xs">Pilih Mata Uang</div>
                    <button className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-brand-600 font-medium flex items-center justify-between">
                      <span>Rupiah (IDR)</span>
                      <span>✓</span>
                    </button>
                    <button className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-600">
                      US Dollar (USD)
                    </button>
                    <button className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-600">
                      Singapore Dollar (SGD)
                    </button>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-[68px]">
            {/* Logo */}
            <div className="flex items-center gap-8">
              <a href="#" className="flex items-center gap-2 group select-none">
                {/* Custom modern OTA Logo resembling Traveloka bird emblem */}
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0194F3] to-[#0064D2] flex items-center justify-center text-white shadow-sm shadow-blue-200 group-hover:scale-105 transition-transform duration-200">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2L11 13" />
                    <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-extrabold tracking-tight text-[#0194F3] leading-none">
                    traveloka
                  </span>
                  <span className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase mt-0.5">
                    Hotel & Resorts
                  </span>
                </div>
              </a>

              {/* Navigation Links (Desktop) */}
              <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
                <a 
                  href="#search-section" 
                  className="px-3.5 py-2 text-sm font-semibold text-brand-700 bg-brand-50 rounded-lg flex items-center gap-1.5"
                >
                  <Building2 className="w-4 h-4 text-brand-600" />
                  Hotel & Penginapan
                </a>
                <a 
                  href="#villas"
                  onClick={(e) => { e.preventDefault(); onSelectPromo && onSelectPromo('villa'); }}
                  className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-brand-600 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Palmtree className="w-4 h-4 text-emerald-600" />
                  Resort & Villa
                </a>
                <a 
                  href="#flash-sale" 
                  className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-brand-600 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-1.5 relative"
                >
                  <Percent className="w-4 h-4 text-rose-500" />
                  Promo Epic Sale
                  <span className="absolute -top-1 right-1 px-1.5 py-0.2 bg-rose-600 text-[10px] font-bold text-white rounded-full uppercase tracking-wider animate-pulse">
                    HOT
                  </span>
                </a>
                <a 
                  href="#orders" 
                  onClick={(e) => { e.preventDefault(); alert('Cek Pesanan: Masukkan No. Pesanan Traveloka & No. Handphone untuk melihat e-voucher hotel Anda.'); }}
                  className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-brand-600 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <FileText className="w-4 h-4 text-slate-500" />
                  Cek Pesanan
                </a>
              </nav>
            </div>

            {/* Right Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Wishlist Button */}
              <button 
                onClick={onOpenWishlist}
                className="relative p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50/50 transition-all duration-200 group"
                title="Daftar Keinginan (Wishlist)"
              >
                <Heart className={`w-5 h-5 transition-transform group-hover:scale-110 ${wishlistCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
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
                className="px-4.5 py-2 text-sm font-bold text-white bg-brand-500 hover:bg-brand-600 rounded-xl shadow-sm hover:shadow transition-all duration-150 flex items-center gap-1.5"
              >
                Daftar
              </button>
            </div>

            {/* Mobile Hamburger */}
            <div className="sm:hidden flex items-center gap-2">
              <button 
                onClick={onOpenWishlist}
                className="relative p-2 rounded-lg border border-slate-200 text-slate-600"
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
                className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3">
            <a 
              href="#search-section" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-bold text-brand-600 bg-brand-50 rounded-lg"
            >
              🏨 Hotel & Penginapan
            </a>
            <a 
              href="#flash-sale" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              🔥 Promo Epic Sale
            </a>
            <a 
              href="#villas" 
              onClick={() => { setMobileMenuOpen(false); onSelectPromo && onSelectPromo('villa'); }}
              className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              🌴 Resort & Villa
            </a>
            <div className="pt-2 border-t border-slate-100 flex gap-2">
              <button 
                onClick={() => { setMobileMenuOpen(false); setAuthModal('login'); }}
                className="w-1/2 py-2 text-center text-sm font-bold text-brand-600 border border-brand-500 rounded-lg"
              >
                Masuk
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); setAuthModal('register'); }}
                className="w-1/2 py-2 text-center text-sm font-bold text-white bg-brand-500 rounded-lg"
              >
                Daftar
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mini Auth Modal (Light Mode, Traveloka Style) */}
      {authModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-modal border border-slate-200 w-full max-w-md p-6 relative">
            <button 
              onClick={() => setAuthModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <User className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {authModal === 'login' ? 'Masuk ke Akun Traveloka' : 'Buat Akun Baru Traveloka'}
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Nikmati diskon member eksklusif hingga 35% dan Traveloka Points tiap pemesanan
              </p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); alert(`Berhasil ${authModal === 'login' ? 'masuk' : 'mendaftar'}! Selamat datang di Traveloka Hotel.`); setAuthModal(null); }} className="space-y-4">
              {authModal === 'register' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Lengkap</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Contoh: Budi Pratama"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500" 
                  />
                </div>
              )}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email atau No. Handphone</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Contoh: budi@gmail.com / 08123456789"
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Kata Sandi</label>
                <input 
                  type="password" 
                  required 
                  placeholder="Minimal 8 karakter"
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500" 
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl shadow-md transition-all duration-150 mt-2"
              >
                {authModal === 'login' ? 'Lanjutkan Masuk' : 'Daftar Sekarang'}
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
