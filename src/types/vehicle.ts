export interface Vehicle {
  id: string;
  make: string;
  model: string;
  trim: string;
  year: number;
  color: string;
  mileage: number;
  price: number;
  image: string;
}

export interface VehicleFilters {
  make: string;
  color: string;
}

export type SortOption = "price-high" | "price-low" | "year";

export interface SearchState {
  zipCode: string;
  vehicles: Vehicle[];
  filteredVehicles: Vehicle[];
  filters: VehicleFilters;
  sortBy: SortOption;
  isLoading: boolean;
  error: string | null;
}
