import { isValidZipCode, formatCurrency, formatMileage } from '../utils/validation';

describe('validation utils', () => {
  describe('isValidZipCode', () => {
    test('validates correct 5-digit ZIP codes', () => {
      expect(isValidZipCode('12345')).toBe(true);
      expect(isValidZipCode('90210')).toBe(true);
      expect(isValidZipCode('00001')).toBe(true);
    });

    test('validates correct ZIP+4 codes', () => {
      expect(isValidZipCode('12345-6789')).toBe(true);
      expect(isValidZipCode('90210-1234')).toBe(true);
    });

    test('rejects invalid ZIP codes', () => {
      expect(isValidZipCode('123')).toBe(false);
      expect(isValidZipCode('123456')).toBe(false);
      expect(isValidZipCode('abcde')).toBe(false);
      expect(isValidZipCode('12345-67890')).toBe(false);
      expect(isValidZipCode('12345-abc')).toBe(false);
      expect(isValidZipCode('')).toBe(false);
      expect(isValidZipCode('12-345')).toBe(false);
    });

    test('handles whitespace', () => {
      expect(isValidZipCode(' 12345 ')).toBe(true);
      expect(isValidZipCode('  12345-6789  ')).toBe(true);
    });
  });

  describe('formatCurrency', () => {
    test('formats currency correctly', () => {
      expect(formatCurrency(45000)).toBe('$45,000');
      expect(formatCurrency(1000)).toBe('$1,000');
      expect(formatCurrency(999)).toBe('$999');
      expect(formatCurrency(1000000)).toBe('$1,000,000');
    });

    test('handles zero and decimal values', () => {
      expect(formatCurrency(0)).toBe('$0');
      expect(formatCurrency(1000.99)).toBe('$1,001');
    });
  });

  describe('formatMileage', () => {
    test('formats mileage with commas', () => {
      expect(formatMileage(15000)).toBe('15,000');
      expect(formatMileage(1000)).toBe('1,000');
      expect(formatMileage(999)).toBe('999');
      expect(formatMileage(1000000)).toBe('1,000,000');
    });

    test('handles zero mileage', () => {
      expect(formatMileage(0)).toBe('0');
    });
  });
});