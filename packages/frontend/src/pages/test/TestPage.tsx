import { Box, Flex, Text } from '@radix-ui/themes';

import { GroupedNavigation } from '@/components/input/selectInput/groupedNavigation/GroupedNavigation';
import { Section } from '@/components/layout/Section';

const TestPage = () => {
  return (
    <Box className="w-lvw h-lvh bg-palette-gray-neutral px-10 pt-30">
      <Flex direction="column" align="end" className="w-full gap-2">
        <Flex align="center" className="gap-4">
          <Text className="text-xl">Graph type: </Text>
          <GroupedNavigation
            navigationGroups={_navigationGroups}
            className="w-100"
            classNameGroup="w-50"
            classNameSubGroup="w-50"
          />
        </Flex>
        <Section className="h-120"></Section>
      </Flex>
    </Box>
  );
};

const _navigationGroups = {
  pizza: {
    mozzarella: '/test',
    pepperoni: { cheesed: '/pizza/p', bare: '/pizza/p?b=1' },
  },
  sushi: {
    salmon: '/sushi/s',
    caviar: { cheesed: '/pizza/p', bare: '/pizza/p?b=1' },
  },
};

export default TestPage;
