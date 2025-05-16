import { afterEach, beforeAll, afterAll } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { server } from "./src/mocks/server";

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

// ska köras före och efter varje testkörning. alla relevanta steg behöver vara med, eftersom vi behöver starta, uppdatera och stänga servern.
