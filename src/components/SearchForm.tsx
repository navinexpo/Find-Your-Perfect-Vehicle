import React, { useState } from "react";
import { THEME_COLOR } from "../constants";

interface SearchFormProps {
  onSearch: (zipCode: string) => void;
  isLoading: boolean;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  onSearch,
  isLoading,
}) => {
  const [zipCode, setZipCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(zipCode);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Only allow digits
    if (value.length <= 5) {
      setZipCode(value);
    }
  };

  return (
    <div className="search-form-container">
      <div className="search-form-content">
        <h1 className="search-title">Find Your Perfect Vehicle</h1>
        <p className="search-subtitle">
          Enter your ZIP code to see available vehicles in your area
        </p>

        <form onSubmit={handleSubmit} className="search-form">
          <div className="input-group">
            <input
              type="text"
              value={zipCode}
              onChange={handleInputChange}
              placeholder="Enter ZIP code (e.g., 10001)"
              className="zip-input"
              disabled={isLoading}
              maxLength={5}
            />
            <button
              type="submit"
              disabled={isLoading || !zipCode}
              className="search-button"
            >
              {isLoading ? "Searching." : "Search Vehicles"}
            </button>
          </div>
        </form>

        <div className="example-zips">
          <p>Try these ZIP codes:</p>
          <div className="zip-examples">
            {["10001", "90210", "60601", "33101"].map((zip) => (
              <button
                key={zip}
                onClick={() => setZipCode(zip)}
                className="zip-example-btn"
                disabled={isLoading}
              >
                {zip}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .search-form-container {
          background: linear-gradient(135deg, ${THEME_COLOR} 0%, #1e1f5f 100%);
          padding: 1rem 1rem;
          text-align: center;
          color: white;
        }

        .search-form-content {
          max-width: 600px;
          margin: 0 auto;
        }

        .search-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          background: linear-gradient(45deg, #fff, #e0e0ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .search-subtitle {
          font-size: 1.1rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .search-form {
          margin-bottom: 2rem;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-width: 400px;
          margin: 0 auto;
        }

        .zip-input {
          padding: 1rem;
          font-size: 1.1rem;
          border: 2px solid transparent;
          border-radius: 0.5rem;
          outline: none;
          transition: border-color 0.3s ease;
          text-align: center;
          letter-spacing: 0.1em;
        }

        .zip-input:focus {
          border-color: #4f80ff;
          box-shadow: 0 0 0 3px rgba(79, 128, 255, 0.1);
        }

        .zip-input:disabled {
          opacity: 0.7;
          background-color: #f5f5f5;
        }

        .search-button {
          padding: 1rem 2rem;
          font-size: 1.0rem;
          font-weight: 600;
          background: linear-gradient(45deg, #4f80ff, #6b9bff);
          color: white;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .search-button:hover:not(:disabled) {
          background: linear-gradient(45deg, #3d6bef, #5a8cff);
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(79, 128, 255, 0.3);
        }

        .search-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .example-zips {
          opacity: 0.8;
        }

        .example-zips p {
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }

        .zip-examples {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .zip-example-btn {
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 0.25rem;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: monospace;
        }

        .zip-example-btn:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-1px);
        }

        .zip-example-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media (min-width: 768px) {
          .input-group {
            flex-direction: row;
            align-items: stretch;
          }

          .zip-input {
            flex: 1;
            text-align: left;
          }

          .search-button {
            width: auto;
            min-width: 150px;
          }
        }
      `}</style>
    </div>
  );
};
