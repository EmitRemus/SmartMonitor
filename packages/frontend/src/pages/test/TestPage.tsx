import { Flex } from '@radix-ui/themes';

import { GroupedNavigation } from '@/components/input/selectInput/groupedNavigation/GroupedNavigation';
import { Section } from '@/components/layout/Section';

const TestPage = () => {
  return (
    <Flex
      display="flex"
      align="center"
      justify="center"
      className="w-lvw h-lvh"
    >
      <Section>
        <GroupedNavigation
          className="fixed top-0 left-0 z-10 w-full"
          navigationGroups={{
            pizza: {
              mozzarella: '/test',
              pepperoni: { cheesed: '/pizza/p', bare: '/pizza/p?b=1' },
            },
            sushi: { salmon: '/sushi/s', caviar: '/pizza/c' },
          }}
        />
      </Section>
    </Flex>
  );
};

export default TestPage;
