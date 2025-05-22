import { Button } from '@radix-ui/themes';

import { MenuIcon } from 'lucide-react';
import { useState } from 'react';
import { Outlet } from 'react-router';

import { SideBar } from './fragments/sideBar';

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
      <SideBar isOpen={isOpened} onClose={() => setIsOpened(false)} />
      <Outlet />
    </>
  );
};
