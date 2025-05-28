import { Box } from '@radix-ui/themes';

import { useRef } from 'react';
import { twMerge } from 'tailwind-merge';

import { TableDataPresentation } from '@/components/dataPresentation/tableDataPresentation/tableDataPresentation';
import type { TableDataPresentationData } from '@/components/dataPresentation/tableDataPresentation/types/tableDataPresentationData';
import { BorderedBox } from '@/components/layout/borderedBox';

interface BorderedTableDataPresentationProps {
  data: TableDataPresentationData;
  tableClassName?: string;
  className?: string;
  onEndReached?: () => void;
  isDataFinished?: boolean;
}

export const BorderedTableDataPresentation = ({
  data,
  tableClassName,
  className,
  onEndReached,
  isDataFinished,
}: BorderedTableDataPresentationProps) => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  return (
    <BorderedBox className={twMerge('relative', className)}>
      <Box ref={scrollerRef} className="h-full w-full overflow-y-scroll p-5">
        {/* floating Box is used to hide rows that are overflowing from table - due to usage of scrollRef */}
        <Box className="h-5 w-full border-x-[1.25rem] border-transparent box-border bg-white absolute top-0 right-2.5 z-10" />

        <TableDataPresentation
          className={tableClassName}
          data={data}
          scrollRef={scrollerRef}
          onEndReached={onEndReached}
          isDataFinished={isDataFinished}
        />
      </Box>
    </BorderedBox>
  );
};
