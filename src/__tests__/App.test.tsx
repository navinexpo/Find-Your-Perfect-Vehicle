import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("App", () => {
  test("renders search form initially", () => {
    render(<App />);
    expect(screen.getByText("Find Your Perfect Vehicle")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter zip code/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /search vehicles/i })
    ).toBeInTheDocument();
  });

  test("shows error for invalid ZIP code", async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/enter zip code/i);
    const button = screen.getByRole("button", { name: /search vehicles/i });

    await user.type(input, "123");
    await user.click(button);

    await waitFor(() => {
      expect(
        screen.getByText(/please enter a valid 5-digit zip code/i)
      ).toBeInTheDocument();
    });
  });

  test("shows error for empty ZIP code", async () => {
    const user = userEvent.setup();
    render(<App />);

    const button = screen.getByRole("button", { name: /search vehicles/i });
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText(/zip code is required/i)).toBeInTheDocument();
    });
  });

  test("shows no vehicles found message for non-existent ZIP", async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/enter zip code/i);
    const button = screen.getByRole("button", { name: /search vehicles/i });

    await user.type(input, "99999");
    await user.click(button);

    await waitFor(() => {
      expect(
        screen.getByText(/no vehicles found for this zip code/i)
      ).toBeInTheDocument();
    });
  });

  test("displays vehicles for valid ZIP code", async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/enter zip code/i);
    const button = screen.getByRole("button", { name: /search vehicles/i });

    await user.type(input, "10001");
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText(/vehicles in 10001/i)).toBeInTheDocument();
    });

    // Should show filters sidebar
    expect(screen.getByText("Filters & Sort")).toBeInTheDocument();
    expect(screen.getByText("Sort By")).toBeInTheDocument();
  });
});
