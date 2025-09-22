import React from "react";
import type { Vehicle } from "../types/vehicle";
import { VehicleCard } from "./VehicleCard";

interface VehicleGridProps {
  vehicles: Vehicle[];
  isLoading: boolean;
}

export const VehicleGrid: React.FC<VehicleGridProps> = ({
  vehicles,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Searching for vehicles...</p>

        <style>{`
          .loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 4rem 2rem;
            text-align: center;
          }

          .loading-spinner {
            width: 50px;
            height: 50px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #101357;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 1rem;
          }

          .loading-text {
            color: #666;
            font-size: 1.1rem;
            margin: 0;
          }

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  if (vehicles.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🚗</div>
        <h3 className="empty-title">No vehicles found</h3>
        <p className="empty-description">
          Try adjusting your filters or search in a different area.
        </p>

        <style>{`
          .empty-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 4rem 2rem;
            text-align: center;
            background: white;
            border-radius: 0.75rem;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          }

          .empty-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
            opacity: 0.5;
          }

          .empty-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: #333;
            margin: 0 0 0.5rem 0;
          }

          .empty-description {
            color: #666;
            font-size: 1rem;
            margin: 0;
            max-width: 400px;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="vehicle-grid">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}

      <style>{`
        .vehicle-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
          padding: 0;
        }

        @media (max-width: 768px) {
          .vehicle-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }

        @media (min-width: 1400px) {
          .vehicle-grid {
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          }
        }
      `}</style>
    </div>
  );
};
