import React from "react";
import { render, screen } from "@testing-library/react";
import { it, describe } from "vitest";
import App from "../App.jsx";
import Confirmation from "../views/Confirmation.jsx";
import { MemoryRouter } from "react-router-dom";

// Tried first test so it works with github actions...
describe("App component", () => {
    it("just try render App component", async () => {
        render(<App />);
    });
})

// Systemet ska generera ett bokningsnummer och visa detta till användaren efter att bokningen är slutförd.
// Systemet ska beräkna och visa den totala summan för bokningen baserat på antalet spelare (120 kr per person) samt antalet reserverade banor (100 kr per bana).
// Den totala summan ska visas tydligt på bekräftelsesidan och inkludera en uppdelning mellan spelare och banor.
describe("App component", () => {
    it("Genereat a booking number", async () => {
        const mockConfirmation = {
            when: "2024-12-31T18:00",
            people: 2,
            lanes: 2,
            id: "BOOK12345",
            price: 680
        }
    
        screen.debug()

        render(
            <MemoryRouter initialEntries={ [{ state: {confirmationDetails: mockConfirmation} }]}>
                <Confirmation />
            </MemoryRouter>
        )
    
        const bookingNumberInput = screen.getByDisplayValue(mockConfirmation.id)
        expect(bookingNumberInput).toBeInTheDocument() 
    });
    
    it("Show total price for booking based on players and lanes", () => {
        const mockConfirmation = {
            when: "2024-12-31T18:00",
            people: 2,
            lanes: 2,
            id: "BOOK12345",
            price: 680,
        };
        
        render(
            <MemoryRouter initialEntries={[{ state: { confirmationDetails: mockConfirmation } }]}>
              <Confirmation />
            </MemoryRouter>
        );
        
        const totalPriceElement = screen.getByText(/total:/i)
        expect(totalPriceElement).toBeInTheDocument()
        expect(totalPriceElement.nextSibling.textContent).toContain(`${mockConfirmation.price} sek`)

        const peopleBreakdown = screen.getByText((content) => content.includes("2 x 120"));
        expect(peopleBreakdown).toBeInTheDocument()
    
        const lanesBreakdown = screen.getByText((content) => content.includes("2 x 100"));
        expect(lanesBreakdown).toBeInTheDocument()
    })
})