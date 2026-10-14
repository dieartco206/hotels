# 🏨 NusaStay — Hotel & Resort Booking Web Application

A complete, high-conversion, production-ready **Bespoke Hotel Booking Web Application** tailored for Indonesian luxury, boutique hotels, and private resorts. Built with **React.js, Tailwind CSS, and Lucide React icons**, adhering strictly to human-centric design, **zero AI-slop** rules (no AI sparkles, no neon gradients), and real-world OTA density.

---

## ✨ Features & Architecture

### 1. 🛡️ Bespoke Design System & Anti-AI-Slop
- **Zero AI Clichés**: No neon purple/cyan glowing blobs, no floating 3D shapes, and strictly **no AI sparkle icons**.
- **Crisp Light Mode**: High-contrast, clean alabaster background (`#F8FAFC` & `#F1F5F9`), pure white surfaces (`#FFFFFF`), and refined 1px borders (`#E2E8F0`).
- **Brand Colors**:
  - **Oceanic Sapphire Blue** (`#0052CC` – `#003E99`): Primary navigation, brand mark, and trust elements.
  - **Vibrant Coral Orange** (`#FF5E1F`, hover `#E04D14`): Primary high-conversion CTAs ("Cari Akomodasi", "Pilih Kamar", "Pesan Sekarang").
  - **Emerald Green** (`#059669`): Trust signals ("✓ Sarapan Termasuk", "✓ Pembatalan Gratis").
  - **Amber Gold** (`#F59E0B`): Star ratings and guest satisfaction scores.
  - **Rose Red** (`#F43F5E`): Flash sale discount tags ("Hemat 28%").
- **Real-World Indonesian Data**: Currency in Indonesian Rupiah (`Rp 1.450.000`), authentic hotel destinations (Bali, Jakarta, Bandung, Yogyakarta, Surabaya), and verified guest review ratings.

### 2. 🔍 Floating Overlapping Multi-Field Search Engine
- **Centerpiece Widget**: Overlapping card with tabs for Hotel Bintang & Butik, Private Villa & Resor, Transit Singkat, and Penawaran Eksklusif.
- **Interactive Destination Selector**: Fast dropdown with quick destination pills ("Bali", "Jakarta", "Bandung", "Yogyakarta", "Surabaya") and text search.
- **Check-in & Check-out Date Range**: Auto-calculates stay duration with live "X Malam" badge.
- **Tamu & Kamar Popover**: Interactive counter for Adults, Children, and Rooms.
- **Quick Bottom Checkboxes**: "Bayar di Tempat", "Sarapan Termasuk", "Bintang 4 & 5", "Pembatalan Gratis".

### 3. 🔥 Penawaran Kilat (Flash Deal Strip)
- Live ticking countdown timer (`HH:MM:SS`) updated every second.
- Category filter pills ("Semua Penawaran", "Bali Retreat", "Jakarta Metropolitan", "Bandung Sejuk", "Resor Bintang 5").
- High-discount hotel cards with remaining room quota bars.

### 4. 🎛️ Two-Column Search & Discovery Feed
- **Left Sticky Sidebar (280px)**:
  - Interactive Map preview entry card ("Lihat di Peta").
  - Price Range Slider (`Rp 1.000.000` to `Rp 10.000.000+`).
  - Star Rating Checkboxes (5★, 4★, 3★).
  - Facility Filters (Sarapan Termasuk, Pembatalan Gratis, Kolam Renang, WiFi Cepat, Bayar di Tempat).
  - Property Type (Hotel, Resort, Villa, Boutique Hotel).
  - One-click "Reset Semua Filter".
- **Right Main Feed**:
  - Property count indicator & active filter tags with dismiss buttons.
  - Multi-criteria Sorting: Popularitas, Harga Terendah, Harga Tertinggi, Rating Ulasan, Diskon Terbesar.
  - Grid / List View Toggle.
  - Bespoke horizontal hotel cards featuring a 32% photo gallery strip, 43% details & amenities, and 25% pricing & review rating score badge (`9.4 / 10 Mengesankan`).

### 5. 🛏️ Interactive Hotel Detail & Room Selection Modal
- Bento-style high-res photo gallery with thumbnail switcher.
- Tabbed navigation: Pilihan Kamar, Ringkasan Hotel, Fasilitas Lengkap, Ulasan Tamu Terverifikasi.
- Detailed Room cards with bed specifications, room area (`65 m²`), cancellation policy, and breakfast options.

### 6. 💳 Complete Checkout Flow & Official E-Voucher
- Multi-step modal for guest details (Nama Lengkap, WhatsApp, Email).
- Transparent price breakdown (Room x Nights + 11% Tax & Service - Member Discount).
- Payment method options (BCA VA, Mandiri VA, GoPay/QRIS, Credit Card).
- Official NusaStay confirmation screen with booking reference code (`NUSA-XXXXXX`), QR code mockup, and PDF download action.

### 7. 🗺️ Interactive Map Modal & ❤️ Wishlist Drawer
- Visual interactive map modal with clickable price pill pins that highlight accommodations.
- Slide-over Wishlist drawer allowing users to save, review, and book their favorite hotels.
- Real-time toast notifications for micro-interaction feedback.

---

## 🚀 Getting Started

### Installation & Run
```bash
# Clone the repository
git clone https://github.com/dieartco206/hotels.git
cd hotels

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Build for Production
```bash
npm run build
```
Generates optimized static assets in the `dist/` directory.

---

## 📂 Project Structure
```
hotels/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── data/
│   │   └── hotelsData.js          # Realistic Indonesian hotel dataset
│   ├── utils/
│   │   └── formatters.js          # Indonesian Rupiah & date formatters
│   └── components/
│       ├── Navbar.jsx             # Sticky top header & auth modals (NusaStay)
│       ├── HeroSection.jsx        # Curated photography hero banner
│       ├── SearchWidget.jsx       # Floating multi-field search engine
│       ├── FlashSaleBanner.jsx    # Epic sale strip with live countdown
│       ├── FilterSidebar.jsx      # Sticky price/star/facilities filter
│       ├── HotelCard.jsx          # Bespoke horizontal listing card
│       ├── HotelGridCard.jsx      # Grid view listing card
│       ├── HotelDetailModal.jsx   # Room selection & hotel detail modal
│       ├── BookingCheckoutModal.jsx # Checkout & e-voucher modal
│       ├── InteractiveMapModal.jsx # Interactive map modal with pins
│       ├── WishlistDrawer.jsx     # Slide-over wishlist manager
│       ├── Toast.jsx              # Micro-interaction notifications
│       └── Footer.jsx             # Comprehensive OTA footer
```
