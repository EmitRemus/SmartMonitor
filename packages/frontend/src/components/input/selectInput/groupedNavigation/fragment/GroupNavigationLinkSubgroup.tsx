import { GroupedNavigationItem } from '@/components/input/selectInput/groupedNavigation/fragment/GroupedNavigationItem';
import { GroupedNavigationSubgroup } from '@/components/input/selectInput/groupedNavigation/fragment/GroupedNavigationSubgroup';
import type { GroupedNavigationTypes } from '@/components/input/selectInput/groupedNavigation/type/groupedNavigation.types';

interface GroupedNavigationLinkSubgroupProp {
  group: Record<
    GroupedNavigationTypes.name,
    GroupedNavigationTypes.link | GroupedNavigationTypes.NavigationSubGroup
  >;
}

export const GroupedNavigationLinkSubgroup = ({
  group,
}: GroupedNavigationLinkSubgroupProp) => {
  return Object.entries(group).map(([name, groupValue]) =>
    typeof groupValue === 'string' ? (
      <GroupedNavigationItem key={name} name={name} link={groupValue} />
    ) : (
      <GroupedNavigationSubgroup key={name} name={name} subGroup={groupValue} />
    ),
  );
};
