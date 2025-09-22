import React from "react";
import type { VehicleFilters, SortOption } from "../types/vehicle";
import { getAllMakes, getAllColors } from "@/data/vehicles";
import { SORT_OPTIONS, THEME_COLOR } from "@/constants";

interface FiltersSidebarProps {
  filters: VehicleFilters;
  sortBy: SortOption;
  onFiltersChange: (filters: Partial<VehicleFilters>) => void;
  onSortChange: (sort: SortOption) => void;
  onClearFilters: () => void;
  vehicleCount: number;
  totalCount: number;
}

export const FiltersSidebar: React.FC<FiltersSidebarProps> = ({
  filters,
  sortBy,
  onFiltersChange,
  onSortChange,
  onClearFilters,
  vehicleCount,
  totalCount,
}) => {
  const allMakes = getAllMakes();
  const allColors = getAllColors();

  const hasActiveFilters = filters.make !== "" || filters.color !== "";

  return (
    <aside className="filters-sidebar">
      <div className="filters-header">
        <h3>Filters & Sort</h3>
        {hasActiveFilters && (
          <button onClick={onClearFilters} className="clear-filters-btn">
            Clear All
          </button>
        )}
      </div>

      <div className="results-count">
        <span className="count-text">
          {vehicleCount} of {totalCount} vehicles
        </span>
      </div>

      {/* Sort Options */}
      <div className="filter-section">
        <h4 className="filter-title">Sort By</h4>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="sort-select"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Make Filter */}
      <div className="filter-section">
        <h4 className="filter-title">Make</h4>
        <select
          value={filters.make}
          onChange={(e) => onFiltersChange({ make: e.target.value })}
          className="filter-select"
        >
          <option value="">All Makes</option>
          {allMakes.map((make) => (
            <option key={make} value={make}>
              {make}
            </option>
          ))}
        </select>
      </div>

      {/* Color Filter */}
      <div className="filter-section">
        <h4 className="filter-title">Color</h4>
        <select
          value={filters.color}
          onChange={(e) => onFiltersChange({ color: e.target.value })}
          className="filter-select"
        >
          <option value="">All Colors</option>
          {allColors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>

      <style>{`
        .filters-sidebar {
          background: white;
          border-radius: 0.5rem;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          padding: 1.5rem;
          height: fit-content;
          position: sticky;
          top: 2rem;
        }

        .filters-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #f0f0f0;
        }

        .filters-header h3 {
          margin: 0;
          color: ${THEME_COLOR};
          font-size: 1.25rem;
          font-weight: 600;
        }

        .clear-filters-btn {
          background: none;
          border: 1px solid #e0e0e0;
          color: #666;
          padding: 0.25rem 0.75rem;
          border-radius: 0.25rem;
          cursor: pointer;
          font-size: 0.85rem;
          transition: all 0.3s ease;
        }

        .clear-filters-btn:hover {
          background: #f5f5f5;
          border-color: #ccc;
        }

        .results-count {
          margin-bottom: 1.5rem;
          padding: 0.75rem;
          background: linear-gradient(
            135deg,
            ${THEME_COLOR}10,
            ${THEME_COLOR}05
          );
          border-radius: 0.375rem;
          border-left: 3px solid ${THEME_COLOR};
        }

        .count-text {
          font-weight: 600;
          color: ${THEME_COLOR};
          font-size: 0.9rem;
        }

        .filter-section {
          margin-bottom: 1.5rem;
        }

        .filter-title {
          margin: 0 0 0.5rem 0;
          font-size: 1rem;
          font-weight: 600;
          color: #333;
        }

        .sort-select,
        .filter-select {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid #e0e0e0;
          border-radius: 0.375rem;
          background: white;
          font-size: 0.9rem;
          cursor: pointer;
          transition: border-color 0.3s ease;
        }

        .sort-select:focus,
        .filter-select:focus {
          outline: none;
          border-color: ${THEME_COLOR};
          box-shadow: 0 0 0 3px ${THEME_COLOR}20;
        }

        .sort-select:hover,
        .filter-select:hover {
          border-color: #ccc;
        }

        @media (max-width: 1024px) {
          .filters-sidebar {
            position: static;
            margin-bottom: 2rem;
          }
        }

        @media (max-width: 768px) {
          .filters-sidebar {
            padding: 1rem;
          }

          .filters-header {
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;
          }

          .clear-filters-btn {
            align-self: flex-end;
          }
        }
      `}</style>
    </aside>
  );
};
