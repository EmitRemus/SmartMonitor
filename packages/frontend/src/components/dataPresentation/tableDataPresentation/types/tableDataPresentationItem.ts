export type TableDataPresentationItemType =
  | 'string'
  | 'date'
  | 'meter'
  | 'temperature'
  | 'pressure'
  | 'none';

export type TableDataPresentationItemValueType = string | Date | number | null;

const _typeSpecification = {
  string: {} as { type: 'string'; value: string },
  date: {} as { type: 'date'; value: Date },
  meter: {} as { type: 'meter'; value: number },
  temperature: {} as { type: 'temperature'; value: number },
  pressure: {} as { type: 'pressure'; value: number },
  none: {} as { type: 'none'; value: null },
} satisfies Record<
  TableDataPresentationItemType,
  {
    type: TableDataPresentationItemType;
    value: TableDataPresentationItemValueType;
  }
>;

export type TableDataPresentationItem =
  (typeof _typeSpecification)[keyof typeof _typeSpecification];

export const tableDataPresentationItemNone: TableDataPresentationItem = {
  type: 'none',
  value: null,
};
