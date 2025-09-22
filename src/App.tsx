import React from "react";
import { useVehicleSearch } from "./hooks/useVehicleSearch";
import { SearchForm } from "./components/SearchForm";
import { FiltersSidebar } from "./components/FiltersSidebar";
import { VehicleGrid } from "./components/VehicleGrid";
import { ErrorMessage } from "./components/ErrorMessage";

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
      {/* Modern Header */}
      <header
        className="main-header"
        role="banner"
        aria-label="Main site header"
      >
        <div className="header-content">
          <img src="/vite.svg" alt="Flexcar Logo" className="header-logo" />
          <nav className="header-nav" aria-label="Main navigation">
            <a
              href="#"
              className="header-link active"
              aria-current="page"
              tabIndex={0}
            >
              Inventory
            </a>
            <a href="#" className="header-link" tabIndex={0}>
              How it Works
            </a>
            <a href="#" className="header-link" tabIndex={0}>
              About
            </a>
          </nav>
          <button className="header-cta" aria-label="Sign up for Flexcar">
            Sign Up
          </button>
        </div>
      </header>

      <SearchForm onSearch={searchVehicles} isLoading={isLoading} />

      {error && (
        <div className="container">
          <ErrorMessage message={error} onDismiss={() => searchVehicles("")} />
        </div>
      )}

      {showResults && (
        <div className="container">
          <div
            className="results-header"
            role="region"
            aria-label="Search results header"
          >
            <h2 className="results-title">Vehicles in {zipCode}</h2>
            <button
              onClick={resetSearch}
              className="new-search-btn"
              aria-label="Start a new search"
            >
              New Search
            </button>
          </div>

          {/* Filter Chips */}
          <div
            className="filter-chips-row"
            aria-label="Active filters"
            role="list"
          >
            {filters.make && (
              <span className="filter-chip" role="listitem">
                {filters.make}
              </span>
            )}
            {filters.color && (
              <span className="filter-chip" role="listitem">
                {filters.color}
              </span>
            )}
            {filters.bodyType && (
              <span className="filter-chip" role="listitem">
                {filters.bodyType}
              </span>
            )}
            {filters.priceRange && (
              <span className="filter-chip" role="listitem">
                {filters.priceRange}
              </span>
            )}
          </div>

          {/* Top Banner */}
          <div
            className="top-banner"
            role="region"
            aria-label="Promotional banner"
          >
            <div>
              <span className="banner-title">Luxury Unleashed</span>
              <div className="banner-desc">
                Drive the best, pay less. Explore our premium fleet.
              </div>
            </div>
            <button
              className="banner-btn"
              aria-label="Learn more about Flexcar"
            >
              Learn more
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
              allVehicles={vehicles}
            />

            <main className="results-main" aria-label="Vehicle results">
              {/* Info Card */}
              <div
                className="info-card"
                role="region"
                aria-label="Flexcar affordable info"
              >
                <div className="info-title">FLEXCAR Affordable</div>
                <div className="info-icons-row">
                  <div className="info-icon-block">
                    <div className="info-emoji" aria-hidden="true">
                      💸
                    </div>
                    <div className="info-label">20% lower car payment</div>
                  </div>
                  <div className="info-icon-block">
                    <div className="info-emoji" aria-hidden="true">
                      🛡️
                    </div>
                    <div className="info-label">Insurance included</div>
                  </div>
                  <div className="info-icon-block">
                    <div className="info-emoji" aria-hidden="true">
                      🔧
                    </div>
                    <div className="info-label">Maintenance covered</div>
                  </div>
                </div>
                <div className="info-footnote">
                  Zero down payment • Roadside included
                </div>
              </div>

              {/* Video Card */}
              <div
                className="video-card"
                role="region"
                aria-label="Flexcar video"
              >
                <div className="video-title">Flexcar in 75 seconds.</div>
                <div className="video-desc">
                  Once you Flex, you'll never buy a car again.
                </div>
                <video
                  width="100%"
                  height="180"
                  controls
                  className="video-player"
                  aria-label="Flexcar introduction video"
                >
                  <source
                    src="https://www.w3schools.com/html/mov_bbb.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>

              <VehicleGrid vehicles={filteredVehicles} isLoading={isLoading} />
            </main>
          </div>
        </div>
      )}

      <style>{`
        body {
          background: #f8fafc;
          color: #1a202c;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
          margin: 0;
          padding: 0;
        }

        .main-header {
          background: #fff;
          box-shadow: 0 2px 16px rgba(44, 62, 80, 0.07);
          padding: 0.5rem 0;
          margin-bottom: 2rem;
        }
        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }
        .header-logo {
          height: 48px;
        }
        .header-nav {
          display: flex;
          gap: 2rem;
        }
        .header-link {
          color: #23243a;
          font-weight: 500;
          text-decoration: none;
          font-size: 1.1rem;
          opacity: 0.85;
          transition: color 0.2s, box-shadow 0.2s;
        }
        .header-link.active, .header-link:hover {
          color: #2d4dd4;
          opacity: 1;
          box-shadow: 0 2px 0 #2d4dd4;
        }
        .header-cta {
          background: #2d4dd4;
          color: #fff;
          border: none;
          border-radius: 0.5rem;
          padding: 0.7rem 2rem;
          font-weight: 600;
          font-size: 1.1rem;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(44, 62, 80, 0.08);
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .header-cta:hover {
          background: #23243a;
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 6px 18px rgba(44, 62, 80, 0.13);
        }

        .filter-chips-row {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        .filter-chip {
          background: #e0e0f7;
          color: #23243a;
          border-radius: 1rem;
          padding: 0.4rem 1.1rem;
          font-size: 0.98rem;
          font-weight: 500;
          box-shadow: 0 1px 4px rgba(44, 62, 80, 0.07);
          transition: background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.2s;
        }
        .filter-chip:hover, .filter-chip:focus {
          background: #c2d0f7;
          color: #23243a;
          box-shadow: 0 2px 8px rgba(44, 62, 80, 0.13);
          transform: scale(1.05);
        }

        .top-banner {
          background: linear-gradient(90deg, #e0e0f7 0%, #c2d0f7 100%);
          border-radius: 1.5rem;
          padding: 2rem 2.5rem;
          margin: 2rem 0 2.5rem 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
          min-height: 120px;
          opacity: 0;
          animation: fadeInBanner 0.7s 0.1s ease-out forwards;
        }
        @keyframes fadeInBanner {
          from { opacity: 0; transform: translateY(-24px); }
          to { opacity: 1; transform: none; }
        }
        .banner-title {
          font-weight: 700;
          font-size: 2rem;
          color: #23243a;
        }
        .banner-desc {
          margin-top: 8px;
          font-size: 1.1rem;
          color: #444;
        }
        .banner-btn {
          background: #23243a;
          color: #fff;
          border: none;
          border-radius: 0.75rem;
          padding: 0.9rem 2.2rem;
          font-weight: 600;
          font-size: 1.1rem;
          cursor: pointer;
        }
        .banner-btn:hover {
          background: #2d4dd4;
        }

        .info-card {
          background: #fff;
          border: 2px solid #e0e0f7;
          border-radius: 1.25rem;
          padding: 2rem 2.5rem;
          margin-bottom: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          max-width: 480px;
          margin-left: auto;
          margin-right: auto;
          opacity: 0;
          animation: fadeInCard 0.7s 0.3s cubic-bezier(.4,1.4,.6,1) forwards;
        }
        @keyframes fadeInCard {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: none; }
        }
        .info-title {
          font-weight: 700;
          font-size: 1.5rem;
          color: #23243a;
          margin-bottom: 8px;
        }
        .info-icons-row {
          display: flex;
          gap: 32px;
          margin-bottom: 12px;
        }
        .info-icon-block {
          text-align: center;
        }
        .info-emoji {
          font-size: 32px;
        }
        .info-label {
          font-size: 14px;
          color: #444;
        }
        .info-footnote {
          font-size: 14px;
          color: #888;
        }

        .video-card {
          background: #23243a;
          color: #fff;
          border-radius: 1.25rem;
          padding: 1.5rem 2rem;
          margin-bottom: 2rem;
          box-shadow: 0 2px 12px rgba(0,0,0,0.10);
          max-width: 480px;
          margin-left: auto;
          margin-right: auto;
          opacity: 0;
          animation: fadeInCard 0.7s 0.5s cubic-bezier(.4,1.4,.6,1) forwards;
        }
        .video-title {
          font-weight: 700;
          font-size: 1.2rem;
          margin-bottom: 8px;
        }
        .video-desc {
          font-size: 15px;
          margin-bottom: 12px;
        }
        .video-player {
          border-radius: 12px;
          background: #111;
        }

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
          color: #2d4dd4;
          background: linear-gradient(135deg, #2d4dd4, #23243a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .new-search-btn {
          background: white;
          border: 2px solid #2d4dd4;
          color: #2d4dd4;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(.4,1.4,.6,1), box-shadow 0.2s;
        }
        .new-search-btn:hover, .new-search-btn:focus {
          background: #2d4dd4;
          color: white;
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 6px 18px rgba(16, 19, 87, 0.18);
        }
        .results-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 2rem;
          align-items: start;
          padding-bottom: 4rem;
          transition: gap 0.3s;
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
          .main-header {
            padding: 0.5rem 0.5rem;
          }
          .header-content {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }
          .header-nav {
            justify-content: center;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
