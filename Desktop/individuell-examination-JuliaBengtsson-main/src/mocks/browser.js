/* import { setupServer } from "msw/node";
import { handlers } from './handlers';

if (typeof global.fetch === 'undefined') {
    const { fetch, Response, Headers, Request } = require('undici');
    global.fetch = fetch;
    global.Response = Response;
    global.Headers = Headers;
    global.Request = Request;
}

// Starta MSW med handlers från mocks/handlers
export const worker = setupServer(...handlers);
 */