import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Skapa servern med de mockade anropen
export const server = setupServer(...handlers);