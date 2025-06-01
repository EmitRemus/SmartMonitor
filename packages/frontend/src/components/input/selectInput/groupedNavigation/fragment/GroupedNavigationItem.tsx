import { Menubar } from 'radix-ui';
import { useLocation } from 'react-router';
import { twMerge } from 'tailwind-merge';

interface GroupedNavigationItemProp {
  name: string;
  link: string;
}

export const GroupedNavigationItem = ({
  name,
  link,
}: GroupedNavigationItemProp) => {
  const location = useLocation();
  const path = location.pathname ?? '';
  const isActiveItem = link === path;

  return (
    <Menubar.Item
      className={twMerge(
        'px-2 py-1 text-center data-[highlighted]:bg-palette-blue-ice cursor-pointer',
        isActiveItem && 'bg-palette-blue-ice',
      )}
    >
      {name}
    </Menubar.Item>
  );
};
