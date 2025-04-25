import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com', async (request) => {
    // Läs in och bearbeta requestens body
    const body = await request.request.json();
    const { when, people, lanes, shoes } = body;

    // Beräkna priset baserat på lanes och people
    const price = parseInt(lanes) * 100 + parseInt(people) * 120;

    // Mockad respons
    const confirmation = {
      id: 'ABC123',
      price: price.toString(),
      active: true,
      when,
      lanes,
      people,
      shoes,
    };

    // Sätt mockad data i sessionStorage
    sessionStorage.setItem('confirmation', JSON.stringify(confirmation));

    // Returnera den mockade responsen
    return HttpResponse.json(confirmation); // Mocka tillbaka ett JSON-svar
  }),
];
