import { HttpResponse, http } from 'msw';

export const fraudHeatmapHandler = http.get(
  /.*\/api\/charts\/fraud-heatmap$/,
  () =>
    HttpResponse.json({
      columns: _mockedHonestyHeatmap.columns,
      data: _mockedHonestyHeatmap.data,
    }),
);

// --------------------------------------

const TOTAL_APARTMENTS = 50;

const _mockedHonestyHeatmap = {
  columns: ['ApartmentID', 'FraudFactor'],
  data: Array.from({ length: TOTAL_APARTMENTS }, () => [
    String(Math.floor(1000000000 + Math.random() * 9000000000)),
    Math.floor(Math.random() * 101),
  ]),
};
