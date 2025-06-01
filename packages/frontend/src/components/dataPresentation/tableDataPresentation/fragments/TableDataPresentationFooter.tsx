import { Flex, Table } from '@radix-ui/themes';

import { Loader2Icon } from 'lucide-react';

export const TableDataPresentationFooter = () => {
  return (
    <Table.Cell colSpan={100}>
      <Flex align="end" justify="center" className="h-12">
        <Loader2Icon className="animate-spin w-6 h-6 text-palette-blue-sapphire" />
      </Flex>
    </Table.Cell>
  );
};
