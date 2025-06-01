import {
  type DefaultBodyType,
  HttpResponse,
  type PathParams,
  type StrictRequest,
  http,
} from 'msw';

export const allApartmentsHandler = http.get(
  /.*\/api\/apartment\/all$/,
  resolveGetAllApartments,
);

// --------------------------------------

async function resolveGetAllApartments({
  request,
  params: _params,
}: {
  request: StrictRequest<DefaultBodyType>;
  params: PathParams;
}) {
  const url = new URL(request.url);
  const limit = Math.max(
    1,
    parseInt(url.searchParams.get('limit') ?? '10', 10),
  );
  const id: string | null = url.searchParams.get('id');

  const offset =
    id == null
      ? 0
      : _mockedDataApartments.dataId.findIndex((value) => value == id); // assume correct

  const lastIndex = Math.min(_mockedDataApartments.data.length, offset + limit);
  const isFinished = lastIndex == _mockedDataApartments.data.length;

  return HttpResponse.json({
    data: {
      columns: _mockedDataApartments.columns,
      data: _mockedDataApartments.data.slice(offset, lastIndex),
      dataId: _mockedDataApartments.dataId.slice(offset, lastIndex),
    },
    isFinished: isFinished,
    lastId: isFinished ? null : _mockedDataApartments.dataId[lastIndex],
  });
}

const _mockedDataApartments = {
  columns: ['Apartment ID', 'Cold Water', 'Hot Water', 'Updated at'],
  data: Array.from({ length: 100 }, (_, i) => {
    const aptId = `${100 + Math.floor(i / 5)}-${1 + (i % 5)}`;
    const coldWater = +(50000 + Math.random() * 10000).toFixed(2);
    const hotWater = +(100000 + Math.random() * 20000).toFixed(2);
    const updatedAt = new Date(
      Date.UTC(
        2025,
        4,
        1 + Math.floor(Math.random() * 28),
        10 + Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 60),
      ),
    ).toISOString();

    return [aptId, coldWater, hotWater, updatedAt];
  }),
  dataId: Array.from({ length: 100 }, (_, i) => `${i + 1}`),
};
