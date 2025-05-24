import { MenuIcon } from 'lucide-react';
import { useState } from 'react';
import { Outlet } from 'react-router';

import { Sidebar } from '@/layout/sidebarLayout/fragments/sidebar';

export const SidebarLayout = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  return (
    <>
      <Outlet />

      <button
        className="cursor-pointer fixed top-7 left-6"
        onClick={() => setIsOpened((value) => !value)}
      >
        <MenuIcon className="stroke-1 w-15 h-15" />
      </button>
      <Sidebar isOpen={isOpened} onClose={() => setIsOpened(false)} />
    </>
  );
};
