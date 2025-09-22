import type { Vehicle } from "../types/vehicle";

// Sample vehicle data for different ZIP codes
export const vehicleDatabase: Record<string, Vehicle[]> = {
  "10001": [
    {
      id: "1",
      make: "Tesla",
      model: "Model 3",
      trim: "Standard Range Plus",
      year: 2022,
      color: "Pearl White",
      mileage: 15000,
      price: 45000,
      image:
        "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop",
    },
    {
      id: "2",
      make: "BMW",
      model: "X5",
      trim: "xDrive40i",
      year: 2023,
      color: "Jet Black",
      mileage: 8000,
      price: 65000,
      image:
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
    },
    {
      id: "3",
      make: "Audi",
      model: "A4",
      trim: "Premium Plus",
      year: 2021,
      color: "Glacier White",
      mileage: 25000,
      price: 38000,
      image:
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop",
    },
    {
      id: "4",
      make: "Mercedes-Benz",
      model: "C-Class",
      trim: "C300",
      year: 2023,
      color: "Polar White",
      mileage: 5000,
      price: 52000,
      image:
        "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop",
    },
    {
      id: "5",
      make: "Toyota",
      model: "Camry",
      trim: "XLE",
      year: 2022,
      color: "Midnight Black",
      mileage: 18000,
      price: 32000,
      image:
        "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop",
    },
  ],
  "90210": [
    {
      id: "6",
      make: "Porsche",
      model: "911",
      trim: "Carrera",
      year: 2023,
      color: "Guards Red",
      mileage: 2000,
      price: 125000,
      image:
        "https://images.unsplash.com/photo-1544829099-b9a0c5303bea?w=400&h=300&fit=crop",
    },
    {
      id: "7",
      make: "Lamborghini",
      model: "Huracan",
      trim: "EVO",
      year: 2022,
      color: "Arancio Borealis",
      mileage: 3500,
      price: 275000,
      image:
        "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop",
    },
    {
      id: "8",
      make: "Ferrari",
      model: "F8 Tributo",
      trim: "Base",
      year: 2021,
      color: "Rosso Corsa",
      mileage: 4200,
      price: 295000,
      image:
        "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop",
    },
  ],
  "60601": [
    {
      id: "9",
      make: "Ford",
      model: "F-150",
      trim: "Lariat",
      year: 2022,
      color: "Oxford White",
      mileage: 22000,
      price: 48000,
      image:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
    },
    {
      id: "10",
      make: "Chevrolet",
      model: "Silverado",
      trim: "LT",
      year: 2021,
      color: "Summit White",
      mileage: 35000,
      price: 42000,
      image:
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop",
    },
    {
      id: "11",
      make: "Honda",
      model: "Civic",
      trim: "Sport",
      year: 2023,
      color: "Sonic Gray",
      mileage: 8500,
      price: 28000,
      image:
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop",
    },
    {
      id: "12",
      make: "Nissan",
      model: "Altima",
      trim: "SV",
      year: 2022,
      color: "Pearl White",
      mileage: 16000,
      price: 29000,
      image:
        "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop",
    },
  ],
  "33101": [
    {
      id: "13",
      make: "McLaren",
      model: "720S",
      trim: "Performance",
      year: 2022,
      color: "Papaya Orange",
      mileage: 1800,
      price: 315000,
      image:
        "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop",
    },
    {
      id: "14",
      make: "Bentley",
      model: "Continental GT",
      trim: "V8",
      year: 2023,
      color: "Beluga",
      mileage: 3200,
      price: 245000,
      image:
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
    },
    {
      id: "15",
      make: "Rolls-Royce",
      model: "Ghost",
      trim: "Standard",
      year: 2021,
      color: "Arctic White",
      mileage: 5500,
      price: 385000,
      image:
        "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop",
    },
  ],
};

// Get all unique makes for filtering
export const getAllMakes = (): string[] => {
  const makes = new Set<string>();
  Object.values(vehicleDatabase).forEach((vehicles) => {
    vehicles.forEach((vehicle) => makes.add(vehicle.make));
  });
  return Array.from(makes).sort();
};

// Get all unique colors for filtering
export const getAllColors = (): string[] => {
  const colors = new Set<string>();
  Object.values(vehicleDatabase).forEach((vehicles) => {
    vehicles.forEach((vehicle) => colors.add(vehicle.color));
  });
  return Array.from(colors).sort();
};
