import { allApartmentsHandler } from '@test/mockBackend/handlers/allApartmentsHandler.js';
import { allBuildingsHandler } from '@test/mockBackend/handlers/allBuildingsHandler';
import { allPipeStationsHandler } from '@test/mockBackend/handlers/allPipeStationsHandler';
import { allPipesHandler } from '@test/mockBackend/handlers/allPipesHandler';

import { setupWorker } from 'msw/browser';

export const worker = setupWorker(
  allApartmentsHandler,
  allBuildingsHandler,
  allPipeStationsHandler,
  allPipesHandler,
);
