// Internationalization (i18n) & Currency System for Malaysia Premier Hotel Booking

export const SUPPORTED_LANGUAGES = [
  { code: 'ms', name: 'Bahasa Melayu', flag: '🇲🇾', region: 'Malaysia' },
  { code: 'en', name: 'English (MY)', flag: '🇲🇾', region: 'Malaysia' },
];

export const SUPPORTED_CURRENCIES = [
  { code: 'MYR', symbol: 'RM', name: 'Ringgit Malaysia', flag: '🇲🇾', rate: 1 },
];

export const formatCurrency = (amount, currencyCode = 'MYR') => {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return 'RM 0.00';
  }
  
  const num = typeof amount === 'string' ? parseFloat(amount) : Number(amount);
  return 'RM ' + num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export const getRatingText = (rating, lang = 'ms') => {
  if (lang === 'en') {
    if (rating >= 9.5) return 'Exceptional';
    if (rating >= 9.0) return 'Wonderful';
    if (rating >= 8.5) return 'Superb';
    if (rating >= 8.0) return 'Very Good';
    return 'Good';
  }
  // Default Bahasa Melayu
  if (rating >= 9.5) return 'Hebat Sekali';
  if (rating >= 9.0) return 'Mengagumkan';
  if (rating >= 8.5) return 'Luar Biasa';
  if (rating >= 8.0) return 'Sangat Baik';
  return 'Baik';
};

export const formatDateLocalized = (dateStr, lang = 'ms') => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  
  if (lang === 'en') {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  }
  
  // Bahasa Melayu
  const days = ['Ahd', 'Isn', 'Sel', 'Rab', 'Kha', 'Jum', 'Sab'];
  const months = ['Jan', 'Feb', 'Mac', 'Apr', 'Mei', 'Jun', 'Jul', 'Ogo', 'Sep', 'Okt', 'Nov', 'Dis'];
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
  ms: {
    brandTagline: 'Kurasi Hotel & Resort Mewah Malaysia',
    navExplore: 'Terokai Hotel',
    navVillas: 'Resort & Percutian',
    navDeals: 'Tawaran Hebat',
    navOrders: 'Semak Tempahan',
    navPartner: 'Daftar Rakan Hotel',
    navLogin: 'Log Masuk',
    navRegister: 'Daftar Akaun',
    guaranteeText: 'Jaminan Harga Terbaik di Malaysia',
    conciergeText: 'Khidmat Tetamu 24 Jam: +60 3-2142 8000',
    heroBadge: 'Pilihan Pengembara 2026',
    heroTitle: 'Hotel & Resort Mewah Terbaik di Malaysia',
    heroSubtitle: 'Tempah penginapan eksklusif di Kuala Lumpur, Langkawi, Penang, Melaka, Sabah dan Cameron Highlands dengan harga bersih dalam Ringgit Malaysia (MYR).',
    heroOfficialPartner: 'Rakan Hotel Rasmi',
    heroRealReviews: 'Ulasan Tetamu Sah',
    heroTransparentPricing: 'Kadar Harga Bersih MYR',
    
    // Search Tabs
    tabHotels: 'Hotel & Suite',
    tabVillas: 'Resort & Percutian',
    tabTransit: 'Penginapan Singgah',
    tabSpecial: 'Promosi Khas',

    // Search Fields
    destinationLabel: 'Destinasi / Nama Hotel',
    destinationPlaceholder: 'Cari destinasi (cth: Langkawi, KL, Penang)...',
    popularDestinations: 'Destinasi Utama di Malaysia:',
    allCities: 'Seluruh Malaysia',
    stayPeriodLabel: 'Tarikh Penginapan',
    nights: 'Malam',
    guestsRoomsLabel: 'Tetamu & Bilik',
    adults: 'Dewasa',
    adultsDesc: 'Umur 18+',
    children: 'Kanak-kanak',
    childrenDesc: 'Umur 0-17',
    rooms: 'Bilik',
    roomsDesc: 'Unit bilik',
    searchBtn: 'Cari Penginapan',
    searchTooltip: 'Temui Hotel Idaman Anda',

    // Quick Filters
    quickPayAtHotel: 'Bayar Semasa Daftar Masuk',
    quickFreeBreakfast: '✓ Sarapan Percuma',
    quickFourStars: 'Bintang 5 & 4+',
    quickFreeCancellation: '✓ Pembatalan Percuma',

    // Flash Sale
    flashSaleBadge: 'Tawaran Terhad',
    flashSaleSubtitle: 'Harga eksklusif diskaun tertinggi',
    flashSaleTitle: 'Tawaran Eksklusif Malaysia',
    endsIn: 'Tamat Dalam:',
    claimRoom: 'Tempah Segera',
    savePercent: 'Jimat',
    remainingRooms: 'Baki {count} bilik sahaja',

    // Feed & Filters
    sidebarFilterTitle: 'Tapis Carian',
    countryFilterTitle: 'Wilayah di Malaysia',
    countryAll: 'Semua Wilayah',
    countrySG: 'Kuala Lumpur',
    countryMY: 'Langkawi',
    countryID: 'Penang',
    propertiesMatch: 'penginapan ditemui',
    resetFilters: 'Set Semula',
    pricePerNight: 'Kadar Harga / Malam',
    starRating: 'Taraf Bintang',
    popularFacilities: 'Kemudahan Penginapan',
    facilityBreakfast: 'Sarapan Percuma',
    facilityCancellation: 'Pembatalan Percuma',
    facilityPool: 'Kolam Renang',
    facilityWifi: 'Wi-Fi Percuma',
    facilityPayAtHotel: 'Bayar di Hotel',
    propertyType: 'Jenis Penginapan',
    allTypes: 'Semua Jenis',
    viewOnMap: 'Lihat Peta Malaysia',

    // Sort & Cards
    showingHotels: '{count} penginapan mewah di Malaysia',
    sortByLabel: 'Susun Mengikut:',
    sortPopularity: 'Paling Popular',
    sortPriceAsc: 'Harga: Rendah ke Tinggi',
    sortPriceDesc: 'Harga: Tinggi ke Rendah',
    sortRatingDesc: 'Penarafan Tertinggi',
    sortDiscountDesc: 'Diskaun Terbesar',
    selectRoomBtn: 'Pilih Bilik',
    perNightSubtext: '/malam (MYR)',
    taxExcluded: 'Termasuk Cukai Perkhidmatan (SST)',
    reviewsCount: 'ulasan',
    saveWishlist: 'Simpan ke Senarai Hajat',
    savedWishlist: 'Tersimpan!',

    // Detail Modal
    tabRooms: 'Pilihan Bilik',
    tabOverview: 'Penerangan',
    tabFacilities: 'Kemudahan Penuh',
    tabReviews: 'Ulasan Tetamu',
    bookNow: 'Tempah Sekarang',
    roomOptionsTitle: 'Pilihan Bilik & Suite Tersedia',
    perRoomPerNight: 'Per bilik / malam',
    remainingRoomsAlert: 'Hanya tinggal {count} bilik!',
    adultGuestsText: '{count} Tetamu',
    roomLabel: 'Bilik:',
    roomSize: 'Keluasan Bilik',
    bedConfiguration: 'Pilihan Katil',
    viewDetails: 'Lihat Butiran',
    closeModal: 'Tutup',
    totalPrice: 'Jumlah Keseluruhan',
    nightStay: '{count} Malam Penginapan',
    inclusiveOfTax: 'Termasuk Cukai Tempatan & SST',
    checkInTime: 'Daftar Masuk: 15:00',
    checkOutTime: 'Daftar Keluar: 12:00',
    contactSupport: 'Hubungi Khidmat Bantuan',
    allRightsReserved: 'Hak Cipta Terpelihara. Dilesenkan di bawah Akta Industri Pelancongan Malaysia.',
    allMalaysia: 'Seluruh Destinasi di Malaysia',
  },

  en: {
    brandTagline: 'Curated Luxury Hotels & Resorts in Malaysia',
    navExplore: 'Explore Hotels',
    navVillas: 'Resorts & Villas',
    navDeals: 'Flash Deals',
    navOrders: 'My Bookings',
    navPartner: 'List Your Property',
    navLogin: 'Sign In',
    navRegister: 'Register',
    guaranteeText: 'Best Rate Guarantee Across Malaysia',
    conciergeText: '24/7 Guest Concierge: +60 3-2142 8000',
    heroBadge: 'Travellers Choice 2026',
    heroTitle: 'Premier Luxury Hotels & Resorts in Malaysia',
    heroSubtitle: 'Book handpicked luxury accommodations across Kuala Lumpur, Langkawi, Penang, Melaka, Sabah, and Cameron Highlands with all-inclusive rates in Malaysian Ringgit (MYR).',
    heroOfficialPartner: 'Official Partner',
    heroRealReviews: 'Verified Reviews',
    heroTransparentPricing: 'Clean MYR Pricing',
    
    // Search Tabs
    tabHotels: 'Hotels & Suites',
    tabVillas: 'Resorts & Retreats',
    tabTransit: 'Transit Stays',
    tabSpecial: 'Exclusive Deals',

    // Search Fields
    destinationLabel: 'Destination / Hotel Name',
    destinationPlaceholder: 'Search destinations (e.g. Langkawi, KL, Penang)...',
    popularDestinations: 'Top Destinations in Malaysia:',
    allCities: 'All Malaysia',
    stayPeriodLabel: 'Stay Dates',
    nights: 'Nights',
    guestsRoomsLabel: 'Guests & Rooms',
    adults: 'Adults',
    adultsDesc: 'Age 18+',
    children: 'Children',
    childrenDesc: 'Age 0-17',
    rooms: 'Rooms',
    roomsDesc: 'Room units',
    searchBtn: 'Search Stays',
    searchTooltip: 'Find Your Dream Hotel',

    // Quick Filters
    quickPayAtHotel: 'Pay at Check-In',
    quickFreeBreakfast: '✓ Free Breakfast',
    quickFourStars: '5-Star & 4+ Stars',
    quickFreeCancellation: '✓ Free Cancellation',

    // Flash Sale
    flashSaleBadge: 'Flash Deal',
    flashSaleSubtitle: 'Deepest curated seasonal discounts',
    flashSaleTitle: 'Exclusive Malaysia Deals',
    endsIn: 'Ends In:',
    claimRoom: 'Book Now',
    savePercent: 'Save',
    remainingRooms: '{count} rooms left',

    // Feed & Filters
    sidebarFilterTitle: 'Filter Search',
    countryFilterTitle: 'Regions in Malaysia',
    countryAll: 'All Regions',
    countrySG: 'Kuala Lumpur',
    countryMY: 'Langkawi',
    countryID: 'Penang',
    propertiesMatch: 'properties found',
    resetFilters: 'Reset',
    pricePerNight: 'Nightly Rate',
    starRating: 'Star Rating',
    popularFacilities: 'Facilities',
    facilityBreakfast: 'Free Breakfast',
    facilityCancellation: 'Free Cancellation',
    facilityPool: 'Swimming Pool',
    facilityWifi: 'Free High-Speed Wi-Fi',
    facilityPayAtHotel: 'Pay at Hotel',
    propertyType: 'Property Type',
    allTypes: 'All Types',
    viewOnMap: 'View Interactive Map',

    // Sort & Cards
    showingHotels: '{count} luxury properties in Malaysia',
    sortByLabel: 'Sort By:',
    sortPopularity: 'Most Popular',
    sortPriceAsc: 'Price: Low to High',
    sortPriceDesc: 'Price: High to Low',
    sortRatingDesc: 'Highest Rated',
    sortDiscountDesc: 'Biggest Discount',
    selectRoomBtn: 'Select Room',
    perNightSubtext: '/night (MYR)',
    taxExcluded: 'Inclusive of SST & Local Service Fees',
    reviewsCount: 'reviews',
    saveWishlist: 'Save to Wishlist',
    savedWishlist: 'Saved!',

    // Detail Modal
    tabRooms: 'Room Selection',
    tabOverview: 'Overview',
    tabFacilities: 'Facilities',
    tabReviews: 'Guest Reviews',
    bookNow: 'Book Now',
    roomOptionsTitle: 'Available Rooms & Suites',
    perRoomPerNight: 'Per room / night',
    remainingRoomsAlert: 'Only {count} rooms remaining!',
    adultGuestsText: '{count} Guests',
    roomLabel: 'Room:',
    roomSize: 'Room Size',
    bedConfiguration: 'Bed Type',
    viewDetails: 'View Details',
    closeModal: 'Close',
    totalPrice: 'Grand Total',
    nightStay: '{count} Nights Stay',
    inclusiveOfTax: 'Inclusive of SST & Tourism Tax',
    checkInTime: 'Check-in: 15:00',
    checkOutTime: 'Check-out: 12:00',
    contactSupport: 'Contact Concierge Support',
    allRightsReserved: 'All Rights Reserved. Licensed under Malaysian Tourism Industry Regulations.',
    allMalaysia: 'All Destinations Across Malaysia',
  }
};
