import React from "react";
import { useVehicleSearch } from "./hooks/useVehicleSearch";
import { SearchForm } from "./components/SearchForm";
import { FiltersSidebar } from "./components/FiltersSidebar";
import { VehicleGrid } from "./components/VehicleGrid";
import { ErrorMessage } from "./components/ErrorMessage";
import { THEME_COLOR } from "./constants";

function App() {
  const {
    zipCode,
    vehicles,
    filteredVehicles,
    filters,
    sortBy,
    isLoading,
    error,
    searchVehicles,
    updateFilters,
    updateSort,
    clearFilters,
    resetSearch,
  } = useVehicleSearch();

  const hasSearched = zipCode !== "";
  const showResults = hasSearched && !error && vehicles.length > 0;

  return (
    <div className="app">
      <SearchForm onSearch={searchVehicles} isLoading={isLoading} />

      {error && (
        <div className="container">
          <ErrorMessage message={error} onDismiss={() => searchVehicles("")} />
        </div>
      )}

      {showResults && (
        <div className="container">
          <div className="results-header">
            <h2 className="results-title">Vehicles in {zipCode}</h2>
            <button onClick={resetSearch} className="new-search-btn">
              New Search
            </button>
          </div>

          <div className="results-layout">
            <FiltersSidebar
              filters={filters}
              sortBy={sortBy}
              onFiltersChange={updateFilters}
              onSortChange={updateSort}
              onClearFilters={clearFilters}
              vehicleCount={filteredVehicles.length}
              totalCount={vehicles.length}
            />

            <main className="results-main">
              <VehicleGrid vehicles={filteredVehicles} isLoading={isLoading} />
            </main>
          </div>
        </div>
      )}

      <style>{`
        .app {
          min-height: 100vh;
          background: linear-gradient(to bottom, #f8fafc, #e2e8f0);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .results-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem 0 1rem 0;
          border-bottom: 1px solid #e2e8f0;
          margin-bottom: 2rem;
        }

        .results-title {
          margin: 0;
          font-size: 2rem;
          font-weight: 700;
          color: ${THEME_COLOR};
          background: linear-gradient(135deg, ${THEME_COLOR}, #2d4dd4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .new-search-btn {
          background: white;
          border: 2px solid ${THEME_COLOR};
          color: ${THEME_COLOR};
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .new-search-btn:hover {
          background: ${THEME_COLOR};
          color: white;
          transform: translateY(-1px);
          box-shadow: 0 4px 15px rgba(16, 19, 87, 0.2);
        }

        .results-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 2rem;
          align-items: start;
          padding-bottom: 4rem;
        }

        .results-main {
          min-height: 400px;
        }

        @media (max-width: 1024px) {
          .results-layout {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }

        @media (max-width: 768px) {
          .container {
            padding: 0 0.75rem;
          }

          .results-header {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
            padding: 1.5rem 0 1rem 0;
          }

          .results-title {
            font-size: 1.5rem;
            text-align: center;
          }

          .new-search-btn {
            align-self: center;
          }
        }
      `}</style>

      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background: #f8fafc;
          color: #1a202c;
          line-height: 1.6;
        }

        #root {
          min-height: 100vh;
        }

        h1, h2, h3, h4, h5, h6 {
          margin: 0;
          line-height: 1.2;
        }

        button {
          font-family: inherit;
        }

        input, select, textarea {
          font-family: inherit;
        }
      `}</style>
    </div>
  );
}

export default App;
