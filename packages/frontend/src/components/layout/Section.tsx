import { Box } from '@radix-ui/themes';

import { twMerge } from 'tailwind-merge';

interface SectionProps {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
}

export const Section = ({ children, className }: SectionProps) => {
  return (
    <Box className={twMerge('w-full h-full shadow-2xl bg-white', className)}>
      {children}
    </Box>
  );
};
