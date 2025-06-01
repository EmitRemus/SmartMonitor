import { environment } from '@config/environment';

import { useRef } from 'react';

import type { TableDataPresentationData } from '@/components/dataPresentation/tableDataPresentation/types/tableDataPresentationData';
import {
  type TableDataPresentationItem,
  type TableDataPresentationItemType,
  tableDataPresentationItemNone,
} from '@/components/dataPresentation/tableDataPresentation/types/tableDataPresentationItem';
import type { TabledInputDataType } from '@/hooks/dataFetch/tables/types/tabledInput';
import { usePaginatedTableQuery } from '@/hooks/dataFetch/tables/useFetch.tables';
import { isArraysEqual } from '@/utils/dataComparing/isArraysEqual';

interface fetchAllPipesReturns {
  data: TableDataPresentationData;
  onEndReached: () => void;
  isDataFinished: boolean;
}

export const useFetchAllPipes = (): fetchAllPipesReturns => {
  const page = usePaginatedTableQuery(
    `${environment.API_BASE_URL}/pipe/all`,
    ['pipe', 'all'],
    20,
  );
  const data = useRef<Pick<TableDataPresentationData, 'data' | 'dataId'>>({
    data: [],
    dataId: [],
  });

  const fetchedData = page.data;
  const isDataFinished = page.isDataFinished;
  const onEndReached = page.onEndReached;

  const newData = fetchedData === null ? null : _parseData(fetchedData.data);
  if (newData !== null) {
    // null is checked inside _parseData
    data.current.dataId = [...data.current.dataId, ...fetchedData!.data.dataId];
    data.current.data = [...data.current.data, ...newData];
  }

  return {
    data: {
      columns: _columns,
      data: data.current.data,
      dataId: data.current.dataId,
    },
    isDataFinished,
    onEndReached,
  };
};

function _parseData(
  data: TabledInputDataType,
): (TableDataPresentationItem | null)[][] | null {
  // validating types
  const isCorrectColumns = isArraysEqual(_columnNames, data.columns);
  if (!isCorrectColumns) return null;

  if (
    data.data.some((row) =>
      row.some(
        (entry, i) => entry !== null && typeof entry !== _columnTypes[i],
      ),
    )
  ) {
    return null;
  }

  // parse data (and value validation)
  const result: [string | null][] = [];

  for (const row of data.data) {
    if (row.some((cell, i) => typeof cell !== _columnTypes[i])) return null;

    const pipesId = row[0] as string | null;

    result.push([pipesId as string]);
  }

  // formatting result

  return result.map((row) => [
    row[0] === null
      ? tableDataPresentationItemNone
      : { type: 'string', value: row[0] },
  ]);
}

const _columns: Record<string, TableDataPresentationItemType> = {
  'Pipe ID': 'string',
};

const _columnNames = Object.keys(_columns).sort();
const _columnTypes = ['string'];
