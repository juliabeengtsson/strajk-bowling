
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BookingForm from '../components/BookingForm'; 
import { server } from '../mocks/server'; 
import { http } from 'msw';

server.use(
  http.post('https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 'ABC123',
        active: true,
      })
    );
  })
);

test('should send a booking successfully when form is filled and button is clicked', async () => {
  render(<BookingForm />);

  const whenInput = screen.getByLabelText(/when/i);
  const lanesInput = screen.getByLabelText(/lanes/i);
  const peopleInput = screen.getByLabelText(/people/i);
  const shoesInput = screen.getByLabelText(/shoes/i);
  
  fireEvent.change(whenInput, { target: { value: '2024-12-18T21:00' } });
  fireEvent.change(lanesInput, { target: { value: '1' } });
  fireEvent.change(peopleInput, { target: { value: '2' } });
  fireEvent.change(shoesInput, { target: { value: '38, 39' } });

  const button = screen.getByRole('button', { name: /book/i });
  fireEvent.click(button);

  await waitFor(() => {
    expect(screen.getByText('Booking ID: ABC123')).toBeInTheDocument();
    expect(screen.getByText('Status: Active')).toBeInTheDocument();
  });
});
