// Currency & formatting utilities for Indonesian Rupiah & Traveloka style

export const formatRupiah = (amount) => {
  if (amount === undefined || amount === null) return 'Rp 0';
  return 'Rp ' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const getRatingDescription = (rating) => {
  if (rating >= 9.0) return 'Mengesankan';
  if (rating >= 8.5) return 'Luar Biasa';
  if (rating >= 8.0) return 'Sangat Bagus';
  if (rating >= 7.5) return 'Bagus';
  return 'Cukup';
};

export const formatDateIndo = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
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
