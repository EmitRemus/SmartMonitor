import { HttpResponse, http } from 'msw';

export const totalHotWaterHandler = http.get(
  /.*\/api\/charts\/hot-water\/totals$/,
  () => HttpResponse.json(_mockedHotWaterData),
);

// --------------------------------------

function getRandomBase(): number {
  return 1000 + Math.random() * 200;
}

const startDate = new Date(Date.UTC(2025, 4, 31, 0, 0, 0));
const pointCount = 144;

const _mockedHotWaterData = [
  'Cold Water Total Expected',
  'Cold Water Total per Building',
  'Cold Water Total per Apartment',
].map((series) => ({
  name: series,
  data: Array.from({ length: pointCount }, (_, i) => {
    const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
    const expected = parseFloat(getRandomBase().toFixed(2)) + i * 12;
    return [date.toISOString(), expected];
  }),
}));
