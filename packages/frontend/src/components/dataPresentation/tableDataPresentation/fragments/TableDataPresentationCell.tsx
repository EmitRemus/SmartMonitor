import { Text } from '@radix-ui/themes';

import { twMerge } from 'tailwind-merge';

import type { TableDataPresentationItem } from '@/components/dataPresentation/tableDataPresentation/types/tableDataPresentationItem';
import { formatDateToString } from '@/utils/dataFormatting/formatDateToString';
import { formatMeterToString } from '@/utils/dataFormatting/formatMeterToString';
import { formatPressureToString } from '@/utils/dataFormatting/formatPressureToString';
import { formatTemperatureToString } from '@/utils/dataFormatting/formatTemperatureToString';

interface TableDataPresentationCellProps {
  data: TableDataPresentationItem | null;
  isFirst: boolean;
}

export const TableDataPresentationCell = ({
  data,
  isFirst,
}: TableDataPresentationCellProps) => {
  return (
    <Text
      align="center"
      className={twMerge(
        'px-2 block !w-full h-7 !text-left whitespace-nowrap',
        !isFirst && 'border-l-2',
        _useMonoFontFor.includes(data?.type ?? '') && '!font-mono font-light',
      )}
    >
      {_itemToString(data)}
    </Text>
  );
};

function _itemToString(data: TableDataPresentationItem | null): string {
  if (data == null) return '';

  switch (data.type) {
    case 'meter':
      return formatMeterToString(data.value);
    case 'string':
      return data.value;
    case 'pressure':
      return formatPressureToString(data.value);
    case 'temperature':
      return formatTemperatureToString(data.value);
    case 'date':
      return formatDateToString(data.value);
    case 'none':
      return '';
    default:
      return '';
  }
}

const _useMonoFontFor: string[] = ['date', 'meter', 'pressure', 'temperature'];
