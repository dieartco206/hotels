# 🏨 Traveloka Hotel Booking Web Application (React & Tailwind CSS)

A complete, high-conversion, production-ready **Hotel Booking Web Application** inspired by **Traveloka** and **Agoda**. Built with modern React.js, Tailwind CSS, and Lucide React icons, adhering strictly to real-world OTA density, human-centric design, and **zero AI-slop** rules.

---

## ✨ Features & Architecture

### 1. 🛡️ Strict Anti-AI-Slop & Traveloka OTA Design System
- **Crisp Light Mode**: High-contrast, clean alabaster background (`#F8FAFC` & `#F1F5F9`), pure white surfaces (`#FFFFFF`), and refined 1px borders (`#E2E8F0`).
- **Brand Colors**:
  - **Traveloka Blue** (`#0194F3` to `#0064D2`): Navigation, trust elements, and verified badges.
  - **Vibrant Coral Orange** (`#FF5E1F`, hover `#E04D14`): Primary high-conversion CTAs ("Cari Hotel", "Pilih Kamar", "Pesan Sekarang").
  - **Emerald Green** (`#10B981`): Trust badges ("✓ Sarapan Gratis", "✓ Bisa Refund").
  - **Amber Gold** (`#F59E0B`): Star ratings and guest satisfaction scores.
  - **Rose Red** (`#F43F5E`): Flash sale discount tags ("Hemat 28%").
- **Real-World Indonesian Data**: Currency in Indonesian Rupiah (`Rp 1.450.000`), authentic hotel destinations (Bali, Jakarta, Bandung, Yogyakarta, Surabaya), and verified guest review ratings.

### 2. 🔍 Floating Overlapping Multi-Field Search Engine
- **Centerpiece Widget**: Overlapping card with tabs for Hotel, Villa & Apt, Hotel Jam-jaman, and Penawaran Spesial.
- **Interactive Destination Selector**: Fast dropdown with quick destination pills ("Bali", "Jakarta", "Bandung", "Yogyakarta", "Surabaya") and text search.
- **Check-in & Check-out Date Range**: Auto-calculates stay duration with live "X Malam" badge.
- **Tamu & Kamar Popover**: Interactive counter for Adults, Children, and Rooms.
- **Quick Bottom Checkboxes**: "Bayar di Hotel", "Sarapan Gratis", "Bintang 4+", "Bisa Refund".

### 3. 🔥 Epic Sale / Flash Deal Strip
- Live ticking countdown timer (`HH:MM:SS`) updated every second.
- Category filter pills ("Semua Flash Deal", "Bali Staycation", "Jakarta Central", "Bandung Dingin", "Bintang 5").
- High-discount hotel cards with remaining room quota bars ("Sisa 2 kamar!").

### 4. 🎛️ Two-Column Search & Discovery Feed
- **Left Sticky Sidebar (280px)**:
  - Interactive Map preview entry card ("Lihat di Peta").
  - Price Range Slider (`Rp 1.000.000` to `Rp 10.000.000+`).
  - Star Rating Checkboxes (5★, 4★, 3★).
  - Facility Filters (Sarapan Gratis, Pembatalan Gratis, Kolam Renang, WiFi, Bayar di Hotel).
  - Property Type (Hotel, Resort, Villa, Boutique Hotel).
  - One-click "Reset Semua Filter".
- **Right Main Feed**:
  - Property count indicator & active filter tags with dismiss buttons.
  - Multi-criteria Sorting: Popularitas, Harga Terendah, Harga Tertinggi, Rating Ulasan, Diskon Terbesar.
  - Grid / List View Toggle.
  - Traveloka-style horizontal hotel cards featuring a 32% photo gallery strip, 43% details & amenities, and 25% pricing & review rating score badge (`9.4 / 10 Mengesankan`).

### 5. 🛏️ Interactive Hotel Detail & Room Selection Modal
- Bento-style high-res photo gallery with thumbnail switcher.
- Tabbed navigation: Pilihan Kamar, Ringkasan Hotel, Fasilitas Lengkap, Ulasan Tamu Terverifikasi.
- Detailed Room cards with bed specifications, room area (`65 m²`), cancellation policy, and breakfast options.

### 6. 💳 Complete Checkout Flow & Official E-Voucher
- Multi-step modal for guest details (Nama Lengkap, WhatsApp, Email).
- Transparent price breakdown (Room x Nights + 11% Tax & Service - Member Discount).
- Payment method options (BCA VA, Mandiri VA, GoPay/QRIS, Credit Card).
- Official Traveloka confirmation screen with booking reference code (`TVLK-XXXXXX`), QR code mockup, and PDF download action.

### 7. 🗺️ Interactive Map Modal & ❤️ Wishlist Drawer
- Visual interactive map modal with clickable price pill pins that highlight accommodations.
- Slide-over Wishlist drawer allowing users to save, review, and book their favorite hotels.
- Real-time toast notifications for micro-interaction feedback.

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

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
│       ├── Navbar.jsx             # Sticky top header & auth modals
│       ├── HeroSection.jsx        # Curated photography hero banner
│       ├── SearchWidget.jsx       # Floating multi-field search engine
│       ├── FlashSaleBanner.jsx    # Epic sale strip with live countdown
│       ├── FilterSidebar.jsx      # Sticky price/star/facilities filter
│       ├── HotelCard.jsx          # Traveloka-style horizontal listing card
│       ├── HotelGridCard.jsx      # Grid view listing card
│       ├── HotelDetailModal.jsx   # Room selection & hotel detail modal
│       ├── BookingCheckoutModal.jsx # Checkout & e-voucher modal
│       ├── InteractiveMapModal.jsx # Interactive map modal with pins
│       ├── WishlistDrawer.jsx     # Slide-over wishlist manager
│       ├── Toast.jsx              # Micro-interaction notifications
│       └── Footer.jsx             # Comprehensive OTA footer
```

---

## 📄 License
MIT License. Created with passion for exemplary OTA frontend engineering.
