import { Box, Flex, Text } from '@radix-ui/themes';

import { Outlet } from 'react-router';

import { GroupedNavigation } from '@/components/input/selectInput/groupedNavigation/GroupedNavigation';
import { Section } from '@/components/layout/Section';

const ChartSelectorLayout = () => {
  return (
    <>
      <Box className="fixed w-lvw h-lvh bg-palette-gray-pebble -z-10" />
      <Box className="px-10 pt-30">
        <Flex direction="column" align="end" className="w-full gap-2">
          <Flex align="center" className="gap-4">
            <Text className="text-xl">Chart type: </Text>
            <GroupedNavigation
              navigationGroups={_navigationGroups}
              className="w-100"
              classNameGroup="w-50"
              classNameSubGroup="w-50"
            />
          </Flex>
          <Section className="min-h-120">
            <Outlet />
          </Section>
        </Flex>
      </Box>
    </>
  );
};

const _navigationGroups = {
  'Time series': {
    Water: {
      Hot: '/statistics/charts/time-series/water-hot',
      Cold: '/statistics/charts/time-series/water-cold',
    },
  },
  Analytics: {
    'Fraud risk': '/statistics/charts/analytics/fraud-risk',
  },
};

export default ChartSelectorLayout;
