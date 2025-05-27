import { TableVirtuoso } from 'react-virtuoso';
import { twMerge } from 'tailwind-merge';

import { TableDataPresentationHeader } from '@/components/dataPresentation/tableDataPresentation/fragments/tableDataPresentationHeader';
import { TableDataPresentationRow } from '@/components/dataPresentation/tableDataPresentation/fragments/tableDataPresentationRow';
import type { TableDataPresentationData } from '@/components/dataPresentation/tableDataPresentation/types/tableDataPresentationData';

interface TableDataPresentationProps {
  data: TableDataPresentationData;
  className?: string;
}

// TODO: add index to row specification in types and update keys in whole table

export const TableDataPresentation = ({
  data,
  className,
}: TableDataPresentationProps) => {
  const types = Object.values(data.columns);
  const names = Object.keys(data.columns);

  return (
    <TableVirtuoso
      className={twMerge('h-full w-full', className)}
      fixedHeaderContent={() => <TableDataPresentationHeader names={names} />}
      itemContent={(index) => {
        return (
          <TableDataPresentationRow
            index={index}
            rowData={data.data[index]}
            rowTypes={types}
            key={index}
          />
        );
      }}
    />
  );
};
