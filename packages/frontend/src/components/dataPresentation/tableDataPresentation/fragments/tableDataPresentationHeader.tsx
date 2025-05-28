import { Text } from '@radix-ui/themes';

import { twMerge } from 'tailwind-merge';

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
            <Text
              className={twMerge(
                'border-b-2 px-2 w-full block',
                index != 0 && 'border-l-2',
              )}
            >
              {name.slice(0, 1).toLocaleUpperCase()}
              {name.slice(1)}
            </Text>
          </th>
        );
      })}
    </tr>
  );
};
