export type TableDataPresentationItemType =
  | 'string'
  | 'date'
  | 'money'
  | 'meter'
  | 'temperature';

export type TableDataPresentationItemValueType = string | number;

const _typeSpecification = {
  string: {} as { type: 'string'; value: string },
  date: {} as { type: 'date'; value: number },
  money: {} as { type: 'money'; value: number },
  meter: {} as { type: 'meter'; value: number },
  temperature: {} as { type: 'temperature'; value: number },
} satisfies Record<
  TableDataPresentationItemType,
  { value: TableDataPresentationItemValueType }
>;

export type tableDataPresentationItem =
  (typeof _typeSpecification)[keyof typeof _typeSpecification];
