import React from 'react';
import { ShieldCheck, PhoneCall, Mail, MapPin, Building2, Award } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20 pt-14 pb-10 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-200">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0194F3] to-[#0064D2] flex items-center justify-center text-white font-bold">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M22 2L11 13" />
                  <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </div>
              <span className="text-xl font-extrabold text-[#0194F3] tracking-tight">traveloka</span>
            </div>

            <p className="text-slate-500 leading-relaxed text-xs max-w-sm">
              Platform perjalanan terdepan di Asia Tenggara. Menyediakan pemesanan hotel, resor mewah, tiket pesawat, dan aktivitas liburan dengan jaminan harga terbaik serta transaksi 100% aman.
            </p>

            <div className="pt-2 space-y-2 text-slate-700 font-medium">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-brand-600" />
                <span>Customer Care 24 Jam: 0804-1500-308</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-600" />
                <span>cs@traveloka.com</span>
              </div>
            </div>
          </div>

          {/* Column 2: Tentang Traveloka */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-900 text-sm mb-3">Tentang Traveloka</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-brand-600 transition-colors">Cara Pesan Hotel</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Bantuan & FAQ</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Hubungi Kami</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Karier di Traveloka</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Pusat Bantuan</a></li>
            </ul>
          </div>

          {/* Column 3: Produk Akomodasi */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-900 text-sm mb-3">Produk & Promo</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-brand-600 transition-colors">Hotel Bintang 5</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Villa di Bali</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Apartemen Jakarta</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Staycation Bandung</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Traveloka Points & Rewards</a></li>
            </ul>
          </div>

          {/* Column 4: Mitra & Keamanan */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-900 text-sm mb-3">Mitra Hotel</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-brand-600 transition-colors">Daftarkan Hotel Anda</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Traveloka Affiliate</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Kebijakan Privasi</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Syarat & Ketentuan</a></li>
            </ul>
          </div>

        </div>

        {/* Payment Partners & Security Badges */}
        <div className="py-8 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200">
          <div>
            <span className="font-bold text-slate-700 block mb-2">Partner Pembayaran Resmi:</span>
            <div className="flex flex-wrap items-center gap-2">
              {['BCA', 'Mandiri', 'BRI', 'BNI', 'GoPay', 'OVO', 'Visa', 'Mastercard'].map(p => (
                <span key={p} className="px-2.5 py-1 bg-slate-100 rounded-lg text-slate-600 font-bold text-[11px] border border-slate-200">
                  {p}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 text-emerald-700 bg-emerald-50/80 px-4 py-2.5 rounded-2xl border border-emerald-200">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <div>
              <span className="font-bold block text-xs">Jaminan Transaksi 100% Aman</span>
              <span className="text-[11px] text-slate-500">Terdaftar & Diawasi oleh Otoritas Resmi</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 text-center text-slate-400 text-xs">
          <p>© 2026 PT Global Tiket Network (Traveloka Clone Demo). Seluruh hak cipta dilindungi undang-undang.</p>
        </div>

      </div>
    </footer>
  );
}
