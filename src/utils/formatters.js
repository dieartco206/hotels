// Currency & formatting utilities with multi-currency & locale support
import { formatCurrency, getRatingText, formatDateLocalized } from './i18n';

export { formatCurrency, getRatingText, formatDateLocalized };

export const formatRupiah = (amount, currency = 'IDR') => {
  return formatCurrency(amount, currency);
};

export const getRatingDescription = (rating, lang = 'id') => {
  return getRatingText(rating, lang);
};

export const formatDateIndo = (dateStr, lang = 'id') => {
  return formatDateLocalized(dateStr, lang);
};

export const calculateNights = (checkInStr, checkOutStr) => {
  const checkIn = new Date(checkInStr);
  const checkOut = new Date(checkOutStr);
  const diffTime = Math.abs(checkOut - checkIn);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 1;
};
