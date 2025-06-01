import { allApartmentsHandler } from '@test/mockBackend/handlers/allApartmentsHandler';
import { allBuildingsHandler } from '@test/mockBackend/handlers/allBuildingsHandler';
import { allPipesHandler } from '@test/mockBackend/handlers/allPipesHandler';
import { allPumpStationsHandler } from '@test/mockBackend/handlers/allPumpStationsHandler';
import { fraudHeatmapHandler } from '@test/mockBackend/handlers/charts/fraudHeatmapHandler';
import { totalColdWaterHandler } from '@test/mockBackend/handlers/charts/totalColdWaterHandler';
import { totalHotWaterHandler } from '@test/mockBackend/handlers/charts/totalHotWaterHandler';

import { setupWorker } from 'msw/browser';

export const worker = setupWorker(
  allApartmentsHandler,
  allBuildingsHandler,
  allPumpStationsHandler,
  allPipesHandler,

  // charts
  totalColdWaterHandler,
  totalHotWaterHandler,
  fraudHeatmapHandler,
);
