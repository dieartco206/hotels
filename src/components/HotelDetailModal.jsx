import React, { useState } from 'react';
import { 
  X, 
  Star, 
  MapPin, 
  Check, 
  Coffee, 
  Wifi, 
  Waves, 
  Utensils, 
  Users, 
  Maximize2, 
  Bed, 
  ShieldCheck, 
  Calendar, 
  Heart,
  ChevronRight,
  Info,
  Clock
} from 'lucide-react';
import { formatCurrency, getRatingDescription, formatDateIndo, calculateNights } from '../utils/formatters';

export function HotelDetailModal({ 
  hotel, 
  onClose, 
  onSelectRoom, 
  checkInDate, 
  checkOutDate, 
  guests,
  isWishlisted,
  onToggleWishlist,
  t,
  currency = 'IDR',
  lang = 'id'
}) {
  const [activeTab, setActiveTab] = useState('rooms'); // 'overview' | 'rooms' | 'facilities' | 'reviews'
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  if (!hotel) return null;

  const allPhotos = [hotel.mainImage, ...(hotel.thumbnails || [])];
  const nights = calculateNights(checkInDate, checkOutDate);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="bg-white rounded-3xl shadow-modal border border-slate-200 w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Modal Sticky Header */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="min-w-0 pr-4">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded uppercase">
                {hotel.type}
              </span>
              <div className="flex items-center">
                {Array.from({ length: hotel.starRating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              {hotel.badge && (
                <span className="text-[10px] font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded">
                  {hotel.badge}
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 truncate">
              {hotel.name}
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5 min-w-0">
              <MapPin className="w-3.5 h-3.5 text-brand-500 shrink-0" />
              <span className="whitespace-nowrap truncate">{hotel.area}</span>
              <span className="text-slate-300 shrink-0">•</span>
              <span className="whitespace-nowrap truncate text-slate-500">{hotel.distanceText}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onToggleWishlist(hotel)}
              className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-rose-500 hover:border-rose-200 transition-colors"
              title="Simpan ke Wishlist"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors"
              title="Tutup (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          
          {/* Photo Gallery Grid (Bento style) */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5 rounded-2xl overflow-hidden h-72 sm:h-80 md:h-[360px]">
            {/* Main Hero Photo */}
            <div className="md:col-span-2 relative group overflow-hidden bg-slate-100 cursor-pointer h-full">
              <img
                src={allPhotos[selectedPhotoIndex] || allPhotos[0]}
                alt={hotel.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
                Foto {selectedPhotoIndex + 1} dari {allPhotos.length}
              </div>
            </div>

            {/* Side Grid Thumbnails */}
            <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-2.5 h-full">
              {allPhotos.slice(0, 4).map((img, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedPhotoIndex(i)}
                  className={`relative overflow-hidden cursor-pointer rounded-lg border-2 transition-all ${
                    selectedPhotoIndex === i ? 'border-brand-500' : 'border-transparent hover:opacity-90'
                  }`}
                >
                  <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stay Summary Bar */}
          <div className="bg-brand-50/70 border border-brand-200/80 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-600" />
                <div>
                  <span className="text-slate-500 block">{t?.stayPeriodLabel || 'Jadwal Menginap'}:</span>
                  <span className="font-bold text-slate-800">
                    {formatDateIndo(checkInDate, lang)} - {formatDateIndo(checkOutDate, lang)} ({nights} {t?.nights || 'Malam'})
                  </span>
                </div>
              </div>
              <div className="h-6 w-px bg-brand-200"></div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-brand-600" />
                <div>
                  <span className="text-slate-500 block">{t?.guestCapacity || 'Kapasitas'}:</span>
                  <span className="font-bold text-slate-800">
                    {guests.adults} {t?.adults || 'Dewasa'} • {guests.rooms} {t?.rooms || 'Kamar'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-emerald-700 bg-emerald-100 font-bold px-2 py-1 rounded-md flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                {t?.guaranteeText?.split('&')[0]?.trim() || 'Jaminan Harga Terbaik'}
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            {[
              { id: 'rooms', label: t?.tabRooms || 'Pilihan Kamar' },
              { id: 'overview', label: t?.tabOverview || 'Ringkasan Hotel' },
              { id: 'facilities', label: t?.tabFacilities || 'Fasilitas Lengkap' },
              { id: 'reviews', label: t?.tabReviews || 'Ulasan Tamu' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-brand-500 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Pilihan Kamar (The Core Room Selection Flow) */}
          {activeTab === 'rooms' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-extrabold text-slate-900">
                  {t?.roomOptionsTitle || 'Pilihan Kamar'} ({hotel.rooms?.length || 1})
                </h3>
                <span className="text-xs text-slate-500">{t?.perRoomPerNight || 'Per kamar / malam'}</span>
              </div>

              {hotel.rooms?.map((room) => (
                <div
                  key={room.id}
                  className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-card hover:border-brand-300 transition-all flex flex-col md:flex-row gap-5"
                >
                  {/* Room Photo */}
                  <div className="w-full md:w-56 h-44 md:h-auto rounded-xl overflow-hidden shrink-0 bg-slate-100">
                    <img
                      src={room.image || hotel.mainImage}
                      alt={room.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Room Specs & Amenities */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="text-base sm:text-lg font-bold text-slate-900">
                          {room.name}
                        </h4>
                        {room.remainingRooms <= 2 && (
                          <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                            {t?.remainingRoomsAlert?.replace('{count}', room.remainingRooms) || `Sisa ${room.remainingRooms} kamar!`}
                          </span>
                        )}
                      </div>

                      {/* Specs pills */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mt-2">
                        <span className="flex items-center gap-1 font-medium bg-slate-50 px-2 py-1 rounded-md border border-slate-200">
                          <Maximize2 className="w-3.5 h-3.5 text-slate-500" />
                          {room.size}
                        </span>
                        <span className="flex items-center gap-1 font-medium bg-slate-50 px-2 py-1 rounded-md border border-slate-200">
                          <Bed className="w-3.5 h-3.5 text-slate-500" />
                          {room.bedType}
                        </span>
                        <span className="flex items-center gap-1 font-medium bg-slate-50 px-2 py-1 rounded-md border border-slate-200">
                          <Users className="w-3.5 h-3.5 text-slate-500" />
                          {t?.adultGuestsText?.replace('{count}', room.maxGuests) || `${room.maxGuests} Dewasa`}
                        </span>
                      </div>

                      {/* Room Amenities list */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {room.amenities?.map((amenity, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded"
                          >
                            • {amenity}
                          </span>
                        ))}
                      </div>

                      {/* Benefits & Policies */}
                      <div className="mt-3 pt-3 border-t border-slate-100 space-y-1 text-xs">
                        {room.freeBreakfast && (
                          <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                            <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                            {t?.freeBreakfastIncluded || 'Sarapan prasmanan termasuk'}
                          </div>
                        )}
                        {room.freeCancellation ? (
                          <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                            <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                            {t?.freeCancellationAvailable || 'Pembatalan gratis s.d H-1'}
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-amber-700 font-medium">
                            <Info className="w-3.5 h-3.5 text-amber-600" />
                            {lang === 'en' ? 'Non-refundable' : lang === 'ms' ? 'Khas (Non-refundable)' : 'Promo (Non-refundable)'}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Price and CTA */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        {room.originalPrice && (
                          <span className="text-xs text-slate-400 line-through block">
                            {formatCurrency(room.originalPrice, currency)}
                          </span>
                        )}
                        <span className="text-xl font-black text-cta">
                          {formatCurrency(room.price, currency)}
                        </span>
                        <span className="text-[11px] text-slate-400 block font-medium">
                          {t?.taxExcluded || 'Di luar pajak & biaya layanan'}
                        </span>
                      </div>

                      <button
                        onClick={() => onSelectRoom(hotel, room)}
                        className="px-5 py-2.5 bg-cta hover:bg-cta-hover text-white font-extrabold text-sm rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-1"
                      >
                        {t?.bookNow || 'Pesan Sekarang'}
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Ringkasan Hotel */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                <h4 className="text-base font-bold text-slate-900 mb-2">
                  {lang === 'en' ? 'About Property' : lang === 'ms' ? 'Tentang Penginapan' : 'Tentang Akomodasi'}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {hotel.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-xl border border-slate-200">
                  <h5 className="font-bold text-sm text-slate-800 mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-brand-600" />
                    Check-in & Check-out
                  </h5>
                  <div className="space-y-1 text-xs text-slate-600">
                    <p>
                      <span className="font-semibold text-slate-700">Check-in:</span> {hotel.country === 'Singapore' ? '14:00 (SGT)' : hotel.country === 'Malaysia' ? '14:00 (MYT)' : '14:00 (WIB)'}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-700">Check-out:</span> {hotel.country === 'Singapore' ? '12:00 (SGT)' : hotel.country === 'Malaysia' ? '12:00 (MYT)' : '12:00 (WIB)'}
                    </p>
                    <p className="text-slate-400 pt-1">
                      {t?.receptionText || (lang === 'en' ? '24-hour front desk.' : lang === 'ms' ? 'Kaunter 24 jam.' : 'Resepsionis 24 jam.')}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-slate-200">
                  <h5 className="font-bold text-sm text-slate-800 mb-2 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-brand-600" />
                    {t?.hygieneProtocolTitle || (lang === 'en' ? 'Hygiene Standards' : lang === 'ms' ? 'Piawaian Kebersihan' : 'Protokol Kebersihan')}
                  </h5>
                  <div className="space-y-1 text-xs text-slate-600">
                    {hotel.country === 'Singapore' ? (
                      <>
                        <p>✓ SG Clean Certified (Singapore Tourism Board & NEA)</p>
                        <p>✓ Daily sanitization & international hotel linen sterilization</p>
                        <p>✓ Professional multilingual hospitality team</p>
                      </>
                    ) : hotel.country === 'Malaysia' ? (
                      <>
                        <p>✓ Pensijilan Clean & Safe Malaysia (MOTAC & MAH)</p>
                        <p>✓ Pembersihan berkala dan pensterilan linen antarabangsa</p>
                        <p>✓ Khidmat hospitaliti mesra profesional Malaysia</p>
                      </>
                    ) : (
                      <>
                        <p>✓ Sertifikasi CHSE Kemenparekraf RI</p>
                        <p>✓ Pembersihan berkala dan sterilisasi sprei standar internasional</p>
                        <p>✓ Staf terlatih dan keramahan otentik khas Indonesia</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Fasilitas Lengkap */}
          {activeTab === 'facilities' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <h5 className="font-bold text-sm text-slate-800 mb-3 flex items-center gap-2">
                  <Waves className="w-4 h-4 text-brand-600" />
                  {lang === 'en' ? 'Wellness & Relaxation' : lang === 'ms' ? 'Kesihatan & Relaksasi' : 'Kebugaran & Relaksasi'}
                </h5>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li>• {lang === 'en' ? 'Heated infinity swimming pool' : 'Kolam renang infinity air hangat'}</li>
                  <li>• {lang === 'en' ? '24-hour modern fitness center' : 'Pusat kebugaran / Gym modern 24 jam'}</li>
                  <li>• {lang === 'en' ? 'Luxury Spa & Traditional Massage' : 'Spa & Pusat Pijat Tradisional'}</li>
                  <li>• {lang === 'en' ? 'Jacuzzi & Steam Sauna' : 'Jacuzzi & Sauna'}</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <h5 className="font-bold text-sm text-slate-800 mb-3 flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-brand-600" />
                  {lang === 'en' ? 'Dining & Lounges' : lang === 'ms' ? 'Makanan & Minuman' : 'Makanan & Minuman'}
                </h5>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li>• {lang === 'en' ? 'Fine dining signature restaurant' : 'Restoran santapan mewah (Fine Dining)'}</li>
                  <li>• {lang === 'en' ? 'Poolside bar & sunset lounge' : 'Bar tepi kolam & Lounge senja'}</li>
                  <li>• {lang === 'en' ? '24-hour in-room dining service' : 'Layanan kamar (Room service) 24 jam'}</li>
                  <li>• {lang === 'en' ? 'Artisan café & high-tea selection' : 'Kafe kopi spesialti & afternoon tea'}</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <h5 className="font-bold text-sm text-slate-800 mb-3 flex items-center gap-2">
                  <Wifi className="w-4 h-4 text-brand-600" />
                  {lang === 'en' ? 'General Services' : lang === 'ms' ? 'Perkhidmatan Am' : 'Layanan & Fasilitas Umum'}
                </h5>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li>• {lang === 'en' ? 'High-speed complimentary Wi-Fi across property' : 'High-speed Wi-Fi gratis di seluruh area'}</li>
                  <li>• {lang === 'en' ? 'Airport shuttle transfer service' : 'Antar-jemput bandara (Airport Shuttle)'}</li>
                  <li>• {lang === 'en' ? 'Free valet parking & luggage storage' : 'Parkir valet gratis & penitipan bagasi'}</li>
                  <li>• {lang === 'en' ? '24-hour concierge & regional tour assistance' : 'Concierge & tur wisata lokal'}</li>
                </ul>
              </div>
            </div>
          )}

          {/* Tab 4: Ulasan Tamu */}
          {activeTab === 'reviews' && (
            <div className="space-y-5">
              {/* Score Breakdown Bars */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col md:flex-row items-center gap-6">
                <div className="text-center md:text-left shrink-0">
                  <div className="text-4xl font-black text-brand-600">
                    {hotel.rating} <span className="text-base text-slate-400 font-medium">/ 10</span>
                  </div>
                  <div className="text-sm font-bold text-slate-800 mt-1">
                    {getRatingDescription(hotel.rating, lang)}
                  </div>
                  <div className="text-xs text-slate-500">
                    {lang === 'en'
                      ? `Based on ${hotel.reviewsCount.toLocaleString('en-SG')} verified reviews`
                      : lang === 'ms'
                      ? `Berdasarkan ${hotel.reviewsCount.toLocaleString('ms-MY')} ulasan disahkan`
                      : `Berdasarkan ${hotel.reviewsCount.toLocaleString('id-ID')} ulasan terverifikasi`}
                  </div>
                </div>

                <div className="flex-1 w-full grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <div className="flex justify-between font-semibold text-slate-700 mb-1">
                      <span>{t?.metricCleanliness || 'Kebersihan'}</span>
                      <span>{hotel.reviewBreakdown?.cleanliness || 9.5} / 10</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-brand-500 h-full rounded-full" style={{ width: `${(hotel.reviewBreakdown?.cleanliness || 9.5) * 10}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold text-slate-700 mb-1">
                      <span>{t?.metricComfort || 'Kenyamanan'}</span>
                      <span>{hotel.reviewBreakdown?.comfort || 9.4} / 10</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-brand-500 h-full rounded-full" style={{ width: `${(hotel.reviewBreakdown?.comfort || 9.4) * 10}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold text-slate-700 mb-1">
                      <span>{t?.metricService || 'Pelayanan Staf'}</span>
                      <span>{hotel.reviewBreakdown?.service || 9.6} / 10</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-brand-500 h-full rounded-full" style={{ width: `${(hotel.reviewBreakdown?.service || 9.6) * 10}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold text-slate-700 mb-1">
                      <span>{t?.metricLocation || 'Lokasi Strategis'}</span>
                      <span>{hotel.reviewBreakdown?.location || 9.2} / 10</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-brand-500 h-full rounded-full" style={{ width: `${(hotel.reviewBreakdown?.location || 9.2) * 10}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sample Verified Guest Reviews (Dynamic per Country) */}
              <div className="space-y-3">
                {hotel.country === 'Singapore' ? (
                  <>
                    <div className="p-4 rounded-xl border border-slate-200 bg-white">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-brand-50 text-brand-700 font-bold text-xs flex items-center justify-center">
                            BT
                          </div>
                          <span className="font-bold text-xs text-slate-800">Benjamin Tan</span>
                          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-semibold">
                            {lang === 'en' ? 'Verified Guest' : 'Tamu Terverifikasi'}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-brand-600">10 / 10</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        "Outstanding skyline views and premier hospitality. The infinity pool and attentive front desk made our vacation sensational."
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 bg-white">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-brand-50 text-brand-700 font-bold text-xs flex items-center justify-center">
                            RL
                          </div>
                          <span className="font-bold text-xs text-slate-800">Rachel Lim</span>
                          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-semibold">
                            {lang === 'en' ? 'Verified Guest' : 'Tamu Terverifikasi'}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-brand-600">9.6 / 10</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        "Sparkling clean room, smooth check-in, and world-class dining. Booking via NusaStay was effortless."
                      </p>
                    </div>
                  </>
                ) : hotel.country === 'Malaysia' ? (
                  <>
                    <div className="p-4 rounded-xl border border-slate-200 bg-white">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-brand-50 text-brand-700 font-bold text-xs flex items-center justify-center">
                            FA
                          </div>
                          <span className="font-bold text-xs text-slate-800">Farid Azman</span>
                          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-semibold">
                            {lang === 'en' ? 'Verified Guest' : lang === 'ms' ? 'Tetamu Disahkan' : 'Tamu Terverifikasi'}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-brand-600">10 / 10</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        "Penginapan yang sungguh selesa dan bertaraf dunia. Pemandangan KLCC yang memukau dan layanan kakitangan yang sangat prihatin."
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 bg-white">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-brand-50 text-brand-700 font-bold text-xs flex items-center justify-center">
                            NH
                          </div>
                          <span className="font-bold text-xs text-slate-800">Nurul Huda</span>
                          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-semibold">
                            {lang === 'en' ? 'Verified Guest' : lang === 'ms' ? 'Tetamu Disahkan' : 'Tamu Terverifikasi'}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-brand-600">9.5 / 10</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        "Bilik luas, sarapan bufet yang menyelerakan dan kolam renang yang mendamaikan. Pasti akan tempah lagi melalui NusaStay."
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-4 rounded-xl border border-slate-200 bg-white">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-brand-50 text-brand-700 font-bold text-xs flex items-center justify-center">
                            BP
                          </div>
                          <span className="font-bold text-xs text-slate-800">Budi Pratama</span>
                          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-semibold">
                            {lang === 'en' ? 'Verified Guest' : 'Tamu Terverifikasi'}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-brand-600">10 / 10</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        "Pengalaman menginap yang luar biasa sempurna! Pelayanan staf sangat ramah dan tanggap, sarapannya variatif dan lezat sekali. Anak-anak sangat menikmati kolam renangnya. Pasti akan kembali lagi!"
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 bg-white">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-brand-50 text-brand-700 font-bold text-xs flex items-center justify-center">
                            SS
                          </div>
                          <span className="font-bold text-xs text-slate-800">Siti Sarah</span>
                          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-semibold">
                            {lang === 'en' ? 'Verified Guest' : 'Tamu Terverifikasi'}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-brand-600">9.5 / 10</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        "Kamar bersih, pemandangannya sangat indah dan fasilitasnya lengkap. Lokasi sangat dekat dengan atraksi utama. Booking lewat NusaStay juga sangat mulus tanpa kendala check-in."
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
