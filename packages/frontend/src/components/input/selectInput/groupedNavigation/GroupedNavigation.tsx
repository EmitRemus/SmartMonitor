import { Flex } from '@radix-ui/themes';

import { Menubar, Separator } from 'radix-ui';

import { GroupedNavigationMenu } from '@/components/input/selectInput/groupedNavigation/fragment/GroupedNavigationMenu';
import type { GroupedNavigationTypes } from '@/components/input/selectInput/groupedNavigation/type/groupedNavigation.types';

interface GroupedNavigationProps {
  navigationGroups: GroupedNavigationTypes.NavigationGroups;
  className?: string;
}

export const GroupedNavigation = ({
  className: _a,
  navigationGroups,
}: GroupedNavigationProps) => {
  return (
    <Menubar.Root className=" border-[2.5px] rounded-md border-palette-blue-sapphire">
      <Flex align="center" className="h-8">
        {Object.entries(navigationGroups).map(([name, group], index) => (
          <div key={name}>
            {index !== 0 && (
              <Separator.Root
                className="h-full w-[2px] bg-palette-blue-sapphire"
                decorative
                orientation="vertical"
              />
            )}
            <GroupedNavigationMenu name={name} group={group} />
          </div>
        ))}
      </Flex>
    </Menubar.Root>
  );
};
