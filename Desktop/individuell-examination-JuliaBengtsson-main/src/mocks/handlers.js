import { rest } from "msw"; // samma här, vi använder rest istället för http, för msw@1

// Skapar ett fejk-API-svar med MSW (Mock Service Worker), här för POST-anrop med REST
// Vi använder `rest.post` från MSW istället för `http.post` (som tillhör MSW v2:s "experimental" syntax)
// ctx.status och ctx.json används för att sätta statuskod och svar, vilket är korrekt MSW-syntax

export const handlers = [
  rest.post(
    "https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com",
    async (req, res, ctx) => {
      const body = await req.json();
      const { when, people, lanes, shoes } = body;

      const price = parseInt(lanes) * 100 + parseInt(people) * 120;

      const confirmation = {
        id: "ABC123",
        price: price.toString(),
        active: true,
        when,
        lanes,
        people,
        shoes,
      };

      sessionStorage.setItem("confirmation", JSON.stringify(confirmation));

      return res(ctx.status(200), ctx.json(confirmation)); // uppdaterad syntax, ctx(rest) istället för httpResponse
    }
  ),
];
