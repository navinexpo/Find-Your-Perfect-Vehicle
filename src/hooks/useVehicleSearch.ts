import { useState, useCallback, useMemo } from "react";
import type {
  Vehicle,
  VehicleFilters,
  SortOption,
  SearchState,
} from "../types/vehicle";
import { vehicleDatabase } from "@/data/vehicles";
import { isValidZipCode } from "@/utils/validation";
import { ERROR_MESSAGES } from "@/constants";

const initialFilters: VehicleFilters = {
  make: "",
  color: "",
  bodyType: "",
  priceRange: "",
};

const initialState: SearchState = {
  zipCode: "",
  vehicles: [],
  filteredVehicles: [],
  filters: initialFilters,
  sortBy: "price-high",
  isLoading: false,
  error: null,
};

export const useVehicleSearch = () => {
  const [state, setState] = useState<SearchState>(initialState);

  // Search vehicles by ZIP code
  const searchVehicles = useCallback((zipCode: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    // Simulate API delay
    setTimeout(() => {
      if (!zipCode.trim()) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: ERROR_MESSAGES.EMPTY_ZIP,
          vehicles: [],
          filteredVehicles: [],
        }));
        return;
      }

      if (!isValidZipCode(zipCode)) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: ERROR_MESSAGES.INVALID_ZIP,
          vehicles: [],
          filteredVehicles: [],
        }));
        return;
      }

      const vehicles = vehicleDatabase[zipCode] || [];

      if (vehicles.length === 0) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: ERROR_MESSAGES.NO_VEHICLES,
          vehicles: [],
          filteredVehicles: [],
          zipCode,
        }));
        return;
      }

      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: null,
        vehicles,
        filteredVehicles: vehicles,
        zipCode,
      }));
    }, 500);
  }, []);

  // Apply filters and sorting
  const filteredAndSortedVehicles = useMemo(() => {
    let filtered = [...state.vehicles];

    // Apply filters
    if (state.filters.make) {
      filtered = filtered.filter(
        (vehicle) => vehicle.make === state.filters.make
      );
    }
    if (state.filters.color) {
      filtered = filtered.filter(
        (vehicle) => vehicle.color === state.filters.color
      );
    }
    // Body type filter (placeholder, as data does not have bodyType)
    if (state.filters.bodyType) {
      // filtered = filtered.filter((vehicle) => vehicle.bodyType === state.filters.bodyType);
    }
    // Price range filter
    if (state.filters.priceRange) {
      filtered = filtered.filter((vehicle) => {
        const price = vehicle.price;
        if (state.filters.priceRange === "under-30k") return price < 30000;
        if (state.filters.priceRange === "30k-60k")
          return price >= 30000 && price <= 60000;
        if (state.filters.priceRange === "over-60k") return price > 60000;
        return true;
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (state.sortBy) {
        case "price-high":
          return b.price - a.price;
        case "price-low":
          return a.price - b.price;
        case "year":
          return b.year - a.year;
        default:
          return 0;
      }
    });

    return filtered;
  }, [state.vehicles, state.filters, state.sortBy]);

  // Update filters
  const updateFilters = useCallback((newFilters: Partial<VehicleFilters>) => {
    setState((prev) => ({
      ...prev,
      filters: { ...prev.filters, ...newFilters },
    }));
  }, []);

  // Update sort option
  const updateSort = useCallback((sortBy: SortOption) => {
    setState((prev) => ({ ...prev, sortBy }));
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setState((prev) => ({ ...prev, filters: initialFilters }));
  }, []);

  // Reset search
  const resetSearch = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    ...state,
    filteredVehicles: filteredAndSortedVehicles,
    searchVehicles,
    updateFilters,
    updateSort,
    clearFilters,
    resetSearch,
  };
};
