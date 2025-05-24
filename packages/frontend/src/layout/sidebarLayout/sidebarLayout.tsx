import { Button } from '@radix-ui/themes';

import { MenuIcon } from 'lucide-react';
import { useState } from 'react';
import { Outlet } from 'react-router';

import { Sidebar } from './fragments/sidebar';

export const SidebarLayout = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  return (
    <>
      <Button
        className="cursor-pointer"
        onClick={() => setIsOpened((value) => !value)}
      >
        <MenuIcon />
      </Button>
      <Sidebar isOpen={isOpened} onClose={() => setIsOpened(false)} />
      <Outlet />
    </>
  );
};
