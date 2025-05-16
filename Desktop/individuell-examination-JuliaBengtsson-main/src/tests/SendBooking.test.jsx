import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Booking from "../views/Booking";
import { server } from "../mocks/server";
import { rest } from "msw";

// Mocka POST-anropet
server.use(
  rest.post(
    "https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          id: "ABC123",
          active: true,
        })
      );
    }
  )
);

test("should send a booking successfully when form is filled and button is clicked", async () => {
  render(
    <MemoryRouter>
      <Booking />
    </MemoryRouter>
  );

  // Fyll i bokningsformuläret
  const whenInput = screen.getByLabelText(/date/i);
  const timeInput = screen.getByLabelText(/time/i);
  const lanesInput = screen.getByLabelText(/number of lanes/i);
  const peopleInput = screen.getByLabelText(/number of awesome bowlers/i);

  fireEvent.change(whenInput, { target: { value: "2024-12-18" } });
  fireEvent.change(timeInput, { target: { value: "21:00" } });
  fireEvent.change(lanesInput, { target: { value: "1" } });
  fireEvent.change(peopleInput, { target: { value: "1" } });

  // Lägg till sko
  const addShoeButton = screen.getByRole("button", { name: "+" });
  fireEvent.click(addShoeButton);

  const shoeInput = screen.getByLabelText(/shoe size \/ person 1/i);
  fireEvent.change(shoeInput, { target: { value: "38" } });

  // Klicka på bokningsknappen
  const bookButton = screen.getByRole("button", { name: /striiiiiike!/i });
  fireEvent.click(bookButton);

  // Vänta på mockat svar och kontrollera resultat
  await waitFor(() => {
    expect(sessionStorage.getItem("confirmation")).toContain("ABC123");
  });
});
