import { Box } from '@radix-ui/themes';

import { twMerge } from 'tailwind-merge';

interface SectionProps {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
}

export const Section = ({ children, className }: SectionProps) => {
  return (
    <Box
      className={twMerge(
        'w-full h-full shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-lg bg-white',
        className,
      )}
    >
      {children}
    </Box>
  );
};
