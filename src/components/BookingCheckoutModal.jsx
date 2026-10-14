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
  Sparkles,
  Download,
  Share2,
  Clock
} from 'lucide-react';
import { formatRupiah, formatDateIndo, calculateNights } from '../utils/formatters';

export function BookingCheckoutModal({
  hotel,
  room,
  checkInDate,
  checkOutDate,
  guests,
  onClose,
  onBookingSuccess
}) {
  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [formData, setFormData] = useState({
    fullName: 'Budi Pratama',
    phone: '081234567890',
    email: 'budi.pratama@gmail.com',
    specialRequests: ['Ranjang besar (King)', 'Bebas asap rokok']
  });
  const [paymentMethod, setPaymentMethod] = useState('bca');
  const [bookingCode, setBookingCode] = useState('');

  const nights = calculateNights(checkInDate, checkOutDate);
  const baseRoomTotal = (room?.price || hotel?.price || 1500000) * nights;
  const taxAndService = Math.round(baseRoomTotal * 0.11);
  const memberDiscount = 150000;
  const totalAmount = Math.max(0, baseRoomTotal + taxAndService - memberDiscount);

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    const code = 'TVLK-' + Math.floor(100000 + Math.random() * 900000);
    setBookingCode(code);
    setStep('success');
    if (onBookingSuccess) {
      onBookingSuccess(code, hotel.name, room.name);
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
                {step === 'form' ? 'Konfirmasi Pemesanan & Pembayaran' : 'Pemesanan Berhasil Terkonfirmasi!'}
              </h3>
              <p className="text-xs text-slate-500">
                {step === 'form' ? 'Langkah terakhir untuk mengamankan kamar Anda' : 'E-Voucher resmi telah diterbitkan oleh Traveloka'}
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
                  {formatDateIndo(checkInDate)} - {formatDateIndo(checkOutDate)}
                </div>
                <div className="text-slate-500">
                  {nights} Malam • {guests.adults} Dewasa ({guests.rooms} Kamar)
                </div>
              </div>
            </div>

            {/* 2. Contact Information Inputs */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                1. Data Tamu & Pemesan
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nama Lengkap (sesuai KTP / Paspor)
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
                    No. Handphone (WhatsApp)
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
                    Alamat Email (E-Voucher akan dikirim ke sini)
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
                2. Metode Pembayaran Cepat
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'bca', name: 'BCA Virtual Account', icon: '🏦' },
                  { id: 'mandiri', name: 'Mandiri VA', icon: '💳' },
                  { id: 'gopay', name: 'GoPay / QRIS', icon: '📱' },
                  { id: 'cc', name: 'Kartu Kredit', icon: '🔒' },
                ].map(pm => (
                  <label
                    key={pm.id}
                    onClick={() => setPaymentMethod(pm.id)}
                    className={`p-3 rounded-xl border cursor-pointer text-center transition-all flex flex-col items-center justify-center gap-1 ${
                      paymentMethod === pm.id
                        ? 'border-brand-500 bg-brand-50 text-brand-700 font-bold shadow-xs'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="text-xl">{pm.icon}</span>
                    <span className="text-xs">{pm.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 4. Transparent Price Breakdown */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Biaya Kamar ({nights} Malam x {formatRupiah(room?.price || hotel?.price)})</span>
                <span className="font-semibold text-slate-800">{formatRupiah(baseRoomTotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Pajak & Biaya Layanan Resmi (11%)</span>
                <span className="font-semibold text-slate-800">{formatRupiah(taxAndService)}</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Diskon Eksklusif Promo Traveloka</span>
                <span>- {formatRupiah(memberDiscount)}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-sm">
                <span className="font-extrabold text-slate-900">Total Pembayaran</span>
                <span className="text-xl font-black text-cta">{formatRupiah(totalAmount)}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-cta hover:bg-cta-hover text-white font-extrabold text-base rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 active:scale-98"
            >
              <span>Bayar & Konfirmasi Pemesanan ({formatRupiah(totalAmount)})</span>
            </button>

            <div className="text-center text-[11px] text-slate-400 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Transaksi dienkripsi dengan standar keamanan PCI-DSS 256-bit</span>
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
                Pembayaran Sukses
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-2">
                Selamat, Pesanan Anda Berhasil!
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                E-Voucher telah dikirimkan ke email <strong className="text-slate-800">{formData.email}</strong>
              </p>
            </div>

            {/* Voucher Card Mockup */}
            <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 border border-slate-200 rounded-2xl p-5 text-left max-w-lg mx-auto shadow-sm">
              <div className="flex justify-between items-start border-b border-slate-200 pb-3 mb-3">
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">No. Booking Traveloka</div>
                  <div className="text-lg font-mono font-black text-brand-600 tracking-wider">
                    {bookingCode}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Status</div>
                  <div className="text-xs font-extrabold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded">
                    TERKONFIRMASI
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-700">
                <p><strong className="text-slate-900">Hotel:</strong> {hotel?.name}</p>
                <p><strong className="text-slate-900">Tipe Kamar:</strong> {room?.name || 'Deluxe Room'}</p>
                <p><strong className="text-slate-900">Tamu:</strong> {formData.fullName} ({guests.adults} Dewasa)</p>
                <p><strong className="text-slate-900">Jadwal:</strong> {formatDateIndo(checkInDate)} s.d {formatDateIndo(checkOutDate)} ({nights} Malam)</p>
              </div>

              <div className="mt-4 pt-3 border-t border-dashed border-slate-300 flex items-center justify-between text-xs">
                <span className="text-slate-500">Tunjukkan e-voucher ini saat check-in di resepsionis hotel.</span>
                <QrCode className="w-8 h-8 text-slate-800" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                type="button"
                onClick={() => alert(`Mengunduh PDF E-Voucher ${bookingCode}...`)}
                className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-colors"
              >
                <Download className="w-4 h-4" />
                Unduh PDF Voucher
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl transition-colors"
              >
                Kembali ke Beranda
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
