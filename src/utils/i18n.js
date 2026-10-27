// Internationalization (i18n) & Multi-Currency System for Indonesia, Malaysia, and Singapore

export const SUPPORTED_LANGUAGES = [
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩', region: 'Indonesia' },
  { code: 'ms', name: 'Bahasa Melayu', flag: '🇲🇾', region: 'Malaysia' },
  { code: 'en', name: 'English (SG)', flag: '🇸🇬', region: 'Singapore' },
];

export const SUPPORTED_CURRENCIES = [
  { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah', flag: '🇮🇩', rate: 1 },
  { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', flag: '🇲🇾', rate: 1 / 3550 },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', flag: '🇸🇬', rate: 1 / 11850 },
];

export const formatCurrency = (amountInIdr, currencyCode = 'IDR') => {
  if (amountInIdr === undefined || amountInIdr === null) return 'Rp 0';
  
  if (currencyCode === 'MYR') {
    const myrAmount = Math.round(amountInIdr / 3550);
    return 'RM ' + myrAmount.toLocaleString('en-US');
  }
  
  if (currencyCode === 'SGD') {
    const sgdAmount = Math.round(amountInIdr / 11850);
    return 'S$ ' + sgdAmount.toLocaleString('en-US');
  }

  // Default IDR
  return 'Rp ' + amountInIdr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const getRatingText = (rating, lang = 'id') => {
  if (lang === 'en') {
    if (rating >= 9.5) return 'Exceptional';
    if (rating >= 9.0) return 'Wonderful';
    if (rating >= 8.5) return 'Superb';
    if (rating >= 8.0) return 'Very Good';
    return 'Good';
  }
  if (lang === 'ms') {
    if (rating >= 9.5) return 'Hebat Sekali';
    if (rating >= 9.0) return 'Mengagumkan';
    if (rating >= 8.5) return 'Luar Biasa';
    if (rating >= 8.0) return 'Sangat Baik';
    return 'Baik';
  }
  // Default 'id'
  if (rating >= 9.5) return 'Istimewa';
  if (rating >= 9.0) return 'Mengesankan';
  if (rating >= 8.5) return 'Luar Biasa';
  if (rating >= 8.0) return 'Sangat Bagus';
  return 'Bagus';
};

export const formatDateLocalized = (dateStr, lang = 'id') => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  
  if (lang === 'en') {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  }
  
  if (lang === 'ms') {
    const days = ['Ahd', 'Isn', 'Sel', 'Rab', 'Kha', 'Jum', 'Sab'];
    const months = ['Jan', 'Feb', 'Mac', 'Apr', 'Mei', 'Jun', 'Jul', 'Ogo', 'Sep', 'Okt', 'Nov', 'Dis'];
    return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  }

  // Indonesian
  const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
};

export const calculateNights = (checkInStr, checkOutStr) => {
  const checkIn = new Date(checkInStr);
  const checkOut = new Date(checkOutStr);
  const diffTime = Math.abs(checkOut - checkIn);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 1;
};

export const TRANSLATIONS = {
  id: {
    brandTagline: 'Kurasi Hotel Nusantara',
    navExplore: 'Eksplor Hotel',
    navVillas: 'Resor & Villa',
    navDeals: 'Promo Terbatas',
    navOrders: 'Cek Pesanan',
    navPartner: 'Daftarkan Properti',
    navLogin: 'Masuk',
    navRegister: 'Daftar',
    guaranteeText: 'Jaminan Harga Terbaik & Konfirmasi Langsung',
    conciergeText: 'Concierge 24 Jam: 021-5088-9000',
    heroBadge: 'Koleksi Eksklusif Musim Liburan 2026',
    heroTitle: 'Kurasi Hotel & Resor Berkarakter di Seluruh Nusantara',
    heroSubtitle: 'Dari villa tebing samudra di Bali hingga suite metropolitan di Jakarta. Setiap properti dikurasi dengan standar kenyamanan tinggi.',
    heroOfficialPartner: 'Mitra Resmi Terverifikasi',
    heroRealReviews: '100% Ulasan Tamu Asli',
    heroTransparentPricing: 'Harga Transparan & Tanpa Biaya Terselubung',
    
    // Search Tabs
    tabHotels: 'Hotel Bintang & Butik',
    tabVillas: 'Private Villa & Resor',
    tabTransit: 'Transit Singkat',
    tabSpecial: 'Penawaran Eksklusif',

    // Search Fields
    destinationLabel: 'Destinasi atau Nama Properti',
    destinationPlaceholder: 'Ketik kota atau nama hotel...',
    popularDestinations: 'Destinasi Utama:',
    allCities: 'Semua Kota',
    stayPeriodLabel: 'Periode Menginap',
    nights: 'Malam',
    guestsRoomsLabel: 'Jumlah Tamu & Kamar',
    adults: 'Dewasa',
    adultsDesc: 'Usia 18 tahun ke atas',
    children: 'Anak-anak',
    childrenDesc: 'Usia 0 - 17 tahun',
    rooms: 'Kamar',
    roomsDesc: 'Jumlah unit kamar',
    searchBtn: 'Cari Hotel',
    searchTooltip: 'Temukan Akomodasi',

    // Quick Filters
    quickPayAtHotel: 'Bayar di Tempat',
    quickFreeBreakfast: '✓ Sarapan Termasuk',
    quickFourStars: 'Bintang 4 & 5',
    quickFreeCancellation: '✓ Pembatalan Gratis',

    // Flash Sale
    flashSaleBadge: 'Penawaran Kilat',
    flashSaleSubtitle: 'Harga terendah dalam 30 hari terakhir',
    flashSaleTitle: 'Koleksi Spesial Periode Terbatas',
    endsIn: 'Berakhir Dalam:',
    claimRoom: 'Klaim Kamar',
    savePercent: 'Hemat',
    remainingRooms: 'Sisa {count} kamar promo',

    // Feed & Filters
    sidebarFilterTitle: 'Filter Pencarian',
    propertiesMatch: 'properti cocok',
    resetFilters: 'Reset',
    pricePerNight: 'Harga Per Malam',
    starRating: 'Bintang Hotel',
    popularFacilities: 'Fasilitas Populer',
    facilityBreakfast: 'Sarapan Gratis',
    facilityCancellation: 'Pembatalan Gratis',
    facilityPool: 'Kolam Renang',
    facilityWifi: 'WiFi Gratis Cepat',
    facilityPayAtHotel: 'Bayar di Hotel',
    propertyType: 'Tipe Akomodasi',
    allTypes: 'Semua Tipe',
    viewOnMap: 'Lihat di Peta Interaktif',

    // Sort & Cards
    showingHotels: 'Menampilkan {count} akomodasi terbaik',
    sortByLabel: 'Urutkan:',
    sortPopularity: 'Popularitas Tertinggi',
    sortPriceAsc: 'Harga Terendah',
    sortPriceDesc: 'Harga Tertinggi',
    sortRatingDesc: 'Rating Ulasan Tertinggi',
    sortDiscountDesc: 'Diskon Terbesar',
    selectRoomBtn: 'Pilih Kamar',
    perNightSubtext: '/malam (bersih)',
    taxExcluded: 'Di luar pajak & biaya layanan',
    reviewsCount: 'ulasan',
    saveWishlist: 'Simpan ke Wishlist',
    savedWishlist: 'Tersimpan di Wishlist!',

    // Detail Modal
    tabRooms: '🛏️ Pilihan Kamar',
    tabOverview: '📝 Ringkasan Hotel',
    tabFacilities: '🏊 Fasilitas Lengkap',
    tabReviews: '⭐ Ulasan Tamu',
    bookNow: 'Pesan Sekarang',
    roomSize: 'Luas Kamar',
    bedConfiguration: 'Tipe Ranjang',
    guestCapacity: 'Kapasitas',
    freeBreakfastIncluded: 'Sarapan prasmanan lezat termasuk',
    freeCancellationAvailable: 'Bisa Refund / Pembatalan gratis s.d H-1',

    // Checkout
    checkoutTitle: 'Konfirmasi Pemesanan & Pembayaran',
    checkoutSubtitle: 'Langkah terakhir untuk mengamankan kamar Anda',
    confirmedTitle: 'Pemesanan Berhasil Terkonfirmasi!',
    confirmedSubtitle: 'E-Voucher resmi telah diterbitkan oleh NusaStay',
    guestDetailsTitle: '1. Data Tamu & Pemesan',
    fullNameLabel: 'Nama Lengkap (sesuai KTP / Paspor)',
    phoneLabel: 'No. Handphone (WhatsApp)',
    emailLabel: 'Alamat Email (E-Voucher dikirim ke sini)',
    paymentMethodTitle: '2. Metode Pembayaran Cepat',
    roomCost: 'Biaya Kamar',
    taxAndService: 'Pajak & Biaya Layanan Resmi (11%)',
    memberDiscount: 'Diskon Eksklusif Member NusaStay',
    totalPayment: 'Total Pembayaran',
    payAndConfirm: 'Bayar & Konfirmasi Pemesanan',
    downloadPdf: 'Unduh PDF Voucher',
    backToHome: 'Kembali ke Beranda',
    bookingCodeLabel: 'No. Booking NusaStay',
    statusConfirmed: 'TERKONFIRMASI',
    wishlistTitle: 'Hotel Disimpan',
    wishlistSubtitle: 'properti di wishlist Anda',
    emptyWishlistTitle: 'Belum ada hotel tersimpan',
    emptyWishlistDesc: 'Klik ikon hati pada hotel mana pun untuk menyimpannya ke daftar liburan favorit Anda.',
    mapTitle: 'Peta Lokasi Hotel & Resor',
    mapSubtitle: 'Klik pin harga untuk melihat pratinjau akomodasi',
    viewDetailsBtn: 'Lihat Detail & Kamar',
    activeFiltersLabel: 'Filter Aktif:',
    clearAllBtn: 'Hapus Semua',
    noHotelsMatch: 'Tidak ada hotel yang sesuai filter',
    noHotelsDesc: 'Coba sesuaikan batas harga, kurangi filter fasilitas, atau pilih destinasi kota lainnya.',
    resetSearchFilters: 'Reset Filter Pencarian',
    maxPriceLabel: 'Maks.',
    allIndonesia: 'Seluruh Indonesia',
    hotelsIn: 'Hotel & Resor di {city}',
    perNight: '/malam',
    removeFromWishlist: 'Hapus dari Wishlist',
    addToWishlist: 'Simpan ke Wishlist',
    selectedBadge: 'Pilihan Populer',
  },

  ms: {
    brandTagline: 'Kurasi Hotel Nusantara',
    navExplore: 'Terokai Hotel',
    navVillas: 'Resort & Villa',
    navDeals: 'Tawaran Terhad',
    navOrders: 'Semak Tempahan',
    navPartner: 'Daftar Penginapan',
    navLogin: 'Log Masuk',
    navRegister: 'Daftar Akaun',
    guaranteeText: 'Jaminan Harga Terbaik & Pengesahan Segera',
    conciergeText: 'Perkhidmatan Tetamu 24 Jam: 021-5088-9000',
    heroBadge: 'Koleksi Eksklusif Musim Percutian 2026',
    heroTitle: 'Kurasi Hotel & Resort Menawan di Seluruh Nusantara',
    heroSubtitle: 'Dari villa tebing lautan di Bali hingga suite metropolitan di Jakarta. Setiap penginapan dikurasi dengan piawaian keselesaan tertinggi.',
    heroOfficialPartner: 'Rakan Kongsi Rasmi Sah',
    heroRealReviews: '100% Ulasan Tetamu Sebenar',
    heroTransparentPricing: 'Harga Telus Tanpa Kos Tersembunyi',

    // Search Tabs
    tabHotels: 'Hotel Bintang & Butik',
    tabVillas: 'Villa Peribadi & Resort',
    tabTransit: 'Transit Singkat',
    tabSpecial: 'Tawaran Eksklusif',

    // Search Fields
    destinationLabel: 'Destinasi atau Nama Hotel',
    destinationPlaceholder: 'Taip nama bandar atau hotel...',
    popularDestinations: 'Destinasi Utama:',
    allCities: 'Semua Bandar',
    stayPeriodLabel: 'Tempoh Penginapan',
    nights: 'Malam',
    guestsRoomsLabel: 'Bilangan Tetamu & Bilik',
    adults: 'Dewasa',
    adultsDesc: 'Umur 18 tahun ke atas',
    children: 'Kanak-kanak',
    childrenDesc: 'Umur 0 - 17 tahun',
    rooms: 'Bilik',
    roomsDesc: 'Bilangan unit bilik',
    searchBtn: 'Cari Hotel',
    searchTooltip: 'Cari Penginapan',

    // Quick Filters
    quickPayAtHotel: 'Bayar di Tempat Penginapan',
    quickFreeBreakfast: '✓ Sarapan Percuma',
    quickFourStars: 'Bintang 4 & 5',
    quickFreeCancellation: '✓ Pembatalan Percuma',

    // Flash Sale
    flashSaleBadge: 'Tawaran Kilat',
    flashSaleSubtitle: 'Harga terendah dalam 30 hari lepas',
    flashSaleTitle: 'Koleksi Khas Tempoh Terhad',
    endsIn: 'Tamat Dalam:',
    claimRoom: 'Tuntut Bilik',
    savePercent: 'Jimat',
    remainingRooms: 'Tinggal {count} bilik promosi',

    // Feed & Filters
    sidebarFilterTitle: 'Tapis Carian',
    propertiesMatch: 'penginapan sepadan',
    resetFilters: 'Set Semula',
    pricePerNight: 'Harga Setiap Malam',
    starRating: 'Bintang Hotel',
    popularFacilities: 'Kemudahan Popular',
    facilityBreakfast: 'Sarapan Percuma',
    facilityCancellation: 'Pembatalan Percuma',
    facilityPool: 'Kolam Renang',
    facilityWifi: 'WiFi Percuma Pantas',
    facilityPayAtHotel: 'Bayar di Hotel',
    propertyType: 'Jenis Penginapan',
    allTypes: 'Semua Jenis',
    viewOnMap: 'Lihat pada Peta Interaktif',

    // Sort & Cards
    showingHotels: 'Menampilkan {count} penginapan terbaik',
    sortByLabel: 'Susun:',
    sortPopularity: 'Populariti Tertinggi',
    sortPriceAsc: 'Harga Terendah',
    sortPriceDesc: 'Harga Tertinggi',
    sortRatingDesc: 'Penarafan Tertinggi',
    sortDiscountDesc: 'Diskaun Terbesar',
    selectRoomBtn: 'Pilih Bilik',
    perNightSubtext: '/malam (bersih)',
    taxExcluded: 'Tidak termasuk cukai & caj perkhidmatan',
    reviewsCount: 'ulasan',
    saveWishlist: 'Simpan ke Senarai Hajat',
    savedWishlist: 'Disimpan dalam Senarai Hajat!',

    // Detail Modal
    tabRooms: '🛏️ Pilihan Bilik',
    tabOverview: '📝 Ringkasan Hotel',
    tabFacilities: '🏊 Kemudahan Penuh',
    tabReviews: '⭐ Ulasan Tetamu',
    bookNow: 'Tempah Sekarang',
    roomSize: 'Keluasan Bilik',
    bedConfiguration: 'Jenis Katil',
    guestCapacity: 'Kapasiti',
    freeBreakfastIncluded: 'Sarapan bufet lazat disertakan',
    freeCancellationAvailable: 'Boleh Pulang Balik / Batal percuma s.d H-1',

    // Checkout
    checkoutTitle: 'Pengesahan Tempahan & Bayaran',
    checkoutSubtitle: 'Langkah terakhir untuk mengesahkan bilik anda',
    confirmedTitle: 'Tempahan Berjaya Disahkan!',
    confirmedSubtitle: 'E-Baucar rasmi telah dikeluarkan oleh NusaStay',
    guestDetailsTitle: '1. Maklumat Tetamu & Penempah',
    fullNameLabel: 'Nama Penuh (seperti dalam KP / Pasport)',
    phoneLabel: 'No. Telefon (WhatsApp)',
    emailLabel: 'Alamat E-mel (E-Baucar akan dihantar ke sini)',
    paymentMethodTitle: '2. Kaedah Pembayaran Segera',
    roomCost: 'Kos Bilik',
    taxAndService: 'Cukai & Caj Perkhidmatan (11%)',
    memberDiscount: 'Diskaun Eksklusif Ahli NusaStay',
    totalPayment: 'Jumlah Bayaran',
    payAndConfirm: 'Bayar & Sahkan Tempahan',
    downloadPdf: 'Muat Turun PDF Baucar',
    backToHome: 'Kembali ke Laman Utama',
    bookingCodeLabel: 'No. Tempahan NusaStay',
    statusConfirmed: 'DISAHKAN',
    wishlistTitle: 'Penginapan Disimpan',
    wishlistSubtitle: 'penginapan dalam senarai hajat',
    emptyWishlistTitle: 'Tiada penginapan disimpan',
    emptyWishlistDesc: 'Klik ikon hati pada mana-mana penginapan untuk menyimpannya ke senarai percutian idaman anda.',
    mapTitle: 'Peta Lokasi Hotel & Resort',
    mapSubtitle: 'Klik pin harga untuk melihat pratonton penginapan',
    viewDetailsBtn: 'Lihat Butiran & Bilik',
    activeFiltersLabel: 'Penapis Aktif:',
    clearAllBtn: 'Padam Semua',
    noHotelsMatch: 'Tiada penginapan yang sepadan dengan penapis',
    noHotelsDesc: 'Cuba sesuaikan julat harga, kurangkan penapis kemudahan, atau pilih destinasi lain.',
    resetSearchFilters: 'Set Semula Penapis',
    maxPriceLabel: 'Maks.',
    allIndonesia: 'Seluruh Indonesia',
    hotelsIn: 'Hotel & Resort di {city}',
    perNight: '/malam',
    removeFromWishlist: 'Padam dari Senarai Hajat',
    addToWishlist: 'Simpan ke Senarai Hajat',
    selectedBadge: 'Pilihan Popular',
  },

  en: {
    brandTagline: 'Curated Indonesian Stays',
    navExplore: 'Explore Hotels',
    navVillas: 'Villas & Resorts',
    navDeals: 'Flash Deals',
    navOrders: 'My Bookings',
    navPartner: 'List Property',
    navLogin: 'Sign In',
    navRegister: 'Register',
    guaranteeText: 'Best Price Guarantee & Direct Confirmation',
    conciergeText: '24/7 Guest Concierge: +62 21-5088-9000',
    heroBadge: 'Exclusive 2026 Holiday Collection',
    heroTitle: 'Curated Luxury Hotels & Resorts in Indonesia',
    heroSubtitle: 'From clifftop oceanfront villas in Bali to metropolitan penthouse suites in Jakarta. Every property vetted to the highest comfort standards.',
    heroOfficialPartner: 'Official Verified Partners',
    heroRealReviews: '100% Verified Guest Reviews',
    heroTransparentPricing: 'Transparent Pricing with Zero Hidden Fees',

    // Search Tabs
    tabHotels: 'Hotels & Boutique Stays',
    tabVillas: 'Private Villas & Resorts',
    tabTransit: 'Short Hourly Stays',
    tabSpecial: 'Exclusive Offers',

    // Search Fields
    destinationLabel: 'Destination or Property Name',
    destinationPlaceholder: 'Search city or hotel name...',
    popularDestinations: 'Top Destinations:',
    allCities: 'All Destinations',
    stayPeriodLabel: 'Stay Dates',
    nights: 'Nights',
    guestsRoomsLabel: 'Guests & Rooms',
    adults: 'Adults',
    adultsDesc: 'Age 18 and above',
    children: 'Children',
    childrenDesc: 'Age 0 - 17 years old',
    rooms: 'Rooms',
    roomsDesc: 'Number of room units',
    searchBtn: 'Search Stays',
    searchTooltip: 'Find Accommodations',

    // Quick Filters
    quickPayAtHotel: 'Pay at Property',
    quickFreeBreakfast: '✓ Free Breakfast',
    quickFourStars: '4 & 5 Star Hotels',
    quickFreeCancellation: '✓ Free Cancellation',

    // Flash Sale
    flashSaleBadge: 'Flash Deal',
    flashSaleSubtitle: 'Lowest price in the last 30 days',
    flashSaleTitle: 'Limited Time Exclusive Collection',
    endsIn: 'Ends In:',
    claimRoom: 'Claim Room',
    savePercent: 'Save',
    remainingRooms: 'Only {count} rooms left',

    // Feed & Filters
    sidebarFilterTitle: 'Search Filters',
    propertiesMatch: 'properties matched',
    resetFilters: 'Reset',
    pricePerNight: 'Nightly Rate',
    starRating: 'Star Rating',
    popularFacilities: 'Popular Amenities',
    facilityBreakfast: 'Free Breakfast',
    facilityCancellation: 'Free Cancellation',
    facilityPool: 'Swimming Pool',
    facilityWifi: 'Fast Free WiFi',
    facilityPayAtHotel: 'Pay at Hotel',
    propertyType: 'Property Type',
    allTypes: 'All Types',
    viewOnMap: 'View on Interactive Map',

    // Sort & Cards
    showingHotels: 'Showing {count} exceptional stays',
    sortByLabel: 'Sort by:',
    sortPopularity: 'Highest Popularity',
    sortPriceAsc: 'Lowest Price',
    sortPriceDesc: 'Highest Price',
    sortRatingDesc: 'Top Guest Rating',
    sortDiscountDesc: 'Largest Discount',
    selectRoomBtn: 'Select Room',
    perNightSubtext: '/night (all-inclusive)',
    taxExcluded: 'Excludes government taxes & service fees',
    reviewsCount: 'reviews',
    saveWishlist: 'Save to Wishlist',
    savedWishlist: 'Saved to Wishlist!',

    // Detail Modal
    tabRooms: '🛏️ Room Options',
    tabOverview: '📝 Hotel Overview',
    tabFacilities: '🏊 Full Amenities',
    tabReviews: '⭐ Guest Reviews',
    bookNow: 'Book Now',
    roomSize: 'Room Area',
    bedConfiguration: 'Bed Type',
    guestCapacity: 'Occupancy',
    freeBreakfastIncluded: 'Complimentary buffet breakfast included',
    freeCancellationAvailable: 'Free cancellation available up to 24h before',

    // Checkout
    checkoutTitle: 'Booking Confirmation & Checkout',
    checkoutSubtitle: 'Final step to secure your reserved room',
    confirmedTitle: 'Booking Successfully Confirmed!',
    confirmedSubtitle: 'Official E-Voucher has been issued by NusaStay',
    guestDetailsTitle: '1. Guest & Contact Information',
    fullNameLabel: 'Full Name (as per Passport / ID)',
    phoneLabel: 'Phone Number (WhatsApp)',
    emailLabel: 'Email Address (E-Voucher sent here)',
    paymentMethodTitle: '2. Secure Payment Options',
    roomCost: 'Room Charge',
    taxAndService: 'Taxes & Service Charge (11%)',
    memberDiscount: 'NusaStay Member Special Discount',
    totalPayment: 'Total Amount',
    payAndConfirm: 'Confirm & Pay',
    downloadPdf: 'Download PDF Voucher',
    backToHome: 'Back to Home',
    bookingCodeLabel: 'NusaStay Booking Code',
    statusConfirmed: 'CONFIRMED',
    wishlistTitle: 'Saved Stays',
    wishlistSubtitle: 'properties in your wishlist',
    emptyWishlistTitle: 'No saved stays yet',
    emptyWishlistDesc: 'Click the heart icon on any hotel to save it to your wishlist collection.',
    mapTitle: 'Hotels & Resorts Map',
    mapSubtitle: 'Click price pins to preview accommodations',
    viewDetailsBtn: 'View Details & Rooms',
    activeFiltersLabel: 'Active Filters:',
    clearAllBtn: 'Clear All',
    noHotelsMatch: 'No accommodations match your filters',
    noHotelsDesc: 'Try adjusting the price limit, removing some amenity filters, or choosing another destination.',
    resetSearchFilters: 'Reset Search Filters',
    maxPriceLabel: 'Max.',
    allIndonesia: 'All Indonesia',
    hotelsIn: 'Hotels & Resorts in {city}',
    perNight: '/night',
    removeFromWishlist: 'Remove from Wishlist',
    addToWishlist: 'Save to Wishlist',
    selectedBadge: 'Top Pick',
  }
};
