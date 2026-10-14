import React, { useState, useRef, useEffect } from 'react';
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
  PhoneCall,
  Globe2
} from 'lucide-react';
import { SUPPORTED_LANGUAGES, SUPPORTED_CURRENCIES } from '../utils/i18n';

export function Navbar({ 
  wishlistCount = 0, 
  onOpenWishlist, 
  onSelectPromo,
  lang,
  setLang,
  currency,
  setCurrency,
  t
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [localeDropdownOpen, setLocaleDropdownOpen] = useState(false);
  const [authModal, setAuthModal] = useState(null); // 'login' | 'register' | null

  const localeRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (localeRef.current && !localeRef.current.contains(event.target)) {
        setLocaleDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === lang) || SUPPORTED_LANGUAGES[0];
  const currentCurr = SUPPORTED_CURRENCIES.find(c => c.code === currency) || SUPPORTED_CURRENCIES[0];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all duration-200 shadow-xs">
        {/* Top Utility Bar */}
        <div className="hidden lg:block border-b border-slate-100 bg-slate-50/80 text-xs text-slate-500 py-1.5 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                {t.guaranteeText}
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1 text-slate-600">
                <PhoneCall className="w-3 h-3 text-slate-400" />
                {t.conciergeText}
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <a 
                href="#partner" 
                onClick={(e) => { e.preventDefault(); alert(t.navPartner + ': Portal NusaStay.'); }}
                className="hover:text-brand-600 flex items-center gap-1.5 font-medium transition-colors"
              >
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                {t.navPartner}
              </a>
              <span className="text-slate-300">•</span>
              
              {/* Region, Language & Currency Selector */}
              <div className="relative" ref={localeRef}>
                <button 
                  onClick={() => setLocaleDropdownOpen(!localeDropdownOpen)}
                  className="flex items-center gap-2 hover:text-slate-900 transition-colors font-bold text-slate-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200 hover:border-brand-400 shadow-2xs"
                  title="Ganti Bahasa & Mata Uang"
                >
                  <span className="text-sm">{currentLang.flag}</span>
                  <span className="text-xs uppercase">{currentCurr.code} ({currentCurr.symbol})</span>
                  <span className="text-slate-300">|</span>
                  <span className="text-xs uppercase text-slate-500">{currentLang.code}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {localeDropdownOpen && (
                  <div className="absolute right-0 top-8 w-72 bg-white rounded-2xl shadow-float border border-slate-200 p-4 text-left z-50 animate-in fade-in duration-150">
                    
                    {/* Quick Region Presets */}
                    <div className="mb-3">
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-2">
                        Pilih Negara / Wilayah Cepat:
                      </span>
                      <div className="space-y-1">
                        <button
                          onClick={() => {
                            setLang('id');
                            setCurrency('IDR');
                            setLocaleDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-bold transition-colors ${
                            lang === 'id' && currency === 'IDR'
                              ? 'bg-brand-50 text-brand-700 border border-brand-200'
                              : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-base">🇮🇩</span>
                            <span>Indonesia (IDR - Rp)</span>
                          </span>
                          {lang === 'id' && currency === 'IDR' && <span className="text-brand-600 font-black">✓</span>}
                        </button>

                        <button
                          onClick={() => {
                            setLang('ms');
                            setCurrency('MYR');
                            setLocaleDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-bold transition-colors ${
                            lang === 'ms' && currency === 'MYR'
                              ? 'bg-brand-50 text-brand-700 border border-brand-200'
                              : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-base">🇲🇾</span>
                            <span>Malaysia (MYR - RM)</span>
                          </span>
                          {lang === 'ms' && currency === 'MYR' && <span className="text-brand-600 font-black">✓</span>}
                        </button>

                        <button
                          onClick={() => {
                            setLang('en');
                            setCurrency('SGD');
                            setLocaleDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-bold transition-colors ${
                            lang === 'en' && currency === 'SGD'
                              ? 'bg-brand-50 text-brand-700 border border-brand-200'
                              : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-base">🇸🇬</span>
                            <span>Singapore (SGD - S$)</span>
                          </span>
                          {lang === 'en' && currency === 'SGD' && <span className="text-brand-600 font-black">✓</span>}
                        </button>
                      </div>
                    </div>

                    {/* Independent Customization */}
                    <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                          Bahasa:
                        </span>
                        <div className="space-y-0.5">
                          {SUPPORTED_LANGUAGES.map(l => (
                            <button
                              key={l.code}
                              onClick={() => setLang(l.code)}
                              className={`w-full text-left px-2 py-1 rounded-lg text-xs font-semibold ${
                                lang === l.code ? 'bg-slate-100 text-brand-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
                              }`}
                            >
                              {l.flag} {l.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                          Mata Uang:
                        </span>
                        <div className="space-y-0.5">
                          {SUPPORTED_CURRENCIES.map(c => (
                            <button
                              key={c.code}
                              onClick={() => setCurrency(c.code)}
                              className={`w-full text-left px-2 py-1 rounded-lg text-xs font-semibold ${
                                currency === c.code ? 'bg-slate-100 text-brand-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
                              }`}
                            >
                              {c.code} ({c.symbol})
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

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
                    {t.brandTagline}
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
                  {t.navExplore}
                </a>
                
                <a 
                  href="#villas"
                  onClick={(e) => { e.preventDefault(); onSelectPromo && onSelectPromo('villa'); }}
                  className="px-3.5 py-2 text-sm font-semibold text-slate-600 hover:text-brand-600 hover:bg-slate-50 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <Palmtree className="w-4 h-4 text-emerald-600" />
                  {t.navVillas}
                </a>

                <a 
                  href="#flash-sale" 
                  className="px-3.5 py-2 text-sm font-semibold text-slate-600 hover:text-rose-600 hover:bg-slate-50 rounded-xl transition-colors flex items-center gap-1.5 relative"
                >
                  <Percent className="w-4 h-4 text-rose-500" />
                  {t.navDeals}
                  <span className="px-1.5 py-0.5 bg-rose-500 text-[10px] font-extrabold text-white rounded-full uppercase tracking-wider">
                    DEAL
                  </span>
                </a>

                <a 
                  href="#orders" 
                  onClick={(e) => { e.preventDefault(); alert(t.navOrders + ': Masukkan Kode Booking NusaStay.'); }}
                  className="px-3.5 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <FileText className="w-4 h-4 text-slate-400" />
                  {t.navOrders}
                </a>
              </nav>
            </div>

            {/* Right Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              
              {/* Quick Currency Switcher Pill */}
              <button
                onClick={() => setLocaleDropdownOpen(true)}
                className="lg:hidden flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700"
              >
                <span>{currentLang.flag}</span>
                <span>{currentCurr.code}</span>
              </button>

              {/* Wishlist Button */}
              <button 
                onClick={onOpenWishlist}
                className="relative p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50/40 transition-all duration-150 group"
                title={t.saveWishlist}
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
                {t.navLogin}
              </button>

              {/* Register Button */}
              <button 
                onClick={() => setAuthModal('register')}
                className="px-5 py-2 text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm hover:shadow transition-all duration-150 flex items-center gap-1.5"
              >
                {t.navRegister}
              </button>
            </div>

            {/* Mobile Hamburger & Language Selector */}
            <div className="sm:hidden flex items-center gap-2">
              <button
                onClick={() => {
                  const nextLang = lang === 'id' ? 'ms' : lang === 'ms' ? 'en' : 'id';
                  const nextCurr = nextLang === 'id' ? 'IDR' : nextLang === 'ms' ? 'MYR' : 'SGD';
                  setLang(nextLang);
                  setCurrency(nextCurr);
                }}
                className="px-2 py-1 rounded-lg border border-slate-200 text-xs font-bold"
              >
                {currentLang.flag} {currentCurr.code}
              </button>
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
              🏨 {t.navExplore}
            </a>
            <a 
              href="#flash-sale" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-xl"
            >
              🏷️ {t.navDeals}
            </a>
            <a 
              href="#villas" 
              onClick={() => { setMobileMenuOpen(false); onSelectPromo && onSelectPromo('villa'); }}
              className="block px-3.5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-xl"
            >
              🌴 {t.navVillas}
            </a>
            <div className="pt-2 border-t border-slate-100 flex gap-2">
              <button 
                onClick={() => { setMobileMenuOpen(false); setAuthModal('login'); }}
                className="w-1/2 py-2.5 text-center text-sm font-bold text-brand-600 border border-brand-500 rounded-xl"
              >
                {t.navLogin}
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); setAuthModal('register'); }}
                className="w-1/2 py-2.5 text-center text-sm font-bold text-white bg-brand-600 rounded-xl"
              >
                {t.navRegister}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal */}
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
                {authModal === 'login' ? `${t.navLogin} NusaStay` : `${t.navRegister} NusaStay`}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {lang === 'en' ? 'Exclusive member rates up to 30% and instant confirmation' : lang === 'ms' ? 'Kadar diskaun ahli eksklusif hingga 30% dan pengesahan segera' : 'Dapatkan harga khusus anggota hingga 30% dan jaminan konfirmasi instan'}
              </p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); alert(`Berhasil ${authModal === 'login' ? 'masuk' : 'mendaftar'}!`); setAuthModal(null); }} className="space-y-3.5">
              {authModal === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t.fullNameLabel}</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Budi Pratama"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500" 
                  />
                </div>
              )}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{t.emailLabel}</label>
                <input 
                  type="text" 
                  required 
                  placeholder="budi@gmail.com"
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                <input 
                  type="password" 
                  required 
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500" 
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-extrabold rounded-xl shadow-sm transition-all duration-150 mt-2"
              >
                {authModal === 'login' ? t.navLogin : t.navRegister}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
