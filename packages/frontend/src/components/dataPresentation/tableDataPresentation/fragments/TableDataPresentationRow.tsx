import { TableDataPresentationCell } from '@/components/dataPresentation/tableDataPresentation/fragments/TableDataPresentationCell';
import type { TableDataPresentationItem } from '@/components/dataPresentation/tableDataPresentation/types/tableDataPresentationItem';

interface TableDataPresentationRowProps {
  rowData: (TableDataPresentationItem | null)[];
  columns: string[];
}

export const TableDataPresentationRow = ({
  rowData,
  columns,
}: TableDataPresentationRowProps) => {
  return (
    <>
      {rowData.map((_, index) => (
        <td key={columns[index]}>
          <TableDataPresentationCell
            data={rowData[index]}
            isFirst={index == 0}
          />
        </td>
      ))}
    </>
  );
};
