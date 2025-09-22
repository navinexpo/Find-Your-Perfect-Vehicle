import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { VehicleCard } from "../components/VehicleCard";
import type { Vehicle } from "../types/vehicle";

const mockVehicle: Vehicle = {
  id: "1",
  make: "Tesla",
  model: "Model 3",
  trim: "Standard Range Plus",
  year: 2022,
  color: "Pearl White",
  mileage: 15000,
  price: 45000,
  image: "https://example.com/tesla.jpg",
};

describe("VehicleCard", () => {
  test("renders vehicle information correctly", () => {
    render(<VehicleCard vehicle={mockVehicle} />);

    expect(screen.getByText("Tesla Model 3")).toBeInTheDocument();
    expect(screen.getByText("Standard Range Plus")).toBeInTheDocument();
    expect(screen.getByText("2022")).toBeInTheDocument();
    expect(screen.getByText("Pearl White")).toBeInTheDocument();
    expect(screen.getByText("15,000 miles")).toBeInTheDocument();
    expect(screen.getByText("$45,000")).toBeInTheDocument();
  });

  test("renders vehicle image with correct alt text", () => {
    render(<VehicleCard vehicle={mockVehicle} />);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", mockVehicle.image);
    expect(image).toHaveAttribute("alt", "2022 Tesla Model 3");
  });

  test("handles image error by showing placeholder", () => {
    render(<VehicleCard vehicle={mockVehicle} />);

    const image = screen.getByRole("img");
    fireEvent.error(image);

    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining("placeholder")
    );
    expect(image.getAttribute("src")).toContain("Tesla+Model 3");
  });

  test("renders view details button", () => {
    render(<VehicleCard vehicle={mockVehicle} />);

    const button = screen.getByRole("button", { name: /view details/i });
    expect(button).toBeInTheDocument();
  });

  test("displays year badge", () => {
    render(<VehicleCard vehicle={mockVehicle} />);

    // Year should appear in badge (in addition to title)
    const yearElements = screen.getAllByText("2022");
    expect(yearElements.length).toBeGreaterThan(0);
  });

  test("formats mileage and price correctly", () => {
    const highMileageVehicle: Vehicle = {
      ...mockVehicle,
      mileage: 125000,
      price: 1250000,
    };

    render(<VehicleCard vehicle={highMileageVehicle} />);

    expect(screen.getByText("125,000 miles")).toBeInTheDocument();
    expect(screen.getByText("$1,250,000")).toBeInTheDocument();
  });
});
