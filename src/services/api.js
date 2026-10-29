const API_BASE_URL = 'http://localhost:8080/api';

export function normalizeHotel(h) {
  if (!h) return null;

  let thumbnails = [];
  try {
    const raw = typeof h.gallery === 'string' ? JSON.parse(h.gallery) : h.gallery || [];
    thumbnails = Array.from(new Set(raw.filter(Boolean)));
  } catch (e) {
    thumbnails = [];
  }

  let facilities = [];
  try {
    facilities = typeof h.facilities === 'string' ? JSON.parse(h.facilities) : h.facilities || [];
  } catch (e) {
    facilities = [];
  }

  const normalizedRooms = (h.rooms || []).map((r) => {
    let roomAmenities = [];
    try {
      roomAmenities = typeof r.amenities === 'string' ? JSON.parse(r.amenities) : r.amenities || [];
    } catch (e) {
      roomAmenities = [];
    }

    return {
      id: r.id,
      name: r.name,
      type: r.type,
      size: `${r.size_sqm || 38} m²`,
      bedType: r.bed_type || '1 King Bed',
      maxGuests: r.max_guests || 2,
      price: r.price,
      originalPrice: r.original_price || r.price * 1.2,
      image: r.image || h.image,
      amenities: roomAmenities,
      remainingRooms: r.remaining_rooms,
      freeBreakfast: r.free_breakfast,
      freeCancellation: r.free_cancellation,
      status: r.status,
    };
  });

  return {
    id: h.id,
    name: h.name,
    type: h.type || 'Hotel',
    starRating: h.star_rating || 5,
    country: h.country,
    city: h.city,
    area: h.area || `${h.city}, ${h.country}`,
    distanceText: h.distance_text || h.tagline || 'Prime Location',
    badge: h.badge || 'Preferred Partner',
    rating: h.rating || 4.8,
    reviewsCount: h.review_count || 120,
    price: h.price_start,
    originalPrice: h.original_price || h.price_start * 1.2,
    discountPercent: h.discount_percent || 15,
    flashSale: h.flash_sale || false,
    flashSaleRemaining: 3,
    freeBreakfast: h.free_breakfast,
    freeCancellation: h.free_cancellation,
    payAtHotel: h.pay_at_hotel,
    hasPool: h.has_pool,
    hasWifi: h.has_wifi,
    hasSpa: h.has_spa,
    hasRestaurant: h.has_restaurant,
    hasGym: h.has_gym,
    mainImage: h.image,
    thumbnails: thumbnails.length > 0 ? thumbnails : [h.image],
    description: h.description,
    reviewBreakdown: {
      cleanliness: h.review_cleanliness || 9.7,
      comfort: h.review_comfort || 9.6,
      service: h.review_service || 9.7,
      location: h.review_location || 9.8,
    },
    coordinates: {
      lat: parseFloat(h.latitude) || 1.2838,
      lng: parseFloat(h.longitude) || 103.8591,
    },
    currency: h.currency || 'SGD',
    rooms: normalizedRooms,
  };
}

export const hotelsApi = {
  // Fetch hotels from backend API with normalization
  getHotels: async (params = {}) => {
    const qs = new URLSearchParams();
    if (params.country && params.country !== 'all') qs.append('country', params.country);
    if (params.city && params.city !== 'Semua Kota' && params.city !== 'All Cities') qs.append('city', params.city);
    if (params.search) qs.append('search', params.search);
    if (params.sort) qs.append('sort', params.sort);

    const queryStr = qs.toString() ? `?${qs.toString()}` : '';
    const response = await fetch(`${API_BASE_URL}/hotels${queryStr}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch hotels: ${response.statusText}`);
    }
    const data = await response.json();
    const rawList = data.data || [];
    return rawList.map(normalizeHotel);
  },

  // Get Single Hotel
  getHotelById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/hotels/${id}`);
    if (!response.ok) {
      throw new Error(`Hotel not found: ${response.statusText}`);
    }
    const data = await response.json();
    return normalizeHotel(data.data);
  },

  // Submit real guest booking
  createBooking: async (bookingPayload) => {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingPayload),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to submit reservation');
    }
    return data.data;
  },

  // Check guest booking voucher
  getBookingByCode: async (code) => {
    const response = await fetch(`${API_BASE_URL}/bookings/code/${encodeURIComponent(code)}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Booking not found');
    }
    return data.data;
  },

  // Inbound Partner Registration
  applyPartner: async (partnerPayload) => {
    const response = await fetch(`${API_BASE_URL}/partners/apply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(partnerPayload),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to submit application');
    }
    return data.data;
  },
};
