import { Menubar } from 'radix-ui';
import { useLocation, useNavigate } from 'react-router';
import { twMerge } from 'tailwind-merge';

interface GroupedNavigationItemProp {
  name: string;
  link: string;
}

export const GroupedNavigationItem = ({
  name,
  link,
}: GroupedNavigationItemProp) => {
  const navigate = useNavigate();

  const location = useLocation();
  const path = location.pathname ?? '';
  const isActiveItem = link === path;

  return (
    <Menubar.Item
      onClick={() => navigate(link)}
      className={twMerge(
        'px-2 py-1 text-center data-[highlighted]:bg-palette-blue-ice cursor-pointer',
        isActiveItem && 'bg-palette-blue-ice',
      )}
    >
      {name}
    </Menubar.Item>
  );
};
