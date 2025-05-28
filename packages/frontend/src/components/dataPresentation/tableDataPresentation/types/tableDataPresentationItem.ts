export type TableDataPresentationItemType =
  | 'string'
  | 'date'
  | 'meter'
  | 'temperature'
  | 'pressure';

export type TableDataPresentationItemValueType = string | number | null;

const _typeSpecification = {
  string: {} as { type: 'string'; value: string },
  date: {} as { type: 'date'; value: number },
  meter: {} as { type: 'meter'; value: number },
  temperature: {} as { type: 'temperature'; value: number },
  pressure: {} as { type: 'pressure'; value: number },
} satisfies Record<
  TableDataPresentationItemType,
  { value: TableDataPresentationItemValueType }
>;

export type tableDataPresentationItem =
  (typeof _typeSpecification)[keyof typeof _typeSpecification];
