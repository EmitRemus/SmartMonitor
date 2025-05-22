import { Box, Button } from '@radix-ui/themes';

import { ArrowLeft } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SideBar = ({ isOpen, onClose }: SideBarProps) => {
  return (
    <Box
      className={twMerge(
        'w-1/3 fixed top-0 left-0 h-dvh bg-palette-blue-sapphire transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : '-translate-x-full',
      )}
    >
      <Button className="cursor-pointer" onClick={onClose}>
        <ArrowLeft />
      </Button>
    </Box>
  );
};
