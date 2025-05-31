import {
  type DefaultBodyType,
  HttpResponse,
  type PathParams,
  type StrictRequest,
  http,
} from 'msw';

export const allBuildingsHandler = http.get(
  /.*\/api\/building\/all$/,
  resolveGetAllBuildings,
);

// --------------------------------------

async function resolveGetAllBuildings({
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
      : _mockedDataBuildings.dataId.findIndex((value) => value == id);

  const lastIndex = Math.min(_mockedDataBuildings.data.length, offset + limit);
  const isFinished = lastIndex == _mockedDataBuildings.data.length;

  return HttpResponse.json({
    data: {
      columns: _mockedDataBuildings.columns,
      data: _mockedDataBuildings.data.slice(offset, lastIndex),
      dataId: _mockedDataBuildings.dataId.slice(offset, lastIndex),
    },
    isFinished: isFinished,
    lastId: isFinished ? null : _mockedDataBuildings.dataId[lastIndex],
  });
}

const _mockedDataBuildings = {
  columns: ['Building ID', 'Cold Water', 'Hot Water', 'Pressure', 'Updated at'],
  data: Array.from({ length: 50 }, (_, i) => {
    const buildingId = `B-${i + 1}`;
    const coldWater = +(100000 + Math.random() * 20000).toFixed(2);
    const hotWater = +(200000 + Math.random() * 40000).toFixed(2);
    const pressure = +(2.5 + Math.random() * 1.5).toFixed(2); // pressure in bar
    const updatedAt = new Date(
      Date.UTC(
        2025,
        4,
        1 + Math.floor(Math.random() * 28),
        10 + Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 60),
      ),
    ).toISOString();

    return [buildingId, coldWater, hotWater, pressure, updatedAt];
  }),
  dataId: Array.from({ length: 50 }, (_, i) => `BID-${i + 1}`),
};
