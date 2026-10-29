import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Users, 
  ShieldCheck, 
  CheckCircle, 
  CreditCard, 
  QrCode, 
  Building2, 
  Bed, 
  Download,
  Share2,
  Clock
} from 'lucide-react';
import { formatCurrency, formatDateIndo, calculateNights } from '../utils/formatters';

export function BookingCheckoutModal({
  hotel,
  room,
  checkInDate,
  checkOutDate,
  guests,
  onClose,
  onBookingSuccess,
  showToast,
  t,
  currency = 'IDR',
  lang = 'id'
}) {
  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [formData, setFormData] = useState({
    fullName: lang === 'en' ? 'John Tan' : lang === 'ms' ? 'Ahmad Firdaus' : 'Budi Pratama',
    phone: lang === 'en' ? '+65 9123 4567' : lang === 'ms' ? '+60 12-345 6789' : '081234567890',
    email: lang === 'en' ? 'johntan@gmail.com' : lang === 'ms' ? 'ahmad.firdaus@gmail.com' : 'budi.pratama@gmail.com',
    specialRequests: ['Ranjang besar (King)', 'Bebas asap rokok']
  });
  const [paymentMethod, setPaymentMethod] = useState(currency === 'MYR' ? 'maybank' : currency === 'SGD' ? 'paynow' : 'bca');
  const [bookingCode, setBookingCode] = useState('');

  const nights = calculateNights(checkInDate, checkOutDate);
  const baseRoomTotal = (room?.price || hotel?.price || 1500000) * nights;
  const taxRate = currency === 'SGD' ? 0.09 : currency === 'MYR' ? 0.08 : 0.11;
  const taxAndService = Math.round(baseRoomTotal * taxRate);
  const memberDiscount = 150000;
  const totalAmount = Math.max(0, baseRoomTotal + taxAndService - memberDiscount);

  const getPaymentMethods = () => {
    if (currency === 'MYR') {
      return [
        { id: 'maybank', name: 'Maybank2u', iconType: 'bank' },
        { id: 'cimb', name: 'CIMB Clicks', iconType: 'bank' },
        { id: 'tng', name: "Touch 'n Go", iconType: 'qr' },
        { id: 'cc', name: 'Kad Kredit', iconType: 'card' },
      ];
    }
    if (currency === 'SGD') {
      return [
        { id: 'paynow', name: 'PayNow / QR', iconType: 'qr' },
        { id: 'dbs', name: 'DBS PayLah!', iconType: 'bank' },
        { id: 'ocbc', name: 'OCBC Pay', iconType: 'bank' },
        { id: 'cc', name: 'Credit Card', iconType: 'card' },
      ];
    }
    return [
      { id: 'bca', name: 'BCA Virtual Account', iconType: 'bank' },
      { id: 'mandiri', name: 'Mandiri VA', iconType: 'bank' },
      { id: 'gopay', name: 'GoPay / QRIS', iconType: 'qr' },
      { id: 'cc', name: 'Kartu Kredit', iconType: 'card' },
    ];
  };

  const renderPaymentIcon = (iconType) => {
    if (iconType === 'bank') return <Building2 className="w-5 h-5 text-brand-600" />;
    if (iconType === 'qr') return <QrCode className="w-5 h-5 text-brand-600" />;
    return <CreditCard className="w-5 h-5 text-brand-600" />;
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    const code = 'NUSA-' + Math.floor(100000 + Math.random() * 900000);
    setBookingCode(code);
    setStep('success');
    if (onBookingSuccess) {
      onBookingSuccess(code, hotel.name, room.name);
    }
  };

  const handleDownloadVoucher = () => {
    const tz = hotel?.country === 'Singapore' ? 'SGT' : hotel?.country === 'Malaysia' ? 'MYT' : 'WIB';
    const conciergePhone = hotel?.country === 'Singapore' ? '+65 6788 9000' : hotel?.country === 'Malaysia' ? '+60 3-8088 9000' : '+62 21-5088-9000';
    const vLabels = {
      title: lang === 'en' ? 'Official NusaStay E-Voucher' : lang === 'ms' ? 'E-Baucar Rasmi NusaStay' : 'E-Voucher Resmi NusaStay',
      confirmed: lang === 'en' ? 'CONFIRMED' : lang === 'ms' ? 'DISAHKAN' : 'TERKONFIRMASI',
      roomType: lang === 'en' ? 'Room Type:' : lang === 'ms' ? 'Jenis Bilik:' : 'Tipe Kamar:',
      guestName: lang === 'en' ? 'Guest Name:' : lang === 'ms' ? 'Nama Tetamu:' : 'Nama Tamu:',
      contact: lang === 'en' ? 'Contact:' : lang === 'ms' ? 'No. Telefon:' : 'No. Kontak:',
      checkIn: 'Check-in:',
      checkOut: 'Check-out:',
      duration: lang === 'en' ? 'Duration:' : lang === 'ms' ? 'Tempoh:' : 'Durasi:',
      nights: lang === 'en' ? 'Nights' : 'Malam',
      paymentMethod: lang === 'en' ? 'Payment Method:' : lang === 'ms' ? 'Kaedah Bayaran:' : 'Metode Bayar:',
      totalPaid: lang === 'en' ? 'Total Amount:' : lang === 'ms' ? 'Jumlah Bayaran:' : 'Total Biaya:',
      footerDesc: lang === 'en'
        ? 'Please present this e-voucher and valid government ID upon check-in at the hotel front desk.'
        : lang === 'ms'
        ? 'Sila tunjukkan e-baucar ini dan kad pengenalan rasmi semasa daftar masuk di kaunter hotel.'
        : 'Harap tunjukkan e-voucher ini beserta kartu identitas resmi saat check-in di resepsionis hotel.',
      support: lang === 'en' ? '24/7 NusaStay Concierge:' : lang === 'ms' ? 'Khidmat Tetamu NusaStay 24 Jam:' : 'NusaStay Concierge 24 Jam:'
    };

    const voucherHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${vLabels.title} - ${bookingCode}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #0F172A; background: #F8FAFC; }
    .card { max-width: 640px; margin: 0 auto; border: 1px solid #E2E8F0; border-radius: 16px; padding: 32px; background: #fff; box-shadow: 0 4px 16px rgba(0,0,0,0.06); }
    .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px dashed #CBD5E1; padding-bottom: 20px; }
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
        <div class="code">${bookingCode}</div>
      </div>
      <div class="badge">${vLabels.confirmed}</div>
    </div>
    <div class="section">
      <h3 style="margin: 0 0 16px 0; font-size: 18px; color: #0F172A;">${hotel?.name || 'Hotel NusaStay'}</h3>
      <div class="row"><span class="label">${vLabels.roomType}</span><span class="val">${room?.name || 'Deluxe Room'}</span></div>
      <div class="row"><span class="label">${vLabels.guestName}</span><span class="val">${formData.fullName}</span></div>
      <div class="row"><span class="label">${vLabels.contact}</span><span class="val">${formData.phone || formData.email}</span></div>
      <div class="row"><span class="label">${vLabels.checkIn}</span><span class="val">${checkInDate} (14:00 ${tz})</span></div>
      <div class="row"><span class="label">${vLabels.checkOut}</span><span class="val">${checkOutDate} (12:00 ${tz})</span></div>
      <div class="row"><span class="label">${vLabels.duration}</span><span class="val">${nights} ${vLabels.nights}</span></div>
      <div class="row"><span class="label">${vLabels.paymentMethod}</span><span class="val">${formData.paymentMethod === 'hotel' ? 'Pay at Property' : 'Instant Online Payment'}</span></div>
      <div class="row" style="font-size: 16px; margin-top: 16px; padding-top: 12px; border-top: 1px solid #E2E8F0;">
        <span class="label" style="font-weight: 800; color: #0F172A;">${vLabels.totalPaid}</span>
        <span class="val" style="color: #FF5E1F; font-size: 18px;">${formatCurrency(totalAmount, currency)}</span>
      </div>
    </div>
    <div class="footer">
      ${vLabels.footerDesc}<br/>
      ${vLabels.support} ${conciergePhone}
    </div>
  </div>
</body>
</html>`;
    const blob = new Blob([voucherHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Voucher-NusaStay-${bookingCode}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    if (typeof showToast === 'function') {
      showToast(
        lang === 'ms' 
          ? `E-Baucar ${bookingCode} berjaya dimuat turun!` 
          : lang === 'en' 
          ? `E-Voucher ${bookingCode} downloaded successfully!` 
          : `E-Voucher ${bookingCode} berhasil diunduh!`
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-modal border border-slate-200 w-full max-w-3xl overflow-hidden animate-in zoom-in-95 duration-200 my-auto">
        
        {/* Header */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-500 text-white flex items-center justify-center font-bold">
              ✓
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">
                {step === 'form' ? (t?.checkoutTitle || 'Konfirmasi Pemesanan & Pembayaran') : (t?.confirmedTitle || 'Pemesanan Berhasil Terkonfirmasi!')}
              </h3>
              <p className="text-xs text-slate-500">
                {step === 'form' ? (t?.checkoutSubtitle || 'Langkah terakhir untuk mengamankan kamar Anda') : (t?.confirmedSubtitle || 'E-Voucher resmi telah diterbitkan oleh NusaStay')}
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

        {step === 'form' ? (
          <form onSubmit={handleSubmitBooking} className="p-6 space-y-6">
            
            {/* 1. Hotel & Room Summary Box */}
            <div className="bg-brand-50/60 border border-brand-200 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div>
                <span className="text-[11px] font-bold text-brand-700 bg-white px-2 py-0.5 rounded shadow-2xs uppercase">
                  {hotel?.type || 'HOTEL'}
                </span>
                <h4 className="font-black text-slate-900 text-base mt-1">{hotel?.name}</h4>
                <div className="text-xs text-slate-600 font-semibold mt-0.5 flex items-center gap-1.5">
                  <Bed className="w-3.5 h-3.5 text-brand-600" />
                  <span>Kamar: {room?.name || 'Deluxe Room'}</span>
                </div>
              </div>

              <div className="text-xs text-slate-600 sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-brand-200">
                <div className="font-bold text-slate-800">
                  {formatDateIndo(checkInDate, lang)} - {formatDateIndo(checkOutDate, lang)}
                </div>
                <div className="text-slate-500">
                  {nights} {t?.nights || 'Malam'} • {guests.adults} {t?.adults || 'Dewasa'} ({guests.rooms} {t?.rooms || 'Kamar'})
                </div>
              </div>
            </div>

            {/* 2. Contact Information Inputs */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                {t?.guestDetailsTitle || '1. Data Tamu & Pemesan'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t?.fullNameLabel || 'Nama Lengkap (sesuai KTP / Paspor)'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t?.phoneLabel || 'No. Handphone (WhatsApp)'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t?.emailLabel || 'Alamat Email (E-Voucher akan dikirim ke sini)'}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 3. Payment Method */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                {t?.paymentMethodTitle || '2. Metode Pembayaran Cepat'}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {getPaymentMethods().map(pm => (
                  <label
                    key={pm.id}
                    onClick={() => setPaymentMethod(pm.id)}
                    className={`p-3 rounded-xl border cursor-pointer text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === pm.id
                        ? 'border-brand-500 bg-brand-50 text-brand-700 font-bold shadow-xs'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    {renderPaymentIcon(pm.iconType)}
                    <span className="text-xs">{pm.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 4. Transparent Price Breakdown */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>{t?.roomCost || 'Biaya Kamar'} ({nights} {t?.nights || 'Malam'} x {formatCurrency(room?.price || hotel?.price, currency)})</span>
                <span className="font-semibold text-slate-800">{formatCurrency(baseRoomTotal, currency)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>{t?.taxAndServiceLabel || t?.taxAndService || (currency === 'SGD' ? 'GST & Service Charge (9%)' : currency === 'MYR' ? 'Cukai SST & Caj Perkhidmatan (8%)' : 'Pajak PPN & Biaya Layanan (11%)')}</span>
                <span className="font-semibold text-slate-800">{formatCurrency(taxAndService, currency)}</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>{t?.memberDiscount || 'Diskon Eksklusif Member NusaStay'}</span>
                <span>- {formatCurrency(memberDiscount, currency)}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-sm">
                <span className="font-extrabold text-slate-900">{t?.totalPayment || 'Total Pembayaran'}</span>
                <span className="text-xl font-black text-cta">{formatCurrency(totalAmount, currency)}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-cta hover:bg-cta-hover text-white font-extrabold text-base rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 active:scale-98"
            >
              <span>{t?.payAndConfirm || 'Bayar & Konfirmasi Pemesanan'} ({formatCurrency(totalAmount, currency)})</span>
            </button>

            <div className="text-center text-[11px] text-slate-400 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
              <span>
                {lang === 'en'
                  ? '256-bit PCI-DSS encrypted'
                  : lang === 'ms'
                  ? 'Penyulitan PCI-DSS 256-bit'
                  : 'Enkripsi PCI-DSS 256-bit'}
              </span>
            </div>

          </form>
        ) : (
          /* Step 2: Booking Confirmed / E-Voucher Screen */
          <div className="p-6 text-center space-y-5">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                {lang === 'en' ? 'Payment Successful' : lang === 'ms' ? 'Bayaran Berjaya' : 'Pembayaran Sukses'}
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-2">
                {t?.confirmedTitle || 'Selamat, Pesanan Anda Berhasil!'}
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                {lang === 'en'
                  ? <>E-Voucher has been sent to <strong className="text-slate-800">{formData.email}</strong></>
                  : lang === 'ms'
                  ? <>E-Baucar telah dihantar ke e-mel <strong className="text-slate-800">{formData.email}</strong></>
                  : <>E-Voucher telah dikirimkan ke email <strong className="text-slate-800">{formData.email}</strong></>}
              </p>
            </div>

            {/* Voucher Card Mockup */}
            <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 border border-slate-200 rounded-2xl p-5 text-left max-w-lg mx-auto shadow-sm">
              <div className="flex justify-between items-start border-b border-slate-200 pb-3 mb-3">
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">{t?.bookingCodeLabel || 'No. Booking NusaStay'}</div>
                  <div className="text-lg font-mono font-black text-brand-600 tracking-wider">
                    {bookingCode}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Status</div>
                  <div className="text-xs font-extrabold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded">
                    {t?.statusConfirmed || 'TERKONFIRMASI'}
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-700">
                <p><strong className="text-slate-900">Hotel:</strong> {hotel?.name}</p>
                <p><strong className="text-slate-900">{lang === 'en' ? 'Room Type:' : lang === 'ms' ? 'Jenis Bilik:' : 'Tipe Kamar:'}</strong> {room?.name || 'Deluxe Room'}</p>
                <p><strong className="text-slate-900">{lang === 'en' ? 'Guest:' : lang === 'ms' ? 'Tetamu:' : 'Tamu:'}</strong> {formData.fullName} ({guests.adults} {t?.adults || 'Dewasa'})</p>
                <p><strong className="text-slate-900">{lang === 'en' ? 'Schedule:' : lang === 'ms' ? 'Jadual:' : 'Jadwal:'}</strong> {formatDateIndo(checkInDate, lang)} - {formatDateIndo(checkOutDate, lang)} ({nights} {t?.nights || 'Malam'})</p>
              </div>

              <div className="mt-4 pt-3 border-t border-dashed border-slate-300 flex items-center justify-between text-xs">
                <span className="text-slate-500">
                  {lang === 'en' ? 'Present this e-voucher upon check-in at the hotel front desk.' : lang === 'ms' ? 'Tunjukkan e-baucar ini semasa daftar masuk di kaunter hotel.' : 'Tunjukkan e-voucher ini saat check-in di resepsionis hotel.'}
                </span>
                <QrCode className="w-8 h-8 text-slate-800" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                type="button"
                onClick={handleDownloadVoucher}
                className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                {t?.downloadPdf || 'Unduh PDF Voucher'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl transition-colors"
              >
                {t?.backToHome || 'Kembali ke Beranda'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
