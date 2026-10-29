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
  if (amountInIdr === undefined || amountInIdr === null) {
    if (currencyCode === 'MYR') return 'RM 0.00';
    if (currencyCode === 'SGD') return 'S$ 0.00';
    return 'Rp 0';
  }
  
  if (currencyCode === 'MYR') {
    const myrAmount = amountInIdr / 3550;
    return 'RM ' + myrAmount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
  
  if (currencyCode === 'SGD') {
    const sgdAmount = amountInIdr / 11850;
    return 'S$ ' + sgdAmount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  // Default IDR (no cents in Indonesian hotel pricing)
  return 'Rp ' + Math.round(amountInIdr).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
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
    navDeals: 'Flash Sale',
    navOrders: 'Cek Pesanan',
    navPartner: 'Daftarkan Properti',
    navLogin: 'Masuk',
    navRegister: 'Daftar',
    guaranteeText: 'Jaminan Harga Terbaik',
    conciergeText: 'Concierge 24 Jam: +62 21-5088-9000',
    heroBadge: 'Pilihan 2026',
    heroTitle: 'Hotel & Resor Pilihan Nusantara',
    heroSubtitle: 'Hotel dan villa pilihan dengan harga transparan dan konfirmasi instan.',
    heroOfficialPartner: 'Mitra Resmi',
    heroRealReviews: 'Ulasan Asli',
    heroTransparentPricing: 'Harga Bersih',
    
    // Search Tabs
    tabHotels: 'Hotel',
    tabVillas: 'Villa & Resor',
    tabTransit: 'Transit',
    tabSpecial: 'Promo Khusus',

    // Search Fields
    destinationLabel: 'Destinasi / Hotel',
    destinationPlaceholder: 'Cari kota atau hotel...',
    popularDestinations: 'Destinasi Populer:',
    allCities: 'Semua Kota',
    stayPeriodLabel: 'Tanggal Inap',
    nights: 'Malam',
    guestsRoomsLabel: 'Tamu & Kamar',
    adults: 'Dewasa',
    adultsDesc: 'Usia 18+',
    children: 'Anak',
    childrenDesc: 'Usia 0-17',
    rooms: 'Kamar',
    roomsDesc: 'Unit kamar',
    searchBtn: 'Cari Hotel',
    searchTooltip: 'Temukan Akomodasi',

    // Quick Filters
    quickPayAtHotel: 'Bayar di Tempat',
    quickFreeBreakfast: '✓ Sarapan Gratis',
    quickFourStars: 'Bintang 4+',
    quickFreeCancellation: '✓ Batal Gratis',

    // Flash Sale
    flashSaleBadge: 'Flash Deal',
    flashSaleSubtitle: 'Harga terendah 30 hari',
    flashSaleTitle: 'Flash Sale',
    endsIn: 'Berakhir Dalam:',
    claimRoom: 'Klaim Kamar',
    savePercent: 'Hemat',
    remainingRooms: 'Sisa {count} kamar',

    // Feed & Filters
    sidebarFilterTitle: 'Filter',
    countryFilterTitle: 'Negara',
    countryAll: 'Semua',
    countrySG: 'Singapore',
    countryMY: 'Malaysia',
    countryID: 'Indonesia',
    propertiesMatch: 'properti',
    resetFilters: 'Reset',
    pricePerNight: 'Harga / Malam',
    starRating: 'Bintang',
    popularFacilities: 'Fasilitas',
    facilityBreakfast: 'Sarapan Gratis',
    facilityCancellation: 'Pembatalan Gratis',
    facilityPool: 'Kolam Renang',
    facilityWifi: 'WiFi Gratis',
    facilityPayAtHotel: 'Bayar di Hotel',
    propertyType: 'Tipe Properti',
    allTypes: 'Semua Tipe',
    viewOnMap: 'Peta Interaktif',

    // Sort & Cards
    showingHotels: '{count} properti pilihan',
    sortByLabel: 'Urutkan:',
    sortPopularity: 'Terpopuler',
    sortPriceAsc: 'Harga: Rendah ke Tinggi',
    sortPriceDesc: 'Harga: Tinggi ke Rendah',
    sortRatingDesc: 'Rating Tertinggi',
    sortDiscountDesc: 'Diskon Terbesar',
    selectRoomBtn: 'Pilih Kamar',
    perNightSubtext: '/malam',
    taxExcluded: 'Sebelum pajak & biaya',
    reviewsCount: 'ulasan',
    saveWishlist: 'Simpan ke Wishlist',
    savedWishlist: 'Tersimpan!',

    // Detail Modal
    tabRooms: 'Pilihan Kamar',
    tabOverview: 'Ringkasan',
    tabFacilities: 'Fasilitas',
    tabReviews: 'Ulasan',
    bookNow: 'Pesan Sekarang',
    roomOptionsTitle: 'Pilihan Kamar',
    perRoomPerNight: 'Per kamar / malam',
    remainingRoomsAlert: 'Sisa {count} kamar!',
    adultGuestsText: '{count} Dewasa',
    roomLabel: 'Kamar:',
    roomSize: 'Luas Kamar',
    bedConfiguration: 'Tipe Ranjang',
    guestCapacity: 'Kapasitas',
    freeBreakfastIncluded: 'Sarapan prasmanan termasuk',
    freeCancellationAvailable: 'Pembatalan gratis s.d H-1',
    metricCleanliness: 'Kebersihan',
    metricComfort: 'Kenyamanan',
    metricService: 'Pelayanan',
    metricLocation: 'Lokasi Strategis',
    checkInTimeLabel: 'Mulai 14:00',
    checkOutTimeLabel: 'Sebelum 12:00',
    receptionText: 'Resepsionis 24 jam.',
    hygieneProtocolTitle: 'Protokol Kebersihan',

    // Checkout
    checkoutTitle: 'Detail Pemesanan',
    checkoutSubtitle: 'Periksa kembali detail pesanan Anda',
    confirmedTitle: 'Pemesanan Berhasil!',
    confirmedSubtitle: 'E-Voucher resmi telah terbit',
    guestDetailsTitle: '1. Data Tamu',
    fullNameLabel: 'Nama Lengkap (sesuai KTP / Paspor)',
    phoneLabel: 'No. Handphone (WhatsApp)',
    emailLabel: 'Alamat Email (E-Voucher)',
    paymentMethodTitle: '2. Metode Pembayaran',
    roomCost: 'Biaya Kamar',
    taxAndService: 'Pajak & Biaya (11%)',
    taxAndServiceLabel: 'Pajak & Biaya (11%)',
    specialRequestsOptions: ['Ranjang besar (King)', 'Bebas asap rokok', 'Lantai tinggi', 'Check-in awal'],
    memberDiscount: 'Diskon Member',
    totalPayment: 'Total Pembayaran',
    payAndConfirm: 'Bayar Sekarang',
    downloadPdf: 'Unduh Voucher',
    backToHome: 'Kembali ke Beranda',
    bookingCodeLabel: 'No. Booking NusaStay',
    statusConfirmed: 'TERKONFIRMASI',
    wishlistTitle: 'Hotel Disimpan',
    wishlistSubtitle: 'properti tersimpan',
    emptyWishlistTitle: 'Belum ada hotel tersimpan',
    emptyWishlistDesc: 'Klik ikon hati pada hotel mana pun untuk menyimpannya.',
    mapTitle: 'Peta Lokasi Hotel & Resor',
    mapSubtitle: 'Klik pin harga untuk pratinjau akomodasi',
    viewDetailsBtn: 'Lihat Detail & Kamar',
    activeFiltersLabel: 'Filter Aktif:',
    clearAllBtn: 'Hapus Semua',
    noHotelsMatch: 'Tidak ada hotel yang sesuai',
    noHotelsDesc: 'Coba sesuaikan batas harga, kurangi filter fasilitas, atau pilih kota lain.',
    resetSearchFilters: 'Reset Filter',
    maxPriceLabel: 'Maks.',
    allDestinations: 'Semua Destinasi (SG • MY • ID)',
    allIndonesia: 'Semua Destinasi (SG • MY • ID)',
    hotelsIn: 'Hotel di {city}',
    perNight: '/malam',
    removeFromWishlist: 'Hapus dari Wishlist',
    addToWishlist: 'Simpan ke Wishlist',
    selectedBadge: 'Pilihan Populer',
  },

  ms: {
    brandTagline: 'Kurasi Hotel Nusantara',
    navExplore: 'Terokai Hotel',
    navVillas: 'Resort & Villa',
    navDeals: 'Flash Sale',
    navOrders: 'Semak Tempahan',
    navPartner: 'Daftar Penginapan',
    navLogin: 'Log Masuk',
    navRegister: 'Daftar',
    guaranteeText: 'Jaminan Harga Terbaik',
    conciergeText: 'Khidmat Tetamu 24 Jam: +60 3-8088 9000',
    heroBadge: 'Pilihan 2026',
    heroTitle: 'Hotel & Resort Pilihan Nusantara',
    heroSubtitle: 'Hotel dan villa pilihan dengan harga telus dan pengesahan segera.',
    heroOfficialPartner: 'Rakan Rasmi',
    heroRealReviews: 'Ulasan Sebenar',
    heroTransparentPricing: 'Harga Telus',

    // Search Tabs
    tabHotels: 'Hotel',
    tabVillas: 'Villa & Resort',
    tabTransit: 'Transit',
    tabSpecial: 'Tawaran Khas',

    // Search Fields
    destinationLabel: 'Destinasi / Hotel',
    destinationPlaceholder: 'Cari bandar atau hotel...',
    popularDestinations: 'Destinasi Utama:',
    allCities: 'Semua Bandar',
    stayPeriodLabel: 'Tarikh Inap',
    nights: 'Malam',
    guestsRoomsLabel: 'Tetamu & Bilik',
    adults: 'Dewasa',
    adultsDesc: 'Umur 18+',
    children: 'Kanak-kanak',
    childrenDesc: 'Umur 0-17',
    rooms: 'Bilik',
    roomsDesc: 'Unit bilik',
    searchBtn: 'Cari Hotel',
    searchTooltip: 'Cari Penginapan',

    // Quick Filters
    quickPayAtHotel: 'Bayar di Tempat',
    quickFreeBreakfast: '✓ Sarapan Percuma',
    quickFourStars: 'Bintang 4+',
    quickFreeCancellation: '✓ Batal Percuma',

    // Flash Sale
    flashSaleBadge: 'Flash Deal',
    flashSaleSubtitle: 'Kadar terendah 30 hari',
    flashSaleTitle: 'Flash Sale',
    endsIn: 'Tamat Dalam:',
    claimRoom: 'Tuntut Bilik',
    savePercent: 'Jimat',
    remainingRooms: 'Tinggal {count} bilik',

    // Feed & Filters
    sidebarFilterTitle: 'Penapis',
    countryFilterTitle: 'Negara',
    countryAll: 'Semua',
    countrySG: 'Singapura',
    countryMY: 'Malaysia',
    countryID: 'Indonesia',
    propertiesMatch: 'penginapan',
    resetFilters: 'Set Semula',
    pricePerNight: 'Harga / Malam',
    starRating: 'Bintang',
    popularFacilities: 'Kemudahan',
    facilityBreakfast: 'Sarapan Percuma',
    facilityCancellation: 'Pembatalan Percuma',
    facilityPool: 'Kolam Renang',
    facilityWifi: 'WiFi Percuma',
    facilityPayAtHotel: 'Bayar di Hotel',
    propertyType: 'Jenis Penginapan',
    allTypes: 'Semua Jenis',
    viewOnMap: 'Peta Interaktif',

    // Sort & Cards
    showingHotels: '{count} penginapan pilihan',
    sortByLabel: 'Susun:',
    sortPopularity: 'Terpopular',
    sortPriceAsc: 'Harga: Rendah ke Tinggi',
    sortPriceDesc: 'Harga: Tinggi ke Rendah',
    sortRatingDesc: 'Penarafan Tertinggi',
    sortDiscountDesc: 'Diskaun Terbesar',
    selectRoomBtn: 'Pilih Bilik',
    perNightSubtext: '/malam',
    taxExcluded: 'Sebelum cukai & caj',
    reviewsCount: 'ulasan',
    saveWishlist: 'Simpan ke Senarai Hajat',
    savedWishlist: 'Disimpan!',

    // Detail Modal
    tabRooms: 'Pilihan Bilik',
    tabOverview: 'Ringkasan',
    tabFacilities: 'Kemudahan',
    tabReviews: 'Ulasan',
    bookNow: 'Tempah Sekarang',
    roomOptionsTitle: 'Pilihan Bilik',
    perRoomPerNight: 'Per bilik / malam',
    remainingRoomsAlert: 'Tinggal {count} bilik!',
    adultGuestsText: '{count} Dewasa',
    roomLabel: 'Bilik:',
    roomSize: 'Keluasan Bilik',
    bedConfiguration: 'Jenis Katil',
    guestCapacity: 'Kapasiti',
    freeBreakfastIncluded: 'Sarapan bufet disertakan',
    freeCancellationAvailable: 'Pembatalan percuma s.d H-1',
    metricCleanliness: 'Kebersihan',
    metricComfort: 'Keselesaan',
    metricService: 'Perkhidmatan',
    metricLocation: 'Lokasi Strategik',
    checkInTimeLabel: 'Bermula 14:00',
    checkOutTimeLabel: 'Sebelum 12:00',
    receptionText: 'Kaunter 24 jam.',
    hygieneProtocolTitle: 'Piawaian Kebersihan',

    // Checkout
    checkoutTitle: 'Butiran Tempahan',
    checkoutSubtitle: 'Sila semak butiran tempahan anda',
    confirmedTitle: 'Tempahan Berjaya!',
    confirmedSubtitle: 'E-Baucar rasmi telah terbit',
    guestDetailsTitle: '1. Maklumat Tetamu',
    fullNameLabel: 'Nama Penuh (seperti dalam MyKad / Pasport)',
    phoneLabel: 'No. Telefon (WhatsApp)',
    emailLabel: 'Alamat E-mel (E-Baucar)',
    paymentMethodTitle: '2. Kaedah Pembayaran',
    roomCost: 'Kos Bilik',
    taxAndService: 'Cukai & Caj (8%)',
    taxAndServiceLabel: 'Cukai & Caj (8%)',
    specialRequestsOptions: ['Katil besar (King)', 'Bebas asap rokok', 'Tingkat tinggi', 'Daftar masuk awal'],
    memberDiscount: 'Diskaun Ahli',
    totalPayment: 'Jumlah Bayaran',
    payAndConfirm: 'Bayar Sekarang',
    downloadPdf: 'Muat Turun Baucar',
    backToHome: 'Kembali ke Laman Utama',
    bookingCodeLabel: 'No. Tempahan NusaStay',
    statusConfirmed: 'DISAHKAN',
    wishlistTitle: 'Penginapan Disimpan',
    wishlistSubtitle: 'penginapan tersimpan',
    emptyWishlistTitle: 'Tiada penginapan disimpan',
    emptyWishlistDesc: 'Klik ikon hati pada mana-mana penginapan untuk menyimpannya.',
    mapTitle: 'Peta Lokasi Hotel & Resort',
    mapSubtitle: 'Klik pin harga untuk pratonton penginapan',
    viewDetailsBtn: 'Lihat Butiran & Bilik',
    activeFiltersLabel: 'Penapis Aktif:',
    clearAllBtn: 'Padam Semua',
    noHotelsMatch: 'Tiada penginapan sepadan',
    noHotelsDesc: 'Cuba sesuaikan julat harga, kurangkan penapis kemudahan, atau pilih destinasi lain.',
    resetSearchFilters: 'Set Semula Penapis',
    maxPriceLabel: 'Maks.',
    allDestinations: 'Semua Destinasi (SG • MY • ID)',
    allIndonesia: 'Semua Destinasi (SG • MY • ID)',
    hotelsIn: 'Hotel & Resort di {city}',
    perNight: '/malam',
    removeFromWishlist: 'Padam dari Senarai Hajat',
    addToWishlist: 'Simpan ke Senarai Hajat',
    selectedBadge: 'Pilihan Popular',
  },

  en: {
    brandTagline: 'Curated Southeast Asia Stays',
    navExplore: 'Explore Hotels',
    navVillas: 'Villas & Resorts',
    navDeals: 'Flash Sale',
    navOrders: 'My Bookings',
    navPartner: 'List Property',
    navLogin: 'Sign In',
    navRegister: 'Register',
    guaranteeText: 'Best Price Guarantee',
    conciergeText: '24/7 Guest Concierge: +65 6788 9000',
    heroBadge: 'Top Picks 2026',
    heroTitle: 'Curated Southeast Asia Stays',
    heroSubtitle: 'Curated stays with transparent rates and instant confirmation.',
    heroOfficialPartner: 'Official Partners',
    heroRealReviews: 'Verified Reviews',
    heroTransparentPricing: 'Transparent Rates',

    // Search Tabs
    tabHotels: 'Hotels',
    tabVillas: 'Villas & Resorts',
    tabTransit: 'Transit',
    tabSpecial: 'Deals',

    // Search Fields
    destinationLabel: 'Destination / Hotel',
    destinationPlaceholder: 'Search city or hotel...',
    popularDestinations: 'Top Destinations:',
    allCities: 'All Destinations',
    stayPeriodLabel: 'Dates',
    nights: 'Nights',
    guestsRoomsLabel: 'Guests & Rooms',
    adults: 'Adults',
    adultsDesc: 'Age 18+',
    children: 'Children',
    childrenDesc: 'Age 0-17',
    rooms: 'Rooms',
    roomsDesc: 'Room units',
    searchBtn: 'Search Stays',
    searchTooltip: 'Find Accommodations',

    // Quick Filters
    quickPayAtHotel: 'Pay at Hotel',
    quickFreeBreakfast: '✓ Free Breakfast',
    quickFourStars: '4+ Stars',
    quickFreeCancellation: '✓ Free Cancellation',

    // Flash Sale
    flashSaleBadge: 'Flash Deal',
    flashSaleSubtitle: 'Best rate last 30 days',
    flashSaleTitle: 'Flash Sale',
    endsIn: 'Ends In:',
    claimRoom: 'Claim Room',
    savePercent: 'Save',
    remainingRooms: 'Only {count} rooms left',

    // Feed & Filters
    sidebarFilterTitle: 'Filters',
    countryFilterTitle: 'Country',
    countryAll: 'All',
    countrySG: 'Singapore',
    countryMY: 'Malaysia',
    countryID: 'Indonesia',
    propertiesMatch: 'properties',
    resetFilters: 'Reset',
    pricePerNight: 'Price / Night',
    starRating: 'Star Rating',
    popularFacilities: 'Amenities',
    facilityBreakfast: 'Free Breakfast',
    facilityCancellation: 'Free Cancellation',
    facilityPool: 'Swimming Pool',
    facilityWifi: 'Free WiFi',
    facilityPayAtHotel: 'Pay at Hotel',
    propertyType: 'Property Type',
    allTypes: 'All Types',
    viewOnMap: 'Interactive Map',

    // Sort & Cards
    showingHotels: '{count} curated stays',
    sortByLabel: 'Sort by:',
    sortPopularity: 'Popularity',
    sortPriceAsc: 'Price: Low to High',
    sortPriceDesc: 'Price: High to Low',
    sortRatingDesc: 'Highest Rating',
    sortDiscountDesc: 'Biggest Discount',
    selectRoomBtn: 'Select Room',
    perNightSubtext: '/night',
    taxExcluded: 'Excl. taxes & fees',
    reviewsCount: 'reviews',
    saveWishlist: 'Save to Wishlist',
    savedWishlist: 'Saved!',

    // Detail Modal
    tabRooms: 'Rooms',
    tabOverview: 'Overview',
    tabFacilities: 'Amenities',
    tabReviews: 'Reviews',
    bookNow: 'Book Now',
    roomOptionsTitle: 'Room Options',
    perRoomPerNight: 'Per room / night',
    remainingRoomsAlert: 'Only {count} rooms left!',
    adultGuestsText: '{count} Adults',
    roomLabel: 'Room:',
    roomSize: 'Room Area',
    bedConfiguration: 'Bed Type',
    guestCapacity: 'Occupancy',
    freeBreakfastIncluded: 'Buffet breakfast included',
    freeCancellationAvailable: 'Free cancellation (up to 24h)',
    metricCleanliness: 'Cleanliness',
    metricComfort: 'Comfort',
    metricService: 'Service',
    metricLocation: 'Location',
    checkInTimeLabel: 'From 14:00',
    checkOutTimeLabel: 'Until 12:00',
    receptionText: '24-hour front desk.',
    hygieneProtocolTitle: 'Hygiene Standards',

    // Checkout
    checkoutTitle: 'Checkout',
    checkoutSubtitle: 'Review your booking details',
    confirmedTitle: 'Booking Confirmed!',
    confirmedSubtitle: 'Official E-Voucher issued',
    guestDetailsTitle: '1. Guest Details',
    fullNameLabel: 'Full Name (as per NRIC / Passport)',
    phoneLabel: 'Phone Number (WhatsApp)',
    emailLabel: 'Email Address (E-Voucher)',
    paymentMethodTitle: '2. Payment Method',
    roomCost: 'Room Charge',
    taxAndService: 'Taxes & Fees (9%)',
    taxAndServiceLabel: 'Taxes & Fees (9%)',
    specialRequestsOptions: ['Large bed (King)', 'Non-smoking room', 'High floor', 'Early check-in'],
    memberDiscount: 'Member Discount',
    totalPayment: 'Total Amount',
    payAndConfirm: 'Pay Now',
    downloadPdf: 'Download Voucher',
    backToHome: 'Back to Home',
    bookingCodeLabel: 'NusaStay Booking Code',
    statusConfirmed: 'CONFIRMED',
    wishlistTitle: 'Saved Stays',
    wishlistSubtitle: 'saved properties',
    emptyWishlistTitle: 'No saved stays yet',
    emptyWishlistDesc: 'Click the heart icon on any hotel to save it.',
    mapTitle: 'Hotels & Resorts Map',
    mapSubtitle: 'Click price pins to preview accommodations',
    viewDetailsBtn: 'View Details & Rooms',
    activeFiltersLabel: 'Active Filters:',
    clearAllBtn: 'Clear All',
    noHotelsMatch: 'No accommodations match your filters',
    noHotelsDesc: 'Try adjusting the price limit, removing some filters, or choosing another destination.',
    resetSearchFilters: 'Reset Filters',
    maxPriceLabel: 'Max.',
    allDestinations: 'All Destinations (SG • MY • ID)',
    allIndonesia: 'All Destinations (SG • MY • ID)',
    hotelsIn: 'Hotels in {city}',
    perNight: '/night',
    removeFromWishlist: 'Remove from Wishlist',
    addToWishlist: 'Save to Wishlist',
    selectedBadge: 'Top Pick',
  }
};
