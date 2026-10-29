import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  CheckCircle2, 
  Send, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Percent, 
  Users, 
  Clock, 
  MessageSquare
} from 'lucide-react';
import { hotelsApi } from '../services/api';

export function PartnerModal({ isOpen, onClose, lang = 'id', showToast }) {
  const [formData, setFormData] = useState({
    propertyName: '',
    propertyType: 'Hotel',
    city: 'Bali',
    contactName: '',
    email: '',
    phone: '',
    roomCount: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let country = 'Indonesia';
      if (['Singapore', 'Marina Bay', 'Sentosa'].some(k => formData.city.includes(k))) {
        country = 'Singapore';
      } else if (['Kuala Lumpur', 'Penang', 'Langkawi'].some(k => formData.city.includes(k))) {
        country = 'Malaysia';
      }

      const payload = {
        business_name: formData.propertyName.trim(),
        contact_person: formData.contactName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        country: country,
        city: formData.city.trim(),
        property_count: parseInt(formData.roomCount, 10) || 1,
        notes: `Property Type: ${formData.propertyType}`,
      };

      await hotelsApi.applyPartner(payload);
      setIsSubmitted(true);
      if (showToast) {
        showToast(
          lang === 'ms' 
            ? 'Permohonan rakan kongsi berjaya dihantar ke pangkalan data!' 
            : lang === 'en' 
            ? 'Partner application registered in database successfully!' 
            : 'Pendaftaran mitra properti berhasil masuk ke database!'
        );
      }
    } catch (err) {
      alert(err.message || 'Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      propertyName: '',
      propertyType: 'Hotel',
      city: 'Bali',
      contactName: '',
      email: '',
      phone: '',
      roomCount: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-blue-600 to-sky-600 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight">
                {lang === 'ms' 
                  ? 'Daftar Properti Anda di NusaStay' 
                  : lang === 'en' 
                  ? 'List Your Property on NusaStay' 
                  : 'Daftarkan Properti Anda di NusaStay'}
              </h3>
              <p className="text-xs text-blue-100 font-medium">
                {lang === 'ms' 
                  ? 'Jangkau jutaan tetamu pelancong di seluruh Nusantara' 
                  : lang === 'en' 
                  ? 'Reach millions of travelers across Southeast Asia' 
                  : 'Jangkau jutaan tamu traveler di seluruh Nusantara'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shrink-0"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-5">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-3xl border border-emerald-200 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-2 max-w-md mx-auto">
                <h4 className="text-xl font-black text-slate-900">
                  {lang === 'ms' ? 'Permohonan Diterima!' : lang === 'en' ? 'Application Received!' : 'Pendaftaran Diterima!'}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {lang === 'ms'
                    ? `Terima kasih atas minat anda. Pasukan Perkongsian NusaStay akan menghubungi ${formData.contactName || 'anda'} dalam tempoh 1x24 jam bekerja.`
                    : lang === 'en'
                    ? `Thank you for your interest. The NusaStay Partnerships team will contact ${formData.contactName || 'you'} within 1x24 business hours.`
                    : `Terima kasih atas minat Anda. Tim Partnership NusaStay akan menghubungi ${formData.contactName || 'Anda'} via WhatsApp atau email dalam 1x24 jam kerja.`}
                </p>
              </div>

              {/* Summary Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between text-slate-600">
                  <span>Nama Properti:</span>
                  <span className="font-bold text-slate-900">{formData.propertyName || 'The Luxury Villa'}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Tipe / Lokasi:</span>
                  <span className="font-bold text-slate-900">{formData.propertyType} • {formData.city}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Kontak PIC:</span>
                  <span className="font-bold text-slate-900">{formData.phone || formData.email || '-'}</span>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-colors shadow-sm"
                >
                  {lang === 'ms' ? 'Selesai & Tutup' : lang === 'en' ? 'Done & Close' : 'Selesai & Tutup'}
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Partner Benefits Pills */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-center">
                  <Percent className="w-5 h-5 text-brand-600 mx-auto mb-1" />
                  <div className="text-xs font-bold text-slate-900">
                    {lang === 'en' ? 'Flexible Commission' : lang === 'ms' ? 'Komisen Fleksibel' : 'Komisi Fleksibel'}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {lang === 'en' ? 'From 8% flat' : 'Mulai dari 8%'}
                  </div>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-center">
                  <Users className="w-5 h-5 text-brand-600 mx-auto mb-1" />
                  <div className="text-xs font-bold text-slate-900">
                    {lang === 'en' ? 'Millions of Guests' : lang === 'ms' ? 'Jutaan Pelancong' : 'Jutaan Tamu'}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {lang === 'en' ? 'Regional travelers' : 'Trafik domestik & regional'}
                  </div>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-center">
                  <Clock className="w-5 h-5 text-brand-600 mx-auto mb-1" />
                  <div className="text-xs font-bold text-slate-900">
                    {lang === 'en' ? 'Daily Payouts' : lang === 'ms' ? 'Penyelesaian Harian' : 'Pencairan Harian'}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {lang === 'en' ? 'Direct bank transfer' : 'Langsung ke rekening'}
                  </div>
                </div>
              </div>

              {/* Registration Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {lang === 'en' ? 'Property Name' : lang === 'ms' ? 'Nama Penginapan' : 'Nama Properti / Hotel'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={lang === 'en' ? 'e.g. The Heritage Manor' : lang === 'ms' ? 'Contoh: Villa Melati Langkawi' : 'Contoh: Villa Kayu Manis'}
                      value={formData.propertyName}
                      onChange={(e) => setFormData({ ...formData, propertyName: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {lang === 'en' ? 'Property Type' : lang === 'ms' ? 'Jenis Penginapan' : 'Tipe Properti'} <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 font-medium cursor-pointer"
                    >
                      <option value="Hotel">Hotel</option>
                      <option value="Resort">Resort</option>
                      <option value="Villa">Villa</option>
                      <option value="Apartemen">{lang === 'en' ? 'Apartment / Suite' : 'Apartemen / Condotel'}</option>
                      <option value="Boutique Hotel">Boutique Hotel</option>
                      <option value="Glamping">Glamping & Cabin</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {lang === 'en' ? 'City / Location' : lang === 'ms' ? 'Bandar / Kawasan' : 'Kota / Wilayah'} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-brand-600 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        placeholder={lang === 'en' ? 'e.g. Marina Bay, Singapore' : lang === 'ms' ? 'Contoh: KLCC, Kuala Lumpur' : 'Contoh: Badung, Bali'}
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {lang === 'en' ? 'Estimated Total Rooms' : lang === 'ms' ? 'Anggaran Jumlah Bilik' : 'Estimasi Jumlah Kamar'}
                    </label>
                    <input
                      type="number"
                      placeholder="12"
                      value={formData.roomCount}
                      onChange={(e) => setFormData({ ...formData, roomCount: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 font-medium"
                    />
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-3">
                  <div className="text-xs font-bold text-slate-900 mb-3 uppercase tracking-wider">
                    {lang === 'en' ? 'Manager / Contact Information (PIC)' : lang === 'ms' ? 'Maklumat Hubungan Pengurus (PIC)' : 'Informasi Kontak Pengelola (PIC)'}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        {lang === 'en' ? 'Full Name' : lang === 'ms' ? 'Nama Penuh' : 'Nama Lengkap'} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={lang === 'en' ? 'John Tan' : lang === 'ms' ? 'Ahmad Firdaus' : 'Budi Pratama'}
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        WhatsApp / Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder={lang === 'en' ? '+65 9123 4567' : lang === 'ms' ? '+60 12-345 6789' : '0812-xxxx-xxxx'}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        {lang === 'en' ? 'Business Email' : lang === 'ms' ? 'E-mel Perniagaan' : 'Email Bisnis'} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="hotel@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 font-medium"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-[#FF5E1F] hover:bg-[#E04D14] text-white font-black text-sm rounded-xl transition-all shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>
                          {lang === 'ms' 
                            ? 'Hantar Pendaftaran' 
                            : lang === 'en' 
                            ? 'Submit Registration' 
                            : 'Kirim Pendaftaran'}
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Direct Concierge Callout */}
              <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-600">
                  <MessageSquare className="w-4 h-4 text-brand-600 shrink-0" />
                  <span>
                    {lang === 'en'
                      ? 'Need help onboarding? Contact Concierge via WhatsApp.'
                      : lang === 'ms'
                      ? 'Perlukan bantuan? Hubungi Concierge via WhatsApp.'
                      : 'Butuh bantuan pendaftaran? Hubungi Concierge via WhatsApp.'}
                  </span>
                </div>
                <a
                  href={lang === 'en' ? 'https://wa.me/6567889000' : lang === 'ms' ? 'https://wa.me/60380889000' : 'https://wa.me/6281234567890'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-lg shrink-0 transition-colors inline-flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Chat WA</span>
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
