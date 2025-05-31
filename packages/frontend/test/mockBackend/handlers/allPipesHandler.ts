import {
  type DefaultBodyType,
  HttpResponse,
  type PathParams,
  type StrictRequest,
  http,
} from 'msw';

export const allPipesHandler = http.get(
  /.*\/api\/pipe\/all$/,
  resolveGetAllPipes,
);

async function resolveGetAllPipes({
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
    id == null ? 0 : _mockedDataPipes.dataId.findIndex((value) => value == id);

  const lastIndex = Math.min(_mockedDataPipes.data.length, offset + limit);
  const isFinished = lastIndex == _mockedDataPipes.data.length;

  return HttpResponse.json({
    data: {
      columns: _mockedDataPipes.columns,
      data: _mockedDataPipes.data.slice(offset, lastIndex),
      dataId: _mockedDataPipes.dataId.slice(offset, lastIndex),
    },
    isFinished: isFinished,
    lastId: isFinished ? null : _mockedDataPipes.dataId[lastIndex],
  });
}

const _mockedDataPipes = {
  columns: ['PipeID'],
  data: Array.from({ length: 50 }, (_, i) => {
    const pipeId = `P-${i + 1}`;
    return [pipeId];
  }),
  dataId: Array.from({ length: 50 }, (_, i) => `PID-${i + 1}`),
};
