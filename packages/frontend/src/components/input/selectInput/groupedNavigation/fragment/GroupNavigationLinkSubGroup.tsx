import { GroupedNavigationItem } from '@/components/input/selectInput/groupedNavigation/fragment/GroupedNavigationItem';
import { GroupedNavigationSubGroup } from '@/components/input/selectInput/groupedNavigation/fragment/GroupedNavigationSubGroup';
import type { GroupedNavigationTypes } from '@/components/input/selectInput/groupedNavigation/type/groupedNavigation.types';

interface GroupedNavigationLinkSubGroupProp {
  group: Record<
    GroupedNavigationTypes.name,
    GroupedNavigationTypes.link | GroupedNavigationTypes.NavigationSubGroup
  >;
  classNameSubGroup?: string;
}

export const GroupedNavigationLinkSubGroup = ({
  group,
  classNameSubGroup,
}: GroupedNavigationLinkSubGroupProp) => {
  return Object.entries(group).map(([name, groupValue]) =>
    typeof groupValue === 'string' ? (
      <GroupedNavigationItem key={name} name={name} link={groupValue} />
    ) : (
      <GroupedNavigationSubGroup
        key={name}
        name={name}
        subGroup={groupValue}
        className={classNameSubGroup}
      />
    ),
  );
};
