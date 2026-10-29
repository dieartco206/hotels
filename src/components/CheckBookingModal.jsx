import React, { useState } from 'react';
import { 
  X, 
  Search, 
  FileText, 
  CheckCircle2, 
  Calendar, 
  Users, 
  Bed, 
  MapPin, 
  Download, 
  QrCode, 
  ShieldCheck, 
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { formatDateIndo } from '../utils/formatters';
import { hotelsApi } from '../services/api';

export function CheckBookingModal({ 
  isOpen, 
  onClose, 
  lang = 'id', 
  t, 
  showToast 
}) {
  const [bookingCode, setBookingCode] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [searchResult, setSearchResult] = useState(null); // null | 'not_found' | bookingObject
  const [isSearching, setIsSearching] = useState(false);

  if (!isOpen) return null;

  // Sample mock booking for instant preview
  const sampleBooking = React.useMemo(() => {
    if (lang === 'en') {
      return {
        code: 'NUSA-829142',
        hotelName: 'The Fullerton Hotel Singapore',
        roomName: 'Heritage Room Marina View',
        checkIn: '2026-11-18',
        checkOut: '2026-11-21',
        nights: 3,
        guests: 'John Tan (2 Adults)',
        area: 'Marina Bay, Singapore',
        totalPrice: 'SGD 1,485.00',
        status: 'CONFIRMED',
        bookedAt: '12 Oct 2026, 14:30 SGT'
      };
    }
    if (lang === 'ms') {
      return {
        code: 'NUSA-829142',
        hotelName: 'Mandarin Oriental Kuala Lumpur',
        roomName: 'Club Executive Park View',
        checkIn: '2026-11-18',
        checkOut: '2026-11-21',
        nights: 3,
        guests: 'Ahmad Firdaus (2 Dewasa)',
        area: 'KLCC, Kuala Lumpur, Malaysia',
        totalPrice: 'RM 2,850.00',
        status: 'DISAHKAN',
        bookedAt: '12 Okt 2026, 14:30 MYT'
      };
    }
    return {
      code: 'NUSA-829142',
      hotelName: 'The Apurva Kempinski Bali',
      roomName: 'Grand Deluxe Ocean View',
      checkIn: '2026-11-18',
      checkOut: '2026-11-21',
      nights: 3,
      guests: 'Budi Pratama (2 Dewasa)',
      area: 'Sawangan, Nusa Dua, Bali, Indonesia',
      totalPrice: 'Rp 7.488.000',
      status: 'TERKONFIRMASI',
      bookedAt: '12 Okt 2026, 14:30 WIB'
    };
  }, [lang]);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    const cleanInput = bookingCode.trim();
    if (!cleanInput) return;

    setIsSearching(true);
    setSearchResult(null);

    try {
      const b = await hotelsApi.getBookingByCode(cleanInput);
      setSearchResult({
        code: b.booking_code,
        hotelName: b.hotel?.name || 'Luxury Hotel',
        roomName: b.room?.name || 'Deluxe Category',
        checkIn: typeof b.check_in === 'string' ? b.check_in.split('T')[0] : '2026-11-18',
        checkOut: typeof b.check_out === 'string' ? b.check_out.split('T')[0] : '2026-11-20',
        nights: b.nights || 1,
        guests: `${b.guest_name} (${b.guests_count} Guests)`,
        area: b.hotel?.city ? `${b.hotel.city}, ${b.hotel.country}` : 'Singapore',
        totalPrice: `${b.currency || 'SGD'} ${Math.round(b.total_amount || 0).toLocaleString('en-US')}`,
        status: (b.status || 'CONFIRMED').toUpperCase(),
        bookedAt: new Date(b.created_at || Date.now()).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      });
    } catch (err) {
      setSearchResult('not_found');
    } finally {
      setIsSearching(false);
    }
  };

  const handleUseSample = (code = 'HTL-SG-8812') => {
    setBookingCode(code);
    setEmailOrPhone('guest@example.com');
  };

  const handleDownloadVoucher = () => {
    const code = searchResult?.code || 'NUSA-829142';
    const tz = lang === 'en' ? 'SGT' : lang === 'ms' ? 'MYT' : 'WIB';
    const conciergePhone = lang === 'en' ? '+65 6788 9000' : lang === 'ms' ? '+60 3-8088 9000' : '+62 21-5088-9000';
    const content = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>E-Voucher NusaStay - ${code}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #0F172A; }
    .card { max-width: 650px; margin: 0 auto; border: 1px solid #E2E8F0; border-radius: 16px; padding: 32px; background: #fff; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px dashed #E2E8F0; padding-bottom: 20px; }
    .logo { font-size: 24px; font-weight: 900; color: #0064D2; }
    .badge { background: #ECFDF5; color: #047857; font-size: 12px; font-weight: 800; padding: 6px 12px; border-radius: 8px; }
    .code { font-family: monospace; font-size: 18px; font-weight: 800; color: #0064D2; margin-top: 4px; }
    .section { margin-top: 24px; }
    .row { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 14px; }
    .label { color: #64748B; font-weight: 500; }
    .val { font-weight: 700; color: #0F172A; text-align: right; }
    .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #E2E8F0; font-size: 12px; color: #64748B; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div>
        <div class="logo">NusaStay</div>
        <div class="code">${code}</div>
      </div>
      <div class="badge">✓ ${searchResult?.status || 'TERKONFIRMASI'}</div>
    </div>
    <div class="section">
      <div class="row"><span class="label">${lang === 'en' ? 'Hotel Name:' : lang === 'ms' ? 'Nama Hotel:' : 'Nama Hotel:'}</span><span class="val">${searchResult?.hotelName}</span></div>
      <div class="row"><span class="label">${lang === 'en' ? 'Room Type:' : lang === 'ms' ? 'Jenis Bilik:' : 'Tipe Kamar:'}</span><span class="val">${searchResult?.roomName}</span></div>
      <div class="row"><span class="label">${lang === 'en' ? 'Guest Name:' : lang === 'ms' ? 'Nama Tetamu:' : 'Nama Tamu:'}</span><span class="val">${searchResult?.guests}</span></div>
      <div class="row"><span class="label">Check-in:</span><span class="val">${searchResult?.checkIn} (14:00 ${tz})</span></div>
      <div class="row"><span class="label">Check-out:</span><span class="val">${searchResult?.checkOut} (12:00 ${tz})</span></div>
      <div class="row"><span class="label">${lang === 'en' ? 'Duration:' : lang === 'ms' ? 'Tempoh:' : 'Durasi:'}</span><span class="val">${searchResult?.nights} ${lang === 'en' ? 'Nights' : 'Malam'}</span></div>
      <div class="row"><span class="label">${lang === 'en' ? 'Location:' : lang === 'ms' ? 'Lokasi:' : 'Lokasi:'}</span><span class="val">${searchResult?.area}</span></div>
      <div class="row" style="font-size: 16px; margin-top: 16px; padding-top: 12px; border-top: 1px solid #E2E8F0;">
        <span class="label" style="font-weight: 800; color: #0F172A;">${lang === 'en' ? 'Total Amount:' : lang === 'ms' ? 'Jumlah Bayaran:' : 'Total Biaya:'}</span>
        <span class="val" style="color: #FF5E1F; font-size: 18px;">${searchResult?.totalPrice}</span>
      </div>
    </div>
    <div class="footer">
      ${lang === 'en' ? 'Present this e-voucher upon check-in at the hotel front desk.' : lang === 'ms' ? 'Tunjukkan e-baucar ini semasa daftar masuk di kaunter hotel.' : 'Tunjukkan e-voucher ini saat check-in di resepsionis hotel.'}<br>
      ${lang === 'en' ? '24/7 Concierge Support:' : lang === 'ms' ? 'Khidmat Pelanggan 24 Jam:' : 'Layanan Pelanggan 24 Jam:'} ${conciergePhone} • support@nusastay.com
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NusaStay-Voucher-${code}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    if (showToast) {
      showToast(
        lang === 'en' ? 'E-Voucher Downloaded!' : lang === 'ms' ? 'E-Baucar Telah Dimuat Turun!' : 'E-Voucher Berhasil Diunduh!',
        lang === 'en' ? `Booking receipt ${code} saved to your device.` : lang === 'ms' ? `Resit tempahan ${code} disimpan ke peranti anda.` : `Bukti reservasi ${code} telah tersimpan di perangkat Anda.`,
        'success'
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-modal border border-slate-200 w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-200 my-auto">
        
        {/* Header */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center border border-brand-200">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                {lang === 'en' ? 'Check Booking' : lang === 'ms' ? 'Semak Tempahan' : 'Cek Pesanan'}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === 'en' ? 'Track your reservation & voucher' : lang === 'ms' ? 'Jejak tempahan & e-baucar anda' : 'Lacak reservasi & e-voucher Anda'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="space-y-3.5">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold text-slate-700">
                  {lang === 'en' ? 'Booking Code' : lang === 'ms' ? 'Kod Tempahan' : 'Kode Booking'}
                </label>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-brand-600">
                  <span className="text-slate-400 font-normal">Contoh:</span>
                  <button
                    type="button"
                    onClick={() => handleUseSample('HTL-SG-8812')}
                    className="hover:underline font-mono"
                  >
                    HTL-SG-8812
                  </button>
                  <span className="text-slate-300">•</span>
                  <button
                    type="button"
                    onClick={() => handleUseSample('HTL-ID-7721')}
                    className="hover:underline font-mono"
                  >
                    HTL-ID-7721
                  </button>
                </div>
              </div>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. HTL-SG-8812"
                  value={bookingCode}
                  onChange={(e) => setBookingCode(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm font-mono uppercase tracking-wider border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none placeholder:font-sans placeholder:normal-case placeholder:tracking-normal"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {lang === 'en' ? 'Email or WhatsApp' : lang === 'ms' ? 'E-mel atau WhatsApp' : 'Email atau WhatsApp'}
              </label>
              <input
                type="text"
                placeholder={lang === 'en' ? 'johntan@gmail.com' : lang === 'ms' ? 'ahmad.firdaus@gmail.com' : 'budi.pratama@gmail.com'}
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSearching}
              className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm rounded-xl shadow-sm hover:shadow transition-all duration-150 flex items-center justify-center gap-2 active:scale-98 disabled:opacity-75"
            >
              <Search className="w-4 h-4" />
              <span>{isSearching ? (lang === 'en' ? 'Searching...' : 'Mencari...') : (lang === 'en' ? 'Find Booking' : lang === 'ms' ? 'Semak Tempahan' : 'Cek Status Pesanan')}</span>
            </button>
          </form>

          {/* Search Result Display */}
          {searchResult === 'not_found' && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-800 animate-in fade-in duration-200">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-amber-900">
                  {lang === 'en' ? 'No booking matched your search' : lang === 'ms' ? 'Tiada tempahan sepadan dijumpai' : 'Pesanan Tidak Ditemukan'}
                </p>
                <p className="mt-0.5 text-amber-700">
                  {lang === 'en'
                    ? 'Please verify your booking code. You can click "Use Sample: NUSA-829142" above to preview a verified booking.'
                    : lang === 'ms'
                    ? 'Sila pastikan kod tempahan adalah betul. Anda boleh klik "Guna Contoh: NUSA-829142" untuk melihat pratonton tempahan.'
                    : 'Pastikan kode booking Anda benar. Anda juga dapat mengklik "Gunakan Contoh: NUSA-829142" di atas untuk melihat pratinjau e-voucher aktif.'}
                </p>
              </div>
            </div>
          )}

          {searchResult && typeof searchResult === 'object' && (
            <div className="border border-slate-200 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/40 p-4 sm:p-5 space-y-4 animate-in zoom-in-95 duration-200">
              
              {/* Card Header */}
              <div className="flex items-start justify-between border-b border-slate-200 pb-3">
                <div>
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                    {lang === 'en' ? 'Booking Code' : lang === 'ms' ? 'Kod Tempahan' : 'Kode Booking'}
                  </span>
                  <span className="text-base font-black font-mono text-brand-600 tracking-wider">
                    {searchResult.code}
                  </span>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 text-xs font-black px-2.5 py-1 rounded-lg">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    {searchResult.status}
                  </span>
                </div>
              </div>

              {/* Booking Specs */}
              <div className="space-y-2 text-xs">
                <div>
                  <h4 className="font-black text-slate-900 text-sm">{searchResult.hotelName}</h4>
                  <div className="flex items-center gap-1 text-slate-500 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-brand-500" />
                    <span>{searchResult.area}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <Bed className="w-4 h-4 text-slate-400" />
                    <div>
                      <span className="text-slate-400 block text-[10px]">{lang === 'en' ? 'Room Type' : 'Tipe Kamar'}</span>
                      <span className="font-bold text-slate-800">{searchResult.roomName}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-slate-400" />
                    <div>
                      <span className="text-slate-400 block text-[10px]">{lang === 'en' ? 'Guest' : 'Tamu'}</span>
                      <span className="font-bold text-slate-800">{searchResult.guests}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <Calendar className="w-4 h-4 text-brand-600" />
                  <div>
                    <span className="text-slate-400 block text-[10px]">{lang === 'en' ? 'Stay Period' : 'Periode Menginap'}</span>
                    <span className="font-bold text-slate-800">
                      {formatDateIndo(searchResult.checkIn, lang)} - {formatDateIndo(searchResult.checkOut, lang)} ({searchResult.nights} {lang === 'en' ? 'Nights' : 'Malam'})
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={handleDownloadVoucher}
                  className="flex-1 py-2.5 bg-cta hover:bg-cta-hover text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  {lang === 'en' ? 'Download Voucher' : 'Unduh Voucher'}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold rounded-xl transition-colors"
                >
                  {lang === 'en' ? 'Done' : 'Selesai'}
                </button>
              </div>

            </div>
          )}

          {/* Guarantee Footer */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
            <span>{lang === 'en' ? 'Encrypted reservation tracking' : 'Verifikasi reservasi terenkripsi'}</span>
          </div>

        </div>

      </div>
    </div>
  );
}
