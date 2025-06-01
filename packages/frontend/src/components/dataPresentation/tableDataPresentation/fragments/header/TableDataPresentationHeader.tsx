import { Flex } from '@radix-ui/themes';

import { twMerge } from 'tailwind-merge';

import { TableDataPresentationHeaderText } from '@/components/dataPresentation/tableDataPresentation/fragments/header/TableDataPresentationHeaderText';

interface TableDataPresentationHeaderProps {
  names: string[];
}

export const TableDataPresentationHeader = ({
  names,
}: TableDataPresentationHeaderProps) => {
  return (
    <tr className="bg-white">
      {names.map((name, index) => {
        return (
          <th className="text-left font-medium" key={`header-${index}`}>
            <Flex
              align="end"
              className={twMerge(
                'border-b-2 px-2 block h-10',
                'line-clamp-2',
                index != 0 && 'border-l-2',
              )}
            >
              <TableDataPresentationHeaderText text={name} />
            </Flex>
          </th>
        );
      })}
    </tr>
  );
};
