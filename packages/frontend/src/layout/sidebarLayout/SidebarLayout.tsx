import { Box } from '@radix-ui/themes';

import { MenuIcon } from 'lucide-react';
import { useState } from 'react';
import { Outlet } from 'react-router';
import { twMerge } from 'tailwind-merge';

import { Sidebar } from '@/layout/sidebarLayout/fragments/Sidebar';

export const SidebarLayout = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  return (
    <>
      <Outlet />

      <button
        className="cursor-pointer fixed top-7 left-6 z-1000"
        onClick={() => setIsOpened((value) => !value)}
      >
        <MenuIcon className="stroke-1 w-15 h-15" />
      </button>
      <Box
        className={twMerge(
          'z-1400 position absolute top-0 left-0 w-full h-full',
          !isOpened && 'pointer-events-none',
        )}
      >
        <Sidebar isOpen={isOpened} onClose={() => setIsOpened(false)} />
      </Box>
    </>
  );
};
