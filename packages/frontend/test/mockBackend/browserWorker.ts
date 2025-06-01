import { allApartmentsHandler } from '@test/mockBackend/handlers/allApartmentsHandler';
import { allBuildingsHandler } from '@test/mockBackend/handlers/allBuildingsHandler';
import { allPipesHandler } from '@test/mockBackend/handlers/allPipesHandler';
import { allPumpStationsHandler } from '@test/mockBackend/handlers/allPumpStationsHandler';

import { setupWorker } from 'msw/browser';

export const worker = setupWorker(
  allApartmentsHandler,
  allBuildingsHandler,
  allPumpStationsHandler,
  allPipesHandler,
);
