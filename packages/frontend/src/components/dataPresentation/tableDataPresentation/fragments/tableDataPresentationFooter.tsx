import { Flex, Table } from '@radix-ui/themes';

import { Loader2Icon } from 'lucide-react';

export const TableDataPresentationFooter = () => {
  return (
    <Table.Cell colSpan={100}>
      <Flex align="end" justify="center" className="h-10">
        <Loader2Icon className="animate-spin w-5 h-5" />
      </Flex>
    </Table.Cell>
  );
};
