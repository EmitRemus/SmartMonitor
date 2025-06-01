import { Flex, Text } from '@radix-ui/themes';

import { ChevronDown } from 'lucide-react';
import { Tooltip } from 'radix-ui';
import { twJoin } from 'tailwind-merge';

interface TableDataPresentationHeaderTextProp {
  text: string;
}

export const TableDataPresentationHeaderText = ({
  text: textProp,
}: TableDataPresentationHeaderTextProp) => {
  const text = textProp.slice(0, 1).toLocaleUpperCase() + textProp.slice(1);

  return (
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={200}>
        <Tooltip.Trigger asChild>
          <Text
            className={twJoin(
              'max-w-60 whitespace-nowrap overflow-hidden overflow-ellipsis',
              'cursor-help',
            )}
          >
            {text}
          </Text>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content sideOffset={5}>
            <Flex
              direction="column"
              align="center"
              className="bg-palette-gray-pebble px-4 pt-2 shadow-sm gap-2"
            >
              {text}
              <ChevronDown className="animate-bounce" />
            </Flex>
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
