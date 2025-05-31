import { allApartmentsHandler } from '@test/mockBackend/handlers/allApartmentsHandler.js';
import { allBuildingsHandler } from '@test/mockBackend/handlers/allBuildingsHandler';

import { setupWorker } from 'msw/browser';

export const worker = setupWorker(allBuildingsHandler, allApartmentsHandler);
