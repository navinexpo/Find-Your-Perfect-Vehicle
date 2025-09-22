import type { SortOption } from "../types/vehicle";

export const THEME_COLOR = "#101357";

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "price-high", label: "Price: High to Low" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "year", label: "Year (Newest First)" },
];

export const ERROR_MESSAGES = {
  INVALID_ZIP: "Please enter a valid 5-digit ZIP code (e.g., 12345)",
  EMPTY_ZIP: "ZIP code is required",
  NO_VEHICLES: "No vehicles found for this ZIP code",
  GENERIC_ERROR: "An error occurred while searching for vehicles",
} as const;
