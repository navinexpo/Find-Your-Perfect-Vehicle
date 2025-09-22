import { renderHook, act, waitFor } from '@testing-library/react';
import { useVehicleSearch } from '../hooks/useVehicleSearch';

describe('useVehicleSearch', () => {
  test('initial state is correct', () => {
    const { result } = renderHook(() => useVehicleSearch());
    
    expect(result.current.zipCode).toBe('');
    expect(result.current.vehicles).toEqual([]);
    expect(result.current.filteredVehicles).toEqual([]);
    expect(result.current.filters.make).toBe('');
    expect(result.current.filters.color).toBe('');
    expect(result.current.sortBy).toBe('price-high');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test('searchVehicles handles invalid ZIP code', async () => {
    const { result } = renderHook(() => useVehicleSearch());
    
    act(() => {
      result.current.searchVehicles('123');
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe('Please enter a valid 5-digit ZIP code (e.g., 12345)');
    expect(result.current.vehicles).toEqual([]);
  });

  test('searchVehicles handles empty ZIP code', async () => {
    const { result } = renderHook(() => useVehicleSearch());
    
    act(() => {
      result.current.searchVehicles('');
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe('ZIP code is required');
    expect(result.current.vehicles).toEqual([]);
  });

  test('searchVehicles handles non-existent ZIP code', async () => {
    const { result } = renderHook(() => useVehicleSearch());
    
    act(() => {
      result.current.searchVehicles('99999');
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe('No vehicles found for this ZIP code');
    expect(result.current.vehicles).toEqual([]);
  });

  test('searchVehicles loads vehicles for valid ZIP code', async () => {
    const { result } = renderHook(() => useVehicleSearch());
    
    act(() => {
      result.current.searchVehicles('10001');
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe(null);
    expect(result.current.vehicles.length).toBeGreaterThan(0);
    expect(result.current.zipCode).toBe('10001');
    expect(result.current.vehicles[0]).toHaveProperty('make');
    expect(result.current.vehicles[0]).toHaveProperty('model');
  });

  test('updateFilters works correctly', async () => {
    const { result } = renderHook(() => useVehicleSearch());
    
    // First search for vehicles
    act(() => {
      result.current.searchVehicles('10001');
    });

    await waitFor(() => {
      expect(result.current.vehicles.length).toBeGreaterThan(0);
    });

    const originalCount = result.current.filteredVehicles.length;

    // Apply make filter
    act(() => {
      result.current.updateFilters({ make: 'Tesla' });
    });

    expect(result.current.filters.make).toBe('Tesla');
    expect(result.current.filteredVehicles.length).toBeLessThanOrEqual(originalCount);
    expect(result.current.filteredVehicles.every(v => v.make === 'Tesla')).toBe(true);
  });

  test('updateSort works correctly', async () => {
    const { result } = renderHook(() => useVehicleSearch());
    
    act(() => {
      result.current.searchVehicles('10001');
    });

    await waitFor(() => {
      expect(result.current.vehicles.length).toBeGreaterThan(0);
    });

    // Change sort to price low
    act(() => {
      result.current.updateSort('price-low');
    });

    expect(result.current.sortBy).toBe('price-low');
    
    // Verify sorting (first vehicle should have lowest price)
    const prices = result.current.filteredVehicles.map(v => v.price);
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
  });

  test('clearFilters resets filters', async () => {
    const { result } = renderHook(() => useVehicleSearch());
    
    act(() => {
      result.current.searchVehicles('10001');
    });

    await waitFor(() => {
      expect(result.current.vehicles.length).toBeGreaterThan(0);
    });

    // Apply filters
    act(() => {
      result.current.updateFilters({ make: 'Tesla', color: 'Pearl White' });
    });

    expect(result.current.filters.make).toBe('Tesla');
    expect(result.current.filters.color).toBe('Pearl White');

    // Clear filters
    act(() => {
      result.current.clearFilters();
    });

    expect(result.current.filters.make).toBe('');
    expect(result.current.filters.color).toBe('');
  });

  test('resetSearch returns to initial state', async () => {
    const { result } = renderHook(() => useVehicleSearch());
    
    act(() => {
      result.current.searchVehicles('10001');
    });

    await waitFor(() => {
      expect(result.current.vehicles.length).toBeGreaterThan(0);
    });

    // Apply some changes
    act(() => {
      result.current.updateFilters({ make: 'Tesla' });
      result.current.updateSort('price-low');
    });

    // Reset
    act(() => {
      result.current.resetSearch();
    });

    expect(result.current.zipCode).toBe('');
    expect(result.current.vehicles).toEqual([]);
    expect(result.current.filters.make).toBe('');
    expect(result.current.sortBy).toBe('price-high');
    expect(result.current.error).toBe(null);
  });
});