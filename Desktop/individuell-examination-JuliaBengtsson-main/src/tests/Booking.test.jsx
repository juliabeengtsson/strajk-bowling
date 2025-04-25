import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { it, describe, expect } from 'vitest';
import Booking from '../views/Booking';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import BookingInfo from '../components/BookingInfo/BookingInfo';
import { vi } from 'vitest';
import { sendBooking } from '../utils/sendBooking';
import Confirmation from '../views/Confirmation';

describe('App component', async () => {
  // Användaren ska kunna välja ett datum och en tid från ett kalender- och tidvalssystem.
  // Användaren ska kunna ange antal spelare (minst 1 spelare).
  // Användaren ska kunna reservera ett eller flera banor beroende på antal spelare.
  it('check if player can book lanes on specific date and time', () => {
    render(
      <MemoryRouter>
        <Booking />
        <BookingInfo />
      </MemoryRouter>
    );

    const dateInput = screen.getByLabelText('Date');
    const timeInput = screen.getByLabelText('Time');
    const numberOfBowlersInput = screen.getByLabelText(
      'Number of awesome bowlers'
    );
    const numberOfLanesInput = screen.getByLabelText('Number of lanes');

    expect(dateInput).toBeInTheDocument();
    expect(timeInput).toBeInTheDocument();
    expect(numberOfBowlersInput).toBeInTheDocument();
    expect(numberOfLanesInput).toBeInTheDocument();

    fireEvent.change(dateInput, { target: { value: '2024-12-10' } });
    fireEvent.change(timeInput, { target: { value: '18:00' } });
    fireEvent.change(numberOfBowlersInput, { target: { value: '2' } });
    fireEvent.change(numberOfLanesInput, { target: { value: '2' } });

    expect(dateInput.value).toBe('2024-12-10');
    expect(timeInput.value).toBe('18:00');
    expect(numberOfBowlersInput.value).toBe('2');
    expect(numberOfLanesInput.value).toBe('2');
  });

  it('should show an error message if not all fields are filled', async () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );
    const bookingButton = screen.getByText(/strIIIIIike!/i);
    fireEvent.click(bookingButton);
    const errorMessage = await screen.findByText(
      /Alla fälten måste vara ifyllda/i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  // Användaren ska kunna ange skostorlek för varje spelare.
  // Användaren ska kunna ändra skostorlek för varje spelare.
  // Det ska vara möjligt att välja skostorlek för alla spelare som ingår i bokningen.
  it('should show an error message if not all fields are filled', async () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );
    const bookingButton = screen.getByText(/strIIIIIike!/i);
    fireEvent.click(bookingButton);
    const errorMessage = await screen.findByText(
      /Alla fälten måste vara ifyllda/i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it('should show an error if no shoes a chosen', async () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    const dateInput = screen.getByLabelText(/Date/i);
    const timeInput = screen.getByLabelText(/Time/i);
    const playersInput = screen.getByLabelText(/Number of awesome bowlers/i);
    const lanesInput = screen.getByLabelText(/Number of lanes/i);

    fireEvent.change(dateInput, { target: { value: '2024-12-10' } });
    fireEvent.change(timeInput, { target: { value: '15:00' } });
    fireEvent.change(playersInput, { target: { value: '2' } });
    fireEvent.change(lanesInput, { target: { value: '1' } });

    const bookButton = screen.getByText(/strIIIIIike!/i);
    fireEvent.click(bookButton);

    waitFor(() => {
      const errorMessage = screen.getByText(
        /Antalet skor måste stämma överens med antal spelare/i
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it('should show an error message if not all shoe sizes are filled', async () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    const dateInput = screen.getByLabelText(/Date/i);
    const timeInput = screen.getByLabelText(/Time/i);
    const playersInput = screen.getByLabelText(/Number of awesome bowlers/i);
    const lanesInput = screen.getByLabelText(/Number of lanes/i);

    fireEvent.change(dateInput, { target: { value: '2024-12-10' } });
    fireEvent.change(timeInput, { target: { value: '15:00' } });
    fireEvent.change(playersInput, { target: { value: '2' } });
    fireEvent.change(lanesInput, { target: { value: '1' } });

    for (let i = 0; i < 2; i++) {
      const addShoeButton = screen.getByText('+');
      fireEvent.click(addShoeButton);
    }
    const shoeInput = screen.getByLabelText(`Shoe size / person 1`);
    fireEvent.change(shoeInput, { target: { value: '38' } });

    const bookButton = screen.getByText(/strIIIIIike!/i);
    fireEvent.click(bookButton);

    waitFor(() => {
      const errorMessage = screen.findByText('Alla skor måste vara ifyllda');
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it('change the shoe size for each player', async () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    const dateInput = screen.getByLabelText(/Date/i);
    const timeInput = screen.getByLabelText(/Time/i);
    const playersInput = screen.getByLabelText(/Number of awesome bowlers/i);
    const lanesInput = screen.getByLabelText(/Number of lanes/i);

    fireEvent.change(dateInput, { target: { value: '2024-12-10' } });
    fireEvent.change(timeInput, { target: { value: '15:00' } });
    fireEvent.change(playersInput, { target: { value: '1' } });
    fireEvent.change(lanesInput, { target: { value: '1' } });

    for (let i = 0; i < 1; i++) {
      const addShoeButton = screen.getByText('+');
      fireEvent.click(addShoeButton);

      const shoeInput = screen.getByLabelText(`Shoe size / person ${i + 1}`);
      fireEvent.change(shoeInput, { target: { value: '38' } });
      expect(shoeInput.value).toBe('38');
      fireEvent.change(shoeInput, { target: { value: '39' } });
      expect(shoeInput.value).toBe('39');
    }
  });

  // Användaren ska kunna ta bort ett tidigare valt fält för skostorlek genom att klicka på en "-"-knapp vid varje spelare.
  it('User should be able to delete a shoe size by a - button', async () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    for (let i = 0; i < 3; i++) {
      const addShoeButton = screen.getByText('+');
      fireEvent.click(addShoeButton);

      const shoeInput = screen.getByLabelText(`Shoe size / person ${i + 1}`);
      fireEvent.change(shoeInput, { target: { value: '38' } });
    }

    const removeShoeButtons = screen.getAllByText('-');
    expect(removeShoeButtons.length).toBe(3);
    fireEvent.click(removeShoeButtons[1]);

    await waitFor(() => {
      const updatedRemoveButtons = screen.getAllByText('-');
      expect(updatedRemoveButtons.length).toBe(2);
    });
  });

  // Användaren ska kunna slutföra bokningen genom att klicka på en "slutför bokning"-knapp.
  // Användaren ska kunna navigera från bokningsvyn till bekräftelsevyn när bokningen är klar.
  it('User should be able to click a button to confirm the reservation', () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    const bookingButton = screen.getByText(/strIIIIIike!/i);
    expect(bookingButton).toBeDefined();

    fireEvent.click(bookingButton);
  });

  it('updateBookingDetails receives correct structure for all inputs', () => {
    const mockUpdate = vi.fn();
    render(<BookingInfo updateBookingDetails={mockUpdate} />);

    fireEvent.change(screen.getByLabelText('Date'), {
      target: { name: 'when', value: '2023-12-31' },
    });
    fireEvent.change(screen.getByLabelText('Time'), {
      target: { name: 'time', value: '18:00' },
    });
    fireEvent.change(screen.getByLabelText('Number of awesome bowlers'), {
      target: { name: 'people', value: '2' },
    });
    fireEvent.change(screen.getByLabelText('Number of lanes'), {
      target: { name: 'lanes', value: '2' },
    });

    expect(mockUpdate).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        target: expect.objectContaining({ name: 'when', value: '2023-12-31' }),
      })
    );
    expect(mockUpdate).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        target: expect.objectContaining({ name: 'time', value: '18:00' }),
      })
    );
    expect(mockUpdate).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        target: expect.objectContaining({
          name: 'people',
          value: '2',
        }),
      })
    );
    expect(mockUpdate).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        target: expect.objectContaining({ name: 'lanes', value: '2' }),
      })
    );
  });

  test("display the booking number after booking is completed", () => {
    const mockConfirmation = {
        when: "2024-12-31T18:00",
        people: 4,
        lanes: 2,
        id: "ABC123",
        price: 680
    }

    render(
        <MemoryRouter initialEntries={ [{ state: {confirmationDetails: mockConfirmation} }]}>
            <Confirmation />
        </MemoryRouter>
    )

    const bookingNumberInput = screen.getByDisplayValue(mockConfirmation.id)
    expect(bookingNumberInput).toBeInTheDocument()
})
});
