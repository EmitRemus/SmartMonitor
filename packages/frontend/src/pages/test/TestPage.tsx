import { Flex } from '@radix-ui/themes';

import { GroupedNavigation } from '@/components/input/selectInput/groupedNavigation/GroupedNavigation';
import { Section } from '@/components/layout/Section';

const TestPage = () => {
  return (
    <Flex
      display="flex"
      align="center"
      justify="center"
      className="w-lvw h-lvh bg-palette-gray-neutral"
    >
      <Section className="w-[90%] h-90">
        <GroupedNavigation
          className="w-100"
          classNameGroup="w-50"
          classNameSubGroup="w-50"
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
