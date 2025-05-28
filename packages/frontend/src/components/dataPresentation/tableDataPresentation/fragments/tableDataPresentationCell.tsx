import { Text } from '@radix-ui/themes';

import { twMerge } from 'tailwind-merge';

import type {
  TableDataPresentationItemType,
  TableDataPresentationItemValueType,
} from '@/components/dataPresentation/tableDataPresentation/types/tableDataPresentationItem';

interface TableDataPresentationCellProps {
  data: TableDataPresentationItemValueType | null;
  type: TableDataPresentationItemType;
  isFirst: boolean;
}

export const TableDataPresentationCell = ({
  data,
  type,
  isFirst,
}: TableDataPresentationCellProps) => {
  return (
    <Text
      align="center"
      className={twMerge(
        'px-2 block !w-full h-7 !text-left whitespace-nowrap',
        !isFirst && 'border-l-2',
      )}
    >
      {data} - {type}
    </Text>
  );
};
