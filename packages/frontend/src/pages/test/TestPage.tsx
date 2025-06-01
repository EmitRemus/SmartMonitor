import { Flex } from '@radix-ui/themes';

import { GroupedNavigation } from '@/components/input/selectInput/groupedNavigation/GroupedNavigation';

const TestPage = () => {
  return (
    <Flex
      display="flex"
      align="center"
      justify="center"
      className="w-lvw h-lvh"
    >
      <GroupedNavigation
        navigationGroups={{
          pizza: {
            mozzarella: '/test',
            pepperoni: { cheesed: '/pizza/p', bare: '/pizza/p?b=1' },
          },
          sushi: { salmon: '/sushi/s', caviar: '/pizza/c' },
        }}
      />
    </Flex>
  );
};

export default TestPage;
