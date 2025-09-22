/**
 * Validates a US ZIP code
 * Accepts 5-digit ZIP codes (12345) and ZIP+4 format (12345-6789)
 */
export const isValidZipCode = (zipCode: string): boolean => {
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zipCode.trim());
};

/**
 * Formats a number as currency
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Formats mileage with commas
 */
export const formatMileage = (mileage: number): string => {
  return new Intl.NumberFormat('en-US').format(mileage);
};