import { Box } from '@radix-ui/themes';

import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface BorderedBoxProps {
  children?: ReactNode[] | ReactNode;
  className?: string;
  ref?: React.RefObject<HTMLDivElement | null>;
}

export const BorderedBox = ({ className, children, ref }: BorderedBoxProps) => {
  return (
    <Box
      ref={ref}
      className={twMerge(
        'w-full h-90 border-[2.5px] rounded-[0.625rem] border-palette-gray-storm overflow-clip',
        className,
      )}
    >
      {children}
    </Box>
  );
};
