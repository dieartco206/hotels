import React from 'react';
import { ShieldCheck, PhoneCall, Mail, Compass } from 'lucide-react';

export function Footer() {
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
              Platform kurasi hotel, resor privat, dan villa autentik di Indonesia. Menghadirkan pengalaman menginap berkelas dengan jaminan kenyamanan, transparansi tarif, dan kemudahan reservasi terpercaya.
            </p>

            <div className="pt-2 space-y-2 text-slate-700 font-semibold">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-brand-600" />
                <span>Layanan Tamu 24 Jam: 021-5088-9000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-600" />
                <span>concierge@nusastay.id</span>
              </div>
            </div>
          </div>

          {/* Column 2: Tentang NusaStay */}
          <div className="space-y-2.5">
            <h4 className="font-extrabold text-slate-900 text-sm mb-3">Tentang NusaStay</h4>
            <ul className="space-y-2 font-medium">
              <li><a href="#" className="hover:text-brand-600 transition-colors">Standar Kurasi Hotel</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Pusat Bantuan & FAQ</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Hubungi Concierge</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Karier & Rekrutmen</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Ketentuan Layanan</a></li>
            </ul>
          </div>

          {/* Column 3: Koleksi Penginapan */}
          <div className="space-y-2.5">
            <h4 className="font-extrabold text-slate-900 text-sm mb-3">Koleksi Pilihan</h4>
            <ul className="space-y-2 font-medium">
              <li><a href="#" className="hover:text-brand-600 transition-colors">Resor Bintang 5 Bali</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Private Pool Villa</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Executive Hotel Jakarta</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Sanctuary Lereng Bandung</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Heritage Stay Yogyakarta</a></li>
            </ul>
          </div>

          {/* Column 4: Kemitraan */}
          <div className="space-y-2.5">
            <h4 className="font-extrabold text-slate-900 text-sm mb-3">Mitra Properti</h4>
            <ul className="space-y-2 font-medium">
              <li><a href="#" className="hover:text-brand-600 transition-colors">Daftarkan Properti Anda</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Portal Manajemen Mitra</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Kebijakan Privasi</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Keamanan Transaksi</a></li>
            </ul>
          </div>

        </div>

        {/* Payment Partners & Security Badges */}
        <div className="py-8 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200">
          <div>
            <span className="font-bold text-slate-700 block mb-2">Metode Pembayaran Resmi:</span>
            <div className="flex flex-wrap items-center gap-2">
              {['BCA Virtual Account', 'Mandiri VA', 'Bank BRI', 'Bank BNI', 'GoPay / QRIS', 'Visa', 'Mastercard'].map(p => (
                <span key={p} className="px-3 py-1 bg-slate-100 rounded-lg text-slate-700 font-bold text-[11px] border border-slate-200">
                  {p}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3.5 text-emerald-800 bg-emerald-50/90 px-4 py-2.5 rounded-2xl border border-emerald-200">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <span className="font-extrabold block text-xs">Jaminan Reservasi & Transaksi Aman</span>
              <span className="text-[11px] text-slate-500">Enkripsi 256-bit standar PCI-DSS resmi</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 text-center text-slate-400 text-xs">
          <p>© 2026 PT Nusa Hospitality Indonesia (NusaStay). Seluruh hak cipta dilindungi undang-undang.</p>
        </div>

      </div>
    </footer>
  );
}
