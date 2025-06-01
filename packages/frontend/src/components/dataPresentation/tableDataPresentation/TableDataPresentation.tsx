import { useEffect, useState } from 'react';
import { TableVirtuoso } from 'react-virtuoso';
import { twMerge } from 'tailwind-merge';

import { TableDataPresentationFooter } from '@/components/dataPresentation/tableDataPresentation/fragments/TableDataPresentationFooter';
import { TableDataPresentationHeader } from '@/components/dataPresentation/tableDataPresentation/fragments/TableDataPresentationHeader';
import { TableDataPresentationRow } from '@/components/dataPresentation/tableDataPresentation/fragments/TableDataPresentationRow';
import type { TableDataPresentationData } from '@/components/dataPresentation/tableDataPresentation/types/tableDataPresentationData';

interface TableDataPresentationProps {
  data: TableDataPresentationData;
  className?: string;
  scrollRef?: React.RefObject<HTMLElement | null>;
  onEndReached?: () => void;
  isDataFinished?: boolean;
}

export const TableDataPresentation = ({
  data,
  className,
  scrollRef,
  onEndReached,
  isDataFinished,
}: TableDataPresentationProps) => {
  if (onEndReached !== undefined && isDataFinished === undefined) {
    throw new Error(_incoherentPropsStateError);
  }
  const isEndReached = _isEndReached(onEndReached, isDataFinished);

  const columnsNames = Object.keys(data.columns);

  const [customScroll, setCustomScroll] = useState<HTMLElement | null>(null);
  useEffect(() => {
    if (!scrollRef?.current) {
      setCustomScroll(null);
      return;
    }

    setCustomScroll(scrollRef.current);
  }, [scrollRef]);

  return (
    <TableVirtuoso
      className={twMerge(
        'h-full w-full',
        '[&>div>table]:w-full', // set table on whole width
        className,
      )}
      customScrollParent={customScroll ?? undefined}
      increaseViewportBy={200}
      fixedHeaderContent={() => (
        <TableDataPresentationHeader names={columnsNames} />
      )}
      itemContent={(index, _) => {
        if (index == data.data.length) return <TableDataPresentationFooter />;

        return (
          <TableDataPresentationRow
            rowData={data.data[index]}
            key={data.dataId[index]}
            columns={columnsNames}
          />
        );
      }}
      totalCount={data.data.length + (isEndReached ? 0 : 1)}
      endReached={onEndReached}
    />
  );
};

function _isEndReached(
  onEndReached: (() => void) | undefined,
  isDataFinished: boolean | undefined,
) {
  if (onEndReached === undefined) {
    // if onEndReached callback isn't provided, isDataFinished is ignored
    // assume table is in static mode
    return true;
  }
  return isDataFinished;
}

const _incoherentPropsStateError =
  "Incoherent state in TableDataPresentation component: isDataFinished wasn't provided, while onEndReached was";
