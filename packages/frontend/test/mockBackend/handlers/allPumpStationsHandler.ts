import {
  type DefaultBodyType,
  HttpResponse,
  type PathParams,
  type StrictRequest,
  http,
} from 'msw';

export const allPumpStationsHandler = http.get(
  /.*\/api\/pump-station\/all$/,
  resolveGetAllPumpStations,
);

// --------------------------------------

async function resolveGetAllPumpStations({
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
      : _mockedDataPumpStations.dataId.findIndex((value) => value == id);

  const lastIndex = Math.min(
    _mockedDataPumpStations.data.length,
    offset + limit,
  );
  const isFinished = lastIndex == _mockedDataPumpStations.data.length;

  return HttpResponse.json({
    data: {
      columns: _mockedDataPumpStations.columns,
      data: _mockedDataPumpStations.data.slice(offset, lastIndex),
      dataId: _mockedDataPumpStations.dataId.slice(offset, lastIndex),
    },
    isFinished: isFinished,
    lastId: isFinished ? null : _mockedDataPumpStations.dataId[lastIndex],
  });
}

const _mockedDataPumpStations = {
  columns: [
    'Pump Station ID',
    'Cold Water',
    'Hot Water',
    'Pressure',
    'Updated at',
  ],
  data: Array.from({ length: 30 }, (_, i) => {
    const stationId = `P-${i + 1}`;
    const coldWater = +(1500000 + Math.random() * 300000).toFixed(2);
    const hotWater = +(2500000 + Math.random() * 500000).toFixed(2);
    const pressure = +(3.0 + Math.random() * 2.0).toFixed(2); // bar
    const updatedAt = new Date(
      Date.UTC(
        2025,
        4,
        1 + Math.floor(Math.random() * 28),
        8 + Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 60),
      ),
    ).toISOString();

    return [stationId, coldWater, hotWater, pressure, updatedAt];
  }),
  dataId: Array.from({ length: 30 }, (_, i) => `PID-${i + 1}`),
};
