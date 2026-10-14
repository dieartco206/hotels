import React from 'react';
import { ShieldCheck, PhoneCall, Mail, Compass } from 'lucide-react';

export function Footer({ t, currency = 'IDR', lang = 'id' }) {
  const getOfficialPaymentMethods = () => {
    if (currency === 'MYR') {
      return ['Maybank2u', 'CIMB Clicks', "Touch 'n Go eWallet", 'GrabPay MY', 'Visa', 'Mastercard'];
    }
    if (currency === 'SGD') {
      return ['PayNow / SGQR', 'DBS PayLah!', 'OCBC Pay', 'UOB TMRW', 'Visa', 'Mastercard'];
    }
    return ['BCA Virtual Account', 'Mandiri VA', 'Bank BRI', 'Bank BNI', 'GoPay / QRIS', 'Visa', 'Mastercard'];
  };

  return (
    <footer className="bg-white border-t border-slate-200 mt-20 pt-14 pb-10 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-200">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center text-white font-bold">
                <Compass className="w-5 h-5 text-white stroke-[2.2]" />
              </div>
              <span className="text-xl font-black text-slate-900 tracking-tight">
                Nusa<span className="text-brand-600">Stay</span>
              </span>
            </div>

            <p className="text-slate-500 leading-relaxed text-xs max-w-sm">
              {lang === 'en'
                ? 'Curated platform for authentic hotels, private luxury resorts, and villas in Indonesia. Delivering premium stays with transparent rates and trusted reservation guarantees.'
                : lang === 'ms'
                ? 'Platform kurasi hotel, resort persendirian dan villa autentik di Indonesia. Menawarkan pengalaman percutian bertaraf tinggi dengan ketelusan kadar harga dan jaminan tempahan sah.'
                : 'Platform kurasi hotel, resor privat, dan villa autentik di Indonesia. Menghadirkan pengalaman menginap berkelas dengan jaminan kenyamanan, transparansi tarif, dan kemudahan reservasi terpercaya.'}
            </p>

            <div className="pt-2 space-y-2 text-slate-700 font-semibold">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-brand-600" />
                <span>{lang === 'en' ? '24/7 Guest Services' : lang === 'ms' ? 'Khidmat Tetamu 24 Jam' : 'Layanan Tamu 24 Jam'}: 021-5088-9000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-600" />
                <span>concierge@nusastay.id</span>
              </div>
            </div>
          </div>

          {/* Column 2: Tentang NusaStay */}
          <div className="space-y-2.5">
            <h4 className="font-extrabold text-slate-900 text-sm mb-3">
              {lang === 'en' ? 'About NusaStay' : lang === 'ms' ? 'Mengenai NusaStay' : 'Tentang NusaStay'}
            </h4>
            <ul className="space-y-2 font-medium">
              <li><a href="#" className="hover:text-brand-600 transition-colors">{lang === 'en' ? 'Curated Standards' : lang === 'ms' ? 'Piawaian Kurasi Hotel' : 'Standar Kurasi Hotel'}</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">{lang === 'en' ? 'Help Center & FAQ' : lang === 'ms' ? 'Pusat Bantuan & Soalan Lazim' : 'Pusat Bantuan & FAQ'}</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">{lang === 'en' ? 'Contact Concierge' : lang === 'ms' ? 'Hubungi Concierge' : 'Hubungi Concierge'}</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">{lang === 'en' ? 'Careers & Hiring' : lang === 'ms' ? 'Kerjaya & Pekerjaan' : 'Karier & Rekrutmen'}</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">{lang === 'en' ? 'Terms of Service' : lang === 'ms' ? 'Terma & Syarat' : 'Ketentuan Layanan'}</a></li>
            </ul>
          </div>

          {/* Column 3: Koleksi Penginapan */}
          <div className="space-y-2.5">
            <h4 className="font-extrabold text-slate-900 text-sm mb-3">
              {lang === 'en' ? 'Top Collections' : lang === 'ms' ? 'Koleksi Pilihan' : 'Koleksi Pilihan'}
            </h4>
            <ul className="space-y-2 font-medium">
              <li><a href="#" className="hover:text-brand-600 transition-colors">{lang === 'en' ? '5-Star Bali Luxury Resorts' : lang === 'ms' ? 'Resort Bintang 5 Bali' : 'Resor Bintang 5 Bali'}</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">{lang === 'en' ? 'Private Pool Villas' : lang === 'ms' ? 'Villa Kolam Renang Peribadi' : 'Private Pool Villa'}</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">{lang === 'en' ? 'Executive Suites Jakarta' : lang === 'ms' ? 'Suite Eksekutif Jakarta' : 'Executive Hotel Jakarta'}</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">{lang === 'en' ? 'Bandung Hillside Retreats' : lang === 'ms' ? 'Tempat Percutian Bandung' : 'Sanctuary Lereng Bandung'}</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">{lang === 'en' ? 'Yogyakarta Heritage Stays' : lang === 'ms' ? 'Penginapan Warisan Jogja' : 'Heritage Stay Yogyakarta'}</a></li>
            </ul>
          </div>

          {/* Column 4: Kemitraan */}
          <div className="space-y-2.5">
            <h4 className="font-extrabold text-slate-900 text-sm mb-3">
              {lang === 'en' ? 'Property Partners' : lang === 'ms' ? 'Rakan Penginapan' : 'Mitra Properti'}
            </h4>
            <ul className="space-y-2 font-medium">
              <li><a href="#" className="hover:text-brand-600 transition-colors">{lang === 'en' ? 'List Your Property' : lang === 'ms' ? 'Daftarkan Penginapan Anda' : 'Daftarkan Properti Anda'}</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">{lang === 'en' ? 'Partner Extranet Portal' : lang === 'ms' ? 'Portal Pengurusan Rakan' : 'Portal Manajemen Mitra'}</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">{lang === 'en' ? 'Privacy Policy' : lang === 'ms' ? 'Dasar Privasi' : 'Kebijakan Privasi'}</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">{lang === 'en' ? 'Security & Compliance' : lang === 'ms' ? 'Keselamatan Transaksi' : 'Keamanan Transaksi'}</a></li>
            </ul>
          </div>

        </div>

        {/* Payment Partners & Security Badges */}
        <div className="py-8 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200">
          <div>
            <span className="font-bold text-slate-700 block mb-2">
              {lang === 'en' ? 'Official Payment Channels:' : lang === 'ms' ? 'Saluran Pembayaran Rasmi:' : 'Metode Pembayaran Resmi:'}
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {getOfficialPaymentMethods().map(p => (
                <span key={p} className="px-3 py-1 bg-slate-100 rounded-lg text-slate-700 font-bold text-[11px] border border-slate-200">
                  {p}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3.5 text-emerald-800 bg-emerald-50/90 px-4 py-2.5 rounded-2xl border border-emerald-200">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <span className="font-extrabold block text-xs">
                {lang === 'en' ? 'Secure Reservation & Payment Guarantee' : lang === 'ms' ? 'Jaminan Tempahan & Pembayaran Selamat' : 'Jaminan Reservasi & Transaksi Aman'}
              </span>
              <span className="text-[11px] text-slate-500">
                {lang === 'en' ? 'PCI-DSS certified 256-bit SSL encryption' : lang === 'ms' ? 'Penyulitan SSL 256-bit standard PCI-DSS rasmi' : 'Enkripsi 256-bit standar PCI-DSS resmi'}
              </span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 text-center text-slate-400 text-xs">
          <p>© 2026 PT Nusa Hospitality Indonesia (NusaStay). {lang === 'en' ? 'All rights reserved.' : lang === 'ms' ? 'Semua hak terpelihara.' : 'Seluruh hak cipta dilindungi undang-undang.'}</p>
        </div>

      </div>
    </footer>
  );
}
