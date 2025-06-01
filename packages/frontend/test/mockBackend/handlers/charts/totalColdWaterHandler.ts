import { HttpResponse, http } from 'msw';

export const totalColdWaterHandler = http.get(
  /.*\/api\/charts\/cold-water\/totals$/,
  () => HttpResponse.json(_mockedColdWaterData),
);

// --------------------------------------

function getRandomBase(): number {
  return 1000 + Math.random() * 200;
}

const startDate = new Date(Date.UTC(2025, 4, 31, 0, 0, 0));
const pointCount = 144;

const _mockedColdWaterData = [
  'Cold Water Total Expected',
  'Cold Water Total per Building',
  'Cold Water Total per Apartment',
].map((series) => ({
  name: series,
  data: Array.from({ length: pointCount }, (_, i) => {
    const date = new Date(startDate.getTime() + i * 10 * 60 * 1000);
    const expected = parseFloat(getRandomBase().toFixed(2));
    return [date.toISOString(), expected];
  }),
}));
