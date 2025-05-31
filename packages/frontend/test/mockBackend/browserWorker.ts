import { handlers } from '@test/mockBackend/handlers.js';

import { setupWorker } from 'msw/browser';

export const worker = setupWorker(...handlers);
