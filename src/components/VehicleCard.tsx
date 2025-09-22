import React from "react";
import type { Vehicle } from "../types/vehicle";
import { formatCurrency, formatMileage } from "@/utils/validation";
import { THEME_COLOR } from "@/constants";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    if (!target.src.includes('via.placeholder.com')) {
      target.src = `https://via.placeholder.com/400x300/f0f0f0/666666?text=${encodeURIComponent(vehicle.make + ' ' + vehicle.model)}`;
    }
  };

  return (
    <div className="vehicle-card">
      <div className="vehicle-image-container">
        <img
          src={vehicle.image}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          className="vehicle-image"
          onError={handleImageError}
        />
        <div className="vehicle-year-badge">{vehicle.year}</div>
      </div>

      <div className="vehicle-details">
        <div className="vehicle-header">
          <h3 className="vehicle-title">
            {vehicle.make} {vehicle.model}
          </h3>
          <span className="vehicle-trim">{vehicle.trim}</span>
        </div>

        <div className="vehicle-specs">
          <div className="spec-item">
            <span className="spec-label">Color:</span>
            <span className="spec-value">{vehicle.color}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Mileage:</span>
            <span className="spec-value">
              {formatMileage(vehicle.mileage)} miles
            </span>
          </div>
        </div>

        <div className="vehicle-footer">
          <div className="vehicle-price">{formatCurrency(vehicle.price)}</div>
          <button className="view-details-btn">View Details</button>
        </div>
      </div>

      <style>{`
        .vehicle-card {
          background: white;
          border-radius: 0.75rem;
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          transition: all 0.3s ease;
          border: 1px solid #f0f0f0;
        }

        .vehicle-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          border-color: ${THEME_COLOR}20;
        }

        .vehicle-image-container {
          position: relative;
          width: 100%;
          height: 200px;
          overflow: hidden;
        }

        .vehicle-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .vehicle-card:hover .vehicle-image {
          transform: scale(1.05);
        }

        .vehicle-year-badge {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          background: ${THEME_COLOR};
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .vehicle-details {
          padding: 1.5rem;
        }

        .vehicle-header {
          margin-bottom: 1rem;
        }

        .vehicle-title {
          margin: 0 0 0.25rem 0;
          font-size: 1.25rem;
          font-weight: 700;
          color: #1a1a1a;
        }

        .vehicle-trim {
          color: #666;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .vehicle-specs {
          margin-bottom: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .spec-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .spec-label {
          color: #666;
          font-size: 0.9rem;
        }

        .spec-value {
          font-weight: 600;
          color: #1a1a1a;
          font-size: 0.9rem;
        }

        .vehicle-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1rem;
          border-top: 1px solid #f0f0f0;
        }

        .vehicle-price {
          font-size: 1.5rem;
          font-weight: 700;
          color: ${THEME_COLOR};
        }

        .view-details-btn {
          background: linear-gradient(135deg, ${THEME_COLOR}, ${THEME_COLOR}dd);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }

        .view-details-btn:hover {
          background: linear-gradient(
            135deg,
            ${THEME_COLOR}dd,
            ${THEME_COLOR}bb
          );
          transform: translateY(-1px);
          box-shadow: 0 4px 15px rgba(16, 19, 87, 0.3);
        }

        @media (max-width: 480px) {
          .vehicle-details {
            padding: 1rem;
          }

          .vehicle-footer {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }

          .view-details-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};
