import { Flex } from '@radix-ui/themes';

import { Menubar, Separator } from 'radix-ui';
import { twMerge } from 'tailwind-merge';

import { GroupedNavigationMenu } from '@/components/input/selectInput/groupedNavigation/fragment/GroupedNavigationMenu';
import type { GroupedNavigationTypes } from '@/components/input/selectInput/groupedNavigation/type/groupedNavigation.types';

interface GroupedNavigationProps {
  navigationGroups: GroupedNavigationTypes.NavigationGroups;
  className?: string;
  classNameGroup?: string;
  classNameSubGroup?: string;
}

export const GroupedNavigation = ({
  className,
  classNameGroup,
  classNameSubGroup,
  navigationGroups,
}: GroupedNavigationProps) => {
  return (
    <Menubar.Root
      className={twMerge(
        'border-[2.5px] rounded-md border-palette-blue-sapphire bg-white',
        className,
      )}
    >
      <Flex align="center" className="h-8">
        {Object.entries(navigationGroups).map(([name, group], index) => (
          <div className="h-8 flex w-full" key={name}>
            {index !== 0 && (
              <Separator.Root
                className="h-full w-[2px] bg-palette-blue-sapphire"
                decorative
                orientation="vertical"
              />
            )}
            <GroupedNavigationMenu
              name={name}
              group={group}
              className={classNameGroup}
              classNameSubGroup={classNameSubGroup}
            />
          </div>
        ))}
      </Flex>
    </Menubar.Root>
  );
};
