import { Menubar } from 'radix-ui';
import { twJoin } from 'tailwind-merge';

import { GroupedNavigationLinkSubgroup } from '@/components/input/selectInput/groupedNavigation/fragment/GroupNavigationLinkSubgroup';
import type { GroupedNavigationTypes } from '@/components/input/selectInput/groupedNavigation/type/groupedNavigation.types';

interface GroupedNavigationMenuProp {
  name: string;
  group: GroupedNavigationTypes.NavigationGroup;
}

export const GroupedNavigationMenu = ({
  name,
  group,
}: GroupedNavigationMenuProp) => {
  return (
    <Menubar.Menu>
      <Menubar.Trigger
        className={twJoin(
          'px-4 py-1 w-full h-ful',
          "data-[state='open']:bg-palette-blue-sapphire data-[state='open']:text-white",
        )}
      >
        {name}
      </Menubar.Trigger>
      <Menubar.Portal>
        <Menubar.Content
          align="start"
          sideOffset={5}
          alignOffset={-3}
          className="w-50 shadow-lg border-2 border-palette-blue-ice bg-white"
        >
          <GroupedNavigationLinkSubgroup group={group} />
        </Menubar.Content>
      </Menubar.Portal>
    </Menubar.Menu>
  );
};
