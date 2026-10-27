import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SearchWidget } from './components/SearchWidget';
import { FlashSaleBanner } from './components/FlashSaleBanner';
import { FilterSidebar } from './components/FilterSidebar';
import { HotelCard } from './components/HotelCard';
import { HotelGridCard } from './components/HotelGridCard';
import { HotelDetailModal } from './components/HotelDetailModal';
import { BookingCheckoutModal } from './components/BookingCheckoutModal';
import { CheckBookingModal } from './components/CheckBookingModal';
import { PartnerModal } from './components/PartnerModal';
import { InteractiveMapModal } from './components/InteractiveMapModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';

import { HOTELS_DATA } from './data/hotelsData';
import { formatCurrency } from './utils/formatters';
import { TRANSLATIONS } from './utils/i18n';
import { 
  SlidersHorizontal, 
  LayoutList, 
  LayoutGrid, 
  ArrowUpDown, 
  X, 
  MapPin, 
  Building2, 
  AlertCircle 
} from 'lucide-react';

export default function App() {
  // Locale & Multi-Currency State (Indonesia / Malaysia / Singapore) with LocalStorage persistence
  const [lang, setLang] = useState(() => {
    try {
      const savedLang = localStorage.getItem('nusastay_lang');
      if (savedLang && ['id', 'ms', 'en'].includes(savedLang)) {
        return savedLang;
      }
    } catch (e) {
      // Ignore localStorage access restrictions
    }
    return 'id';
  });

  const [currency, setCurrency] = useState(() => {
    try {
      const savedCurr = localStorage.getItem('nusastay_currency');
      if (savedCurr && ['IDR', 'MYR', 'SGD'].includes(savedCurr)) {
        return savedCurr;
      }
    } catch (e) {
      // Ignore
    }
    return 'IDR';
  });

  // Persist language to localStorage and document.documentElement
  useEffect(() => {
    try {
      localStorage.setItem('nusastay_lang', lang);
      document.documentElement.lang = lang;
    } catch (e) {}
  }, [lang]);

  // Persist currency to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nusastay_currency', currency);
    } catch (e) {}
  }, [currency]);

  const t = useMemo(() => TRANSLATIONS[lang] || TRANSLATIONS.id, [lang]);

  // 1. Search Engine State
  const [activeCity, setActiveCity] = useState('Semua Kota');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Set default dates to realistic future dates
  const today = new Date();
  const defaultCheckIn = new Date(today);
  defaultCheckIn.setDate(today.getDate() + 3);
  const defaultCheckOut = new Date(today);
  defaultCheckOut.setDate(today.getDate() + 5);

  const [checkInDate, setCheckInDate] = useState(defaultCheckIn.toISOString().split('T')[0]);
  const [checkOutDate, setCheckOutDate] = useState(defaultCheckOut.toISOString().split('T')[0]);
  const [guests, setGuests] = useState({ adults: 2, children: 0, rooms: 1 });

  // 2. Filter State
  const [quickFilters, setQuickFilters] = useState({
    payAtHotel: false,
    freeBreakfast: false,
    fourStarsPlus: false,
    freeCancellation: false,
  });

  const [priceRange, setPriceRange] = useState(10000000);
  const [selectedStars, setSelectedStars] = useState([]);
  const [selectedFacilities, setSelectedFacilities] = useState({
    freeBreakfast: false,
    freeCancellation: false,
    hasPool: false,
    hasWifi: false,
    payAtHotel: false,
  });
  const [selectedPropertyType, setSelectedPropertyType] = useState('all');

  // 3. Sorting & Layout State
  const [sortBy, setSortBy] = useState('popularity'); // 'popularity' | 'price_asc' | 'price_desc' | 'rating_desc' | 'discount_desc'
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'grid'

  // 4. Modals & Drawer State
  const [selectedHotelForModal, setSelectedHotelForModal] = useState(null);
  const [checkoutModalData, setCheckoutModalData] = useState(null); // { hotel, room }
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckBookingOpen, setIsCheckBookingOpen] = useState(false);
  const [isPartnerOpen, setIsPartnerOpen] = useState(false);
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('nusastay_wishlist');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return [HOTELS_DATA[0]]; // default 1 item saved for great initial UX
  });

  // Persist wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nusastay_wishlist', JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist]);

  // 5. Toast Feedback State
  const [toast, setToast] = useState(null);

  const showToast = (title, message, type = 'info') => {
    setToast({ title, message, type });
  };

  // Toggle Wishlist handler
  const handleToggleWishlist = (hotel) => {
    const isSaved = wishlist.some(item => item.id === hotel.id);
    if (isSaved) {
      setWishlist(prev => prev.filter(item => item.id !== hotel.id));
      showToast('Dihapus dari Simpanan', `${hotel.name} telah dihapus dari wishlist.`, 'wishlist');
    } else {
      setWishlist(prev => [...prev, hotel]);
      showToast('Tersimpan di Wishlist!', `${hotel.name} berhasil ditambahkan ke daftar favorit Anda.`, 'wishlist');
    }
  };

  // Reset Filters handler
  const handleResetFilters = () => {
    setPriceRange(10000000);
    setSelectedStars([]);
    setSelectedFacilities({
      freeBreakfast: false,
      freeCancellation: false,
      hasPool: false,
      hasWifi: false,
      payAtHotel: false,
    });
    setQuickFilters({
      payAtHotel: false,
      freeBreakfast: false,
      fourStarsPlus: false,
      freeCancellation: false,
    });
    setSelectedPropertyType('all');
    setSearchQuery('');
    showToast('Filter Direset', 'Semua filter pencarian telah dikembalikan ke kondisi awal.', 'info');
  };

  // Filtered & Sorted Hotels Computation
  const filteredHotels = useMemo(() => {
    return HOTELS_DATA.filter(hotel => {
      // 1. Destination / City Filter
      if (activeCity !== 'Semua Kota' && hotel.city !== activeCity) {
        return false;
      }

      // 2. Search Query (Hotel name, area, city, country)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = hotel.name.toLowerCase().includes(q);
        const matchesArea = hotel.area.toLowerCase().includes(q);
        const matchesCity = hotel.city.toLowerCase().includes(q);
        const matchesCountry = (hotel.country || '').toLowerCase().includes(q);
        if (!matchesName && !matchesArea && !matchesCity && !matchesCountry) return false;
      }

      // 3. Price Range
      if (hotel.price > priceRange) {
        return false;
      }

      // 4. Star Rating Checkboxes
      if (selectedStars.length > 0 && !selectedStars.includes(hotel.starRating)) {
        return false;
      }

      // 5. Quick Filters
      if (quickFilters.payAtHotel && !hotel.payAtHotel) return false;
      if (quickFilters.freeBreakfast && !hotel.freeBreakfast) return false;
      if (quickFilters.fourStarsPlus && hotel.starRating < 4) return false;
      if (quickFilters.freeCancellation && !hotel.freeCancellation) return false;

      // 6. Facility Filters
      if (selectedFacilities.freeBreakfast && !hotel.freeBreakfast) return false;
      if (selectedFacilities.freeCancellation && !hotel.freeCancellation) return false;
      if (selectedFacilities.hasPool && !hotel.hasPool) return false;
      if (selectedFacilities.hasWifi && !hotel.hasWifi) return false;
      if (selectedFacilities.payAtHotel && !hotel.payAtHotel) return false;

      // 7. Property Type
      if (selectedPropertyType !== 'all' && hotel.type !== selectedPropertyType) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'rating_desc') return b.rating - a.rating;
      if (sortBy === 'discount_desc') return b.discountPercent - a.discountPercent;
      return (b.rating * b.reviewsCount) - (a.rating * a.reviewsCount); // default popularity
    });
  }, [
    activeCity,
    searchQuery,
    priceRange,
    selectedStars,
    quickFilters,
    selectedFacilities,
    selectedPropertyType,
    sortBy
  ]);

  // Flash Sale Hotels
  const flashSaleHotels = useMemo(() => {
    return HOTELS_DATA.filter(h => h.flashSale);
  }, []);

  // Room Selected for Booking Flow
  const handleSelectRoom = (hotel, room) => {
    setSelectedHotelForModal(null);
    setCheckoutModalData({ hotel, room });
  };

  const handleBookingSuccess = (bookingCode, hotelName, roomName) => {
    showToast('Pemesanan Dikonfirmasi!', `E-Voucher ${bookingCode} untuk ${hotelName} telah terbit.`, 'success');
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (priceRange < 10000000) count++;
    if (selectedStars.length > 0) count += selectedStars.length;
    if (selectedPropertyType !== 'all') count++;
    if (quickFilters.payAtHotel) count++;
    if (quickFilters.freeBreakfast) count++;
    if (quickFilters.fourStarsPlus) count++;
    if (quickFilters.freeCancellation) count++;
    if (selectedFacilities.hasPool) count++;
    if (selectedFacilities.hasWifi) count++;
    return count;
  }, [priceRange, selectedStars, selectedPropertyType, quickFilters, selectedFacilities]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-brand-100 selection:text-brand-900">
      
      {/* 1. Sticky Navigation Bar */}
      <Navbar
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCheckBooking={() => setIsCheckBookingOpen(true)}
        onOpenPartner={() => setIsPartnerOpen(true)}
        showToast={showToast}
        lang={lang}
        setLang={setLang}
        currency={currency}
        setCurrency={setCurrency}
        t={t}
        onSelectPromo={(category) => {
          if (category === 'villa') {
            setSelectedPropertyType('Villa');
          }
          const el = document.getElementById('search-discovery-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <main>
        {/* 2. Hero Section */}
        <HeroSection t={t} lang={lang} />

        {/* 3. Floating Overlapping Multi-Field Search Engine */}
        <SearchWidget
          activeCity={activeCity}
          setActiveCity={setActiveCity}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          checkInDate={checkInDate}
          setCheckInDate={setCheckInDate}
          checkOutDate={checkOutDate}
          setCheckOutDate={setCheckOutDate}
          guests={guests}
          setGuests={setGuests}
          quickFilters={quickFilters}
          setQuickFilters={setQuickFilters}
          t={t}
          lang={lang}
          onSearchSubmit={() => {
            const el = document.getElementById('search-discovery-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
            showToast(t?.searchBtn || 'Pencarian Diperbarui', `${t?.showingHotels?.replace('{count}', filteredHotels.length) || `Menampilkan akomodasi terbaik di ${activeCity}`}`, 'info');
          }}
        />

        {/* 4. Flash Sale / Promo Banner Strip */}
        <FlashSaleBanner
          flashHotels={flashSaleHotels}
          onSelectHotel={(hotel) => setSelectedHotelForModal(hotel)}
          t={t}
          currency={currency}
          lang={lang}
        />

        {/* 5. Main Content Area: Two-Column Search & Discovery Layout */}
        <section id="search-discovery-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
          
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Left Sidebar: Sticky Filters */}
            <div className="w-full lg:w-[280px] lg:sticky lg:top-24">
              <FilterSidebar
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedStars={selectedStars}
                setSelectedStars={setSelectedStars}
                selectedFacilities={selectedFacilities}
                setSelectedFacilities={setSelectedFacilities}
                selectedPropertyType={selectedPropertyType}
                setSelectedPropertyType={setSelectedPropertyType}
                onResetFilters={handleResetFilters}
                onOpenMap={() => setIsMapModalOpen(true)}
                totalHotelsCount={filteredHotels.length}
                t={t}
                currency={currency}
                lang={lang}
              />
            </div>

            {/* Right Main Feed */}
            <div className="flex-1 w-full space-y-4">
              
              {/* Top Sort & View Bar */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                {/* Results count & current destination heading */}
                <div>
                  <h2 className="text-base sm:text-lg font-black text-slate-900">
                    {activeCity === 'Semua Kota' ? (t?.allDestinations || t?.allIndonesia || 'Semua Destinasi') : (t?.hotelsIn ? t.hotelsIn.replace('{city}', activeCity) : `Hotel & Resor di ${activeCity}`)}
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    {t?.showingHotels ? t.showingHotels.replace('{count}', filteredHotels.length) : `Menampilkan ${filteredHotels.length} akomodasi terbaik`}
                  </p>
                </div>

                {/* Sort & Grid/List Controls */}
                <div className="flex items-center gap-3 self-end sm:self-auto">
                  
                  {/* Sort Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500 hidden sm:inline">{t?.sortByLabel || 'Urutkan:'}</span>
                    <div className="relative">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-xl px-3 py-2 pr-8 focus:ring-2 focus:ring-brand-500 focus:outline-none appearance-none cursor-pointer shadow-2xs"
                      >
                        <option value="popularity">{t?.sortPopularity || 'Popularitas Tertinggi'}</option>
                        <option value="price_asc">{t?.sortPriceAsc || 'Harga Terendah'}</option>
                        <option value="price_desc">{t?.sortPriceDesc || 'Harga Tertinggi'}</option>
                        <option value="rating_desc">{t?.sortRatingDesc || 'Rating Ulasan Tertinggi'}</option>
                        <option value="discount_desc">{t?.sortDiscountDesc || 'Diskon Terbesar'}</option>
                      </select>
                      <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
                    </div>
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex items-center border border-slate-200 rounded-xl p-1 bg-slate-50">
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-1.5 rounded-lg transition-colors ${
                        viewMode === 'list' ? 'bg-white text-brand-600 shadow-2xs' : 'text-slate-400 hover:text-slate-700'
                      }`}
                      title="Tampilan Baris (List)"
                    >
                      <LayoutList className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-1.5 rounded-lg transition-colors ${
                        viewMode === 'grid' ? 'bg-white text-brand-600 shadow-2xs' : 'text-slate-400 hover:text-slate-700'
                      }`}
                      title="Tampilan Kotak (Grid)"
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                  </div>

                </div>

              </div>

              {/* Active Filter Pills Bar */}
              {activeFiltersCount > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-1 pb-2">
                  <span className="text-xs font-bold text-slate-500">{t?.activeFiltersLabel || 'Filter Aktif:'}</span>
                  
                  {priceRange < 10000000 && (
                    <span className="inline-flex items-center gap-1 text-xs bg-brand-50 text-brand-700 px-2.5 py-1 rounded-lg border border-brand-200 font-semibold">
                      {t?.maxPriceLabel || 'Maks.'} {formatCurrency(priceRange, currency)}
                      <button onClick={() => setPriceRange(10000000)} className="hover:text-brand-900">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {selectedStars.map(star => (
                    <span key={star} className="inline-flex items-center gap-1 text-xs bg-amber-50 text-amber-800 px-2.5 py-1 rounded-lg border border-amber-200 font-semibold">
                      Bintang {star}★
                      <button onClick={() => setSelectedStars(prev => prev.filter(s => s !== star))} className="hover:text-amber-900">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}

                  {selectedPropertyType !== 'all' && (
                    <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg border border-blue-200 font-semibold">
                      Tipe: {selectedPropertyType}
                      <button onClick={() => setSelectedPropertyType('all')} className="hover:text-blue-900">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {(quickFilters.freeBreakfast || selectedFacilities.freeBreakfast) && (
                    <span className="inline-flex items-center gap-1 text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg border border-emerald-200 font-semibold">
                      {t?.facilityBreakfast || 'Sarapan Gratis'}
                      <button onClick={() => {
                        setQuickFilters(p => ({ ...p, freeBreakfast: false }));
                        setSelectedFacilities(p => ({ ...p, freeBreakfast: false }));
                      }}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  <button
                    onClick={handleResetFilters}
                    className="text-xs text-brand-600 font-bold hover:underline ml-1"
                  >
                    {t?.clearAllBtn || 'Hapus Semua'}
                  </button>
                </div>
              )}

              {/* Hotel Cards Feed */}
              {filteredHotels.length === 0 ? (
                <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-card space-y-4">
                  <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <Building2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">{t?.noHotelsMatch || 'Tidak ada hotel yang sesuai filter'}</h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                      {t?.noHotelsDesc || 'Coba sesuaikan batas harga, kurangi filter fasilitas, atau pilih destinasi kota lainnya.'}
                    </p>
                  </div>
                  <button
                    onClick={handleResetFilters}
                    className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                  >
                    {t?.resetSearchFilters || 'Reset Filter Pencarian'}
                  </button>
                </div>
              ) : viewMode === 'list' ? (
                <div className="space-y-4">
                  {filteredHotels.map(hotel => (
                    <HotelCard
                      key={hotel.id}
                      hotel={hotel}
                      onSelectHotel={(h) => setSelectedHotelForModal(h)}
                      onToggleWishlist={handleToggleWishlist}
                      isWishlisted={wishlist.some(w => w.id === hotel.id)}
                      t={t}
                      currency={currency}
                      lang={lang}
                    />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredHotels.map(hotel => (
                    <HotelGridCard
                      key={hotel.id}
                      hotel={hotel}
                      onSelectHotel={(h) => setSelectedHotelForModal(h)}
                      onToggleWishlist={handleToggleWishlist}
                      isWishlisted={wishlist.some(w => w.id === hotel.id)}
                      t={t}
                      currency={currency}
                      lang={lang}
                    />
                  ))}
                </div>
              )}

            </div>

          </div>

        </section>
      </main>

      {/* Footer */}
      <Footer t={t} currency={currency} lang={lang} />

      {/* 6. Interactive Hotel Detail & Room Selection Modal */}
      {selectedHotelForModal && (
        <HotelDetailModal
          hotel={selectedHotelForModal}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          guests={guests}
          onClose={() => setSelectedHotelForModal(null)}
          onSelectRoom={handleSelectRoom}
          isWishlisted={wishlist.some(w => w.id === selectedHotelForModal.id)}
          onToggleWishlist={handleToggleWishlist}
          t={t}
          currency={currency}
          lang={lang}
        />
      )}

      {/* 7. Booking Checkout Modal & E-Voucher */}
      {checkoutModalData && (
        <BookingCheckoutModal
          hotel={checkoutModalData.hotel}
          room={checkoutModalData.room}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          guests={guests}
          onClose={() => setCheckoutModalData(null)}
          onBookingSuccess={handleBookingSuccess}
          t={t}
          currency={currency}
          lang={lang}
        />
      )}

      {/* 8. Interactive Map Modal */}
      {isMapModalOpen && (
        <InteractiveMapModal
          hotels={filteredHotels}
          onClose={() => setIsMapModalOpen(false)}
          onSelectHotel={(h) => {
            setIsMapModalOpen(false);
            setSelectedHotelForModal(h);
          }}
          t={t}
          currency={currency}
        />
      )}

      {/* 9. Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={(id) => {
          setWishlist(prev => prev.filter(item => item.id !== id));
          showToast(t?.removeFromWishlist || 'Dihapus dari Simpanan', 'Hotel telah dihapus dari wishlist.', 'wishlist');
        }}
        onSelectHotel={(h) => {
          setIsWishlistOpen(false);
          setSelectedHotelForModal(h);
        }}
        t={t}
        currency={currency}
        lang={lang}
      />

      {/* 10. Check Booking (Cek Pesanan) Modal */}
      <CheckBookingModal
        isOpen={isCheckBookingOpen}
        onClose={() => setIsCheckBookingOpen(false)}
        lang={lang}
        t={t}
        showToast={showToast}
      />

      {/* 11. List Property (Mitra Properti) Modal */}
      <PartnerModal
        isOpen={isPartnerOpen}
        onClose={() => setIsPartnerOpen(false)}
        lang={lang}
        showToast={showToast}
      />

      {/* 12. Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />

    </div>
  );
}
