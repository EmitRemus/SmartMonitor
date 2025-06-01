import { Flex, Text } from '@radix-ui/themes';

import { ChevronRight } from 'lucide-react';
import { Menubar } from 'radix-ui';
import { twMerge } from 'tailwind-merge';

import { GroupedNavigationItem } from '@/components/input/selectInput/groupedNavigation/fragment/GroupedNavigationItem';
import type { GroupedNavigationTypes } from '@/components/input/selectInput/groupedNavigation/type/groupedNavigation.types';

interface GroupedNavigationSubGroupProp {
  name: string;
  subGroup: GroupedNavigationTypes.NavigationSubGroup;
  className?: string;
}

export const GroupedNavigationSubGroup = ({
  name,
  subGroup,
  className,
}: GroupedNavigationSubGroupProp) => {
  return (
    <Menubar.Sub>
      <Menubar.SubTrigger className="data-[highlighted]:bg-palette-blue-ice">
        <Flex justify="center" align="center" className="gap-1">
          <Text className="pl-2 py-1 text-center grow-1">{name}</Text>
          <ChevronRight className="w-4 h-4 mt-[1.75px] stroke-2" />
        </Flex>
      </Menubar.SubTrigger>
      <Menubar.Portal>
        <Menubar.SubContent
          alignOffset={-1}
          sideOffset={8}
          className={twMerge(
            'shadow-lg border-2 border-palette-blue-ice bg-white w-40',
            className,
          )}
        >
          {Object.entries(subGroup).map(([name, link]) => (
            <GroupedNavigationItem key={name} name={name} link={link} />
          ))}
        </Menubar.SubContent>
      </Menubar.Portal>
    </Menubar.Sub>
  );
};
