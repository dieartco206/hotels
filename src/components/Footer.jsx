import React from 'react';
import { ShieldCheck, PhoneCall, Mail, Compass } from 'lucide-react';

export function Footer({ t, currency = 'MYR', lang = 'ms' }) {
  const getOfficialPaymentMethods = () => {
    return ['Maybank2u', 'CIMB Clicks', "Touch 'n Go eWallet", 'DuitNow QR', 'FPX Online Banking', 'GrabPay MY', 'Visa', 'Mastercard'];
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
                Hotels<span className="text-brand-600">.my</span>
              </span>
            </div>

            <p className="text-slate-500 leading-relaxed text-xs max-w-sm">
              {lang === 'en'
                ? 'Curated platform for premier luxury hotels, rainforest resorts, and heritage suites across Malaysia (Kuala Lumpur, Langkawi, Penang, Melaka, Sabah, and Cameron Highlands). Delivering authentic stays with transparent MYR rates and official reservation guarantees.'
                : 'Platform kurasi hotel, resort hutan hujan tropika, dan suite warisan mewah terkemuka di seluruh Malaysia (Kuala Lumpur, Langkawi, Pulau Pinang, Melaka, Sabah, dan Cameron Highlands). Menawarkan percutian eksklusif dengan ketelusan kadar Ringgit Malaysia (MYR) dan jaminan tempahan sah.'}
            </p>

            <div className="pt-2 space-y-2 text-slate-700 font-semibold">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-brand-600" />
                <span>
                  {lang === 'en' ? '24/7 Guest Concierge' : 'Khidmat Tetamu 24 Jam'}: +60 3-2142 8000
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-600" />
                <span>support@hotels.com.my</span>
              </div>
            </div>
          </div>

          {/* Column 2: Tentang Kami */}
          <div className="space-y-2.5">
            <h4 className="font-extrabold text-slate-900 text-sm mb-3">
              {lang === 'en' ? 'About Platform' : 'Mengenai Platform'}
            </h4>
            <ul className="space-y-2 font-medium">
              <li><a href="#" className="hover:text-brand-600 transition-colors">{lang === 'en' ? 'Curated Standards' : 'Piawaian Kurasi Hotel'}</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">{lang === 'en' ? 'Help Center & FAQ' : 'Pusat Bantuan & Soalan Lazim'}</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">{lang === 'en' ? 'Contact Concierge' : 'Hubungi Concierge'}</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">{lang === 'en' ? 'Careers & Hiring' : 'Kerjaya & Pekerjaan'}</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">{lang === 'en' ? 'Terms of Service' : 'Terma & Syarat'}</a></li>
            </ul>
          </div>

          {/* Column 3: Koleksi Penginapan Malaysia */}
          <div className="space-y-2.5">
            <h4 className="font-extrabold text-slate-900 text-sm mb-3">
              {lang === 'en' ? 'Top Malaysia Stays' : 'Koleksi Pilihan Malaysia'}
            </h4>
            <ul className="space-y-2 font-medium">
              <li><a href="#" className="hover:text-brand-600 transition-colors">Suite Mewah KLCC & Bukit Bintang</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Resort Hutan Hujan Langkawi</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Hotel Warisan Kolonial Penang</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Boutique Stay Sungai Melaka</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Retreat Tanah Tinggi Cameron & Genting</a></li>
            </ul>
          </div>

          {/* Column 4: Kemitraan */}
          <div className="space-y-2.5">
            <h4 className="font-extrabold text-slate-900 text-sm mb-3">
              {lang === 'en' ? 'Property Partners' : 'Rakan Hotel Malaysia'}
            </h4>
            <ul className="space-y-2 font-medium">
              <li><a href="#" className="hover:text-brand-600 transition-colors">{lang === 'en' ? 'List Your Hotel' : 'Daftarkan Hotel Anda'}</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">{lang === 'en' ? 'Partner Extranet Portal' : 'Portal Pengurusan Rakan'}</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">{lang === 'en' ? 'Privacy Policy' : 'Dasar Privasi'}</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">{lang === 'en' ? 'Tourism Tax (TTx) & SST' : 'Panduan Cukai SST & Pelancongan'}</a></li>
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
          <p>© 2026 Hotels Malaysia Sdn. Bhd. (Hotels.com.my). Semua hak terpelihara. Dilesenkan di bawah Akta Industri Pelancongan MOTAC Malaysia.</p>
        </div>

      </div>
    </footer>
  );
}
