import React, { useState } from "react";
import type { VehicleFilters, SortOption } from "../types/vehicle";
import { getAllMakes, getAllColors } from "@/data/vehicles";
import { SORT_OPTIONS, THEME_COLOR } from "@/constants";

import type { Vehicle } from "../types/vehicle";

interface FiltersSidebarProps {
  filters: VehicleFilters;
  sortBy: SortOption;
  onFiltersChange: (filters: Partial<VehicleFilters>) => void;
  onSortChange: (sort: SortOption) => void;
  onClearFilters: () => void;
  vehicleCount: number;
  totalCount: number;
  allVehicles: Vehicle[];
}

export const FiltersSidebar: React.FC<FiltersSidebarProps> = ({
  filters,
  sortBy,
  onFiltersChange,
  onSortChange,
  onClearFilters,
  vehicleCount,
  totalCount,
  allVehicles,
}) => {
  // Placeholder body types and price ranges
  const bodyTypes = [
    "Sedan",
    "SUV",
    "Truck",
    "Coupe",
    "Convertible",
    "Wagon",
    "Van",
    "Other",
  ];
  const priceRanges = [
    { label: "Under $30,000", value: "under-30k" },
    { label: "$30,000 - $60,000", value: "30k-60k" },
    { label: "$60,000+", value: "over-60k" },
  ];

  const allMakes = getAllMakes();
  const allColors = getAllColors();

  // Count helpers
  const countBy = (key: keyof Vehicle, value: string) =>
    allVehicles.filter((v: Vehicle) => v[key] === value).length;
  const countByPrice = (range: string) =>
    allVehicles.filter((v: Vehicle) => {
      if (range === "under-30k") return v.price < 30000;
      if (range === "30k-60k") return v.price >= 30000 && v.price <= 60000;
      if (range === "over-60k") return v.price > 60000;
      return true;
    }).length;

  const hasActiveFilters = !!(
    filters.make ||
    filters.color ||
    filters.bodyType ||
    filters.priceRange
  );

  // Collapsible state for filter groups
  const [openGroups, setOpenGroups] = useState<{ [key: string]: boolean }>({
    bodyType: true,
    price: true,
    make: true,
    color: true,
  });

  const toggleGroup = (group: string) => {
    setOpenGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  // Helper for filter chips
  const filterChips: {
    label: string;
    key: keyof VehicleFilters;
    value: string;
  }[] = [];
  if (filters.make)
    filterChips.push({ label: filters.make, key: "make", value: filters.make });
  if (filters.color)
    filterChips.push({
      label: filters.color,
      key: "color",
      value: filters.color,
    });
  if (filters.bodyType)
    filterChips.push({
      label: filters.bodyType,
      key: "bodyType",
      value: filters.bodyType,
    });
  if (filters.priceRange) {
    const priceLabel =
      priceRanges.find((r) => r.value === filters.priceRange)?.label ||
      filters.priceRange;
    filterChips.push({
      label: priceLabel,
      key: "priceRange",
      value: filters.priceRange,
    });
  }

  return (
    <aside
      className="filters-sidebar"
      role="complementary"
      aria-label="Vehicle filters sidebar"
    >
      <div
        className="filters-header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <h3 id="filters-sort-heading" style={{ margin: 0 }}>
            Filters{filterChips.length > 0 ? ` (${filterChips.length})` : ""}
          </h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="clear-filters-btn"
            aria-label="Clear all filters"
            style={{
              color: "#5f2eea",
              background: "none",
              border: "none",
              fontWeight: 600,
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Clear all
          </button>
        )}
      </div>

      {/* Filter chips row */}
      {filterChips.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            margin: "1rem 0 0.5rem 0",
          }}
        >
          {filterChips.map((chip) => (
            <span
              key={chip.key}
              style={{
                display: "flex",
                alignItems: "center",
                background: "#f4f4f6",
                borderRadius: "2rem",
                padding: "0.4rem 1rem",
                fontWeight: 500,
                fontSize: "1rem",
                color: "#232536",
              }}
            >
              {chip.label}
              <button
                aria-label={`Remove ${chip.label} filter`}
                style={{
                  marginLeft: 8,
                  background: "none",
                  border: "none",
                  color: "#232536",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  cursor: "pointer",
                }}
                onClick={() => onFiltersChange({ [chip.key]: "" })}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="results-count">
        <span className="count-text">
          {vehicleCount} of {totalCount} vehicles
        </span>
      </div>

      {/* Sort Options */}
      <div
        className="filter-section"
        role="region"
        aria-labelledby="filters-sort-heading"
      >
        <h4 className="filter-title" id="sort-label">
          Sort By
        </h4>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="sort-select"
          aria-labelledby="sort-label"
        >
          {SORT_OPTIONS.map((option: { value: string; label: string }) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Body Type Filter (interactive) */}
      <div
        className="filter-section"
        role="region"
        aria-label="Body type filter"
      >
        <button
          className="filter-group-header"
          onClick={() => toggleGroup("bodyType")}
          aria-expanded={openGroups.bodyType}
          aria-controls="body-type-options"
        >
          Body Type <span>{openGroups.bodyType ? "▲" : "▼"}</span>
        </button>
        {openGroups.bodyType && (
          <div className="filter-options" id="body-type-options">
            <label className="custom-checkbox">
              <input
                type="checkbox"
                checked={!filters.bodyType}
                onChange={() => onFiltersChange({ bodyType: "" })}
                aria-label="All body types"
              />
              <span className="checkmark"></span>
              All Body Types{" "}
              <span className="filter-count">({allVehicles.length})</span>
            </label>
            {bodyTypes.map((type: string) => (
              <label key={type} className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={filters.bodyType === type}
                  onChange={() => onFiltersChange({ bodyType: type })}
                  aria-label={type}
                />
                <span className="checkmark"></span>
                {type} <span className="filter-count">(0)</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Filter (interactive) */}
      <div
        className="filter-section"
        role="region"
        aria-label="Price range filter"
      >
        <button
          className="filter-group-header"
          onClick={() => toggleGroup("price")}
          aria-expanded={openGroups.price}
          aria-controls="price-options"
        >
          Price Range <span>{openGroups.price ? "▲" : "▼"}</span>
        </button>
        {openGroups.price && (
          <div className="filter-options" id="price-options">
            <label className="custom-checkbox">
              <input
                type="checkbox"
                checked={!filters.priceRange}
                onChange={() => onFiltersChange({ priceRange: "" })}
                aria-label="All price ranges"
              />
              <span className="checkmark"></span>
              All Prices{" "}
              <span className="filter-count">({allVehicles.length})</span>
            </label>
            {priceRanges.map((range: { label: string; value: string }) => (
              <label key={range.value} className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={filters.priceRange === range.value}
                  onChange={() => onFiltersChange({ priceRange: range.value })}
                  aria-label={range.label}
                />
                <span className="checkmark"></span>
                {range.label}{" "}
                <span className="filter-count">
                  ({countByPrice(range.value)})
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Make Filter (custom checkboxes) */}
      <div className="filter-section" role="region" aria-label="Make filter">
        <button
          className="filter-group-header"
          onClick={() => toggleGroup("make")}
          aria-expanded={openGroups.make}
          aria-controls="make-options"
        >
          Make <span>{openGroups.make ? "▲" : "▼"}</span>
        </button>
        {openGroups.make && (
          <div className="filter-options" id="make-options">
            <label className="custom-checkbox">
              <input
                type="checkbox"
                checked={filters.make === ""}
                onChange={() => onFiltersChange({ make: "" })}
                aria-label="All makes"
              />
              <span className="checkmark"></span>
              All Makes{" "}
              <span className="filter-count">({allVehicles.length})</span>
            </label>
            {allMakes.map((make: string) => (
              <label key={make} className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={filters.make === make}
                  onChange={() => onFiltersChange({ make })}
                  aria-label={make}
                />
                <span className="checkmark"></span>
                {make}{" "}
                <span className="filter-count">({countBy("make", make)})</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Color Filter (custom checkboxes) */}
      <div className="filter-section" role="region" aria-label="Color filter">
        <button
          className="filter-group-header"
          onClick={() => toggleGroup("color")}
          aria-expanded={openGroups.color}
          aria-controls="color-options"
        >
          Color <span>{openGroups.color ? "▲" : "▼"}</span>
        </button>
        {openGroups.color && (
          <div className="filter-options" id="color-options">
            <label className="custom-checkbox">
              <input
                type="checkbox"
                checked={filters.color === ""}
                onChange={() => onFiltersChange({ color: "" })}
                aria-label="All colors"
              />
              <span className="checkmark"></span>
              All Colors{" "}
              <span className="filter-count">({allVehicles.length})</span>
            </label>
            {allColors.map((color: string) => (
              <label key={color} className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={filters.color === color}
                  onChange={() => onFiltersChange({ color })}
                  aria-label={color}
                />
                <span className="checkmark"></span>
                {color}{" "}
                <span className="filter-count">
                  ({countBy("color", color)})
                </span>
              </label>
            ))}
          </div>
        )}
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

        .filter-group-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 1.1rem;
          font-weight: 600;
          color: #23243a;
          background: none;
          border: none;
          width: 100%;
          padding: 0.5rem 0;
          cursor: pointer;
          margin-bottom: 0.5rem;
          transition: color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .filter-group-header:hover, .filter-group-header:focus {
          color: #2d4dd4;
          background: #f5f7ff;
          box-shadow: 0 2px 8px rgba(44, 62, 80, 0.07);
        }

        .filter-options {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1rem;
          opacity: 1;
          animation: fadeInFilterOptions 0.4s cubic-bezier(.4,1.4,.6,1);
        }
        @keyframes fadeInFilterOptions {
          from { opacity: 0; transform: translateY(-12px); }
          to { opacity: 1; transform: none; }
        }

        .custom-checkbox input[type="checkbox"] {
          margin-right: 0.5rem;
          accent-color: #2d4dd4;
          transition: box-shadow 0.2s, outline 0.2s;
        }
        .custom-checkbox input[type="checkbox"]:focus + .checkmark {
          outline: 2px solid #2d4dd4;
          box-shadow: 0 0 0 2px #c2d0f7;
        }
        .checkmark {
          display: inline-block;
          width: 1.1em;
          height: 1.1em;
          border-radius: 0.25em;
          border: 2px solid #bbb;
          background: #fff;
          margin-right: 0.5em;
          vertical-align: middle;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .custom-checkbox input[type="checkbox"]:checked + .checkmark {
          border-color: #2d4dd4;
          background: #e0e0f7;
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
