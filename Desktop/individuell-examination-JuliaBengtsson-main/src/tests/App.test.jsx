import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Booking from "../views/Booking";
import { MemoryRouter } from "react-router-dom";

test("should send a booking successfully when form is filled and button is clicked", async () => {
  render(
    <MemoryRouter>
      <Booking />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText(/date/i), {
    target: { value: "2024-12-18" },
  });
  fireEvent.change(screen.getByLabelText(/time/i), {
    target: { value: "21:00" },
  });
  fireEvent.change(screen.getByLabelText(/number of lanes/i), {
    target: { value: "1" },
  });
  fireEvent.change(screen.getByLabelText(/number of awesome bowlers/i), {
    target: { value: "2" },
  });

  // Lägg till två skor
  fireEvent.click(screen.getByText("+"));
  fireEvent.click(screen.getByText("+"));

  // Fyll i skostorlekar (efter att inputs genererats)
  const shoeInputs = screen.getAllByRole("textbox"); // Din Shoes-komponent använder textfält
  fireEvent.change(shoeInputs[0], { target: { value: "42" } });
  fireEvent.change(shoeInputs[1], { target: { value: "38" } });

  // Skicka bokningen
  const button = screen.getByRole("button", { name: /striiiiiike!/i });
  fireEvent.click(button);

  // Kontrollera att bekräftelsen visas
  await waitFor(() => {
    expect(screen.getByText(/booking id: abc123/i)).toBeInTheDocument();
    expect(screen.getByText(/status: active/i)).toBeInTheDocument();
  });
});
