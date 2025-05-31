import { environment } from '@config/environment';

import { useRef } from 'react';

import type { TableDataPresentationData } from '@/components/dataPresentation/tableDataPresentation/types/tableDataPresentationData';
import {
  type TableDataPresentationItem,
  type TableDataPresentationItemType,
  tableDataPresentationItemNone,
} from '@/components/dataPresentation/tableDataPresentation/types/tableDataPresentationItem';
import type { TabledInputDataType } from '@/hooks/dataFetch/types/tabledInput';
import { usePaginatedTableQuery } from '@/hooks/dataFetch/useFetch.tables';
import { isArraysEqual } from '@/utils/dataComparing/isArraysEqual';

interface fetchAllApartmentReturns {
  data: TableDataPresentationData;
  onEndReached: () => void;
  isDataFinished: boolean;
}

export const useFetchAllApartments = (): fetchAllApartmentReturns => {
  const page = usePaginatedTableQuery(
    `${environment.API_BASE_URL}/apartment/all`,
    ['apartment', 'all'],
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
  const result: [string | null, number | null, number | null, Date | null][] =
    [];

  for (const row of data.data) {
    if (row.some((cell, i) => typeof cell !== _columnTypes[i])) return null;

    const apartmentId = row[0] as string | null;
    const coldWater = row[1] as number | null;
    const hotWater = row[2] as number | null;
    const updatedAt = row[3] as string | null;

    if (coldWater !== null && coldWater < 0) return null;
    if (hotWater !== null && hotWater < 0) return null;

    const parsedDate = updatedAt === null ? null : Date.parse(updatedAt);
    if (parsedDate !== null && isNaN(parsedDate)) return null;

    result.push([
      apartmentId as string,
      coldWater,
      hotWater,
      parsedDate === null ? null : new Date(parsedDate),
    ]);
  }

  // formatting result

  return result.map((row) => [
    row[0] === null
      ? tableDataPresentationItemNone
      : { type: 'string', value: row[0] },
    row[1] === null
      ? tableDataPresentationItemNone
      : { type: 'meter', value: row[1] },
    row[2] === null
      ? tableDataPresentationItemNone
      : { type: 'meter', value: row[2] },
    row[3] === null
      ? tableDataPresentationItemNone
      : { type: 'date', value: row[3] },
  ]);
}

const _columns: Record<string, TableDataPresentationItemType> = {
  'Apartment ID': 'string',
  'Cold Water': 'meter',
  'Hot Water': 'meter',
  'Updated at': 'date',
};

const _columnNames = Object.keys(_columns).sort();
const _columnTypes = ['string', 'number', 'number', 'string'];
