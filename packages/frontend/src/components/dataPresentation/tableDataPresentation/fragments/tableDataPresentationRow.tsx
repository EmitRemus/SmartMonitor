import { TableDataPresentationCell } from '@/components/dataPresentation/tableDataPresentation/fragments/tableDataPresentationCell';
import type {
  TableDataPresentationItemType,
  TableDataPresentationItemValueType,
} from '@/components/dataPresentation/tableDataPresentation/types/tableDataPresentationItem';

interface TableDataPresentationRowProps {
  rowData: (TableDataPresentationItemValueType | null)[];
  rowTypes: TableDataPresentationItemType[];
  columns: string[];
}

// TODO: use in hook
// function _shrinkExpandRowDataOnInvalidProps({
//   rowData,
//   rowTypes,
// }: TableDataPresentationRowProps): (TableDataPresentationItemValueType | null)[] {
//   if (rowData.length == rowTypes.length) return rowData;

//   // fallback - shouldn't happened often (at all)
//   console.error('Invalid props in TableDataPresentationRow');

//   return rowData
//     .slice(0, rowTypes.length)
//     .concat(Array(rowTypes.length - rowData.length).fill(null));
// }

// export const TableDataPresentationRow = ({
//   rowData: rowDataUnchecked,
//   rowTypes,
// }: TableDataPresentationRowProps) => {
//   const rowData = _shrinkExpandRowDataOnInvalidProps({
//     rowData: rowDataUnchecked,
//     rowTypes,
//   });
// };

export const TableDataPresentationRow = ({
  rowData,
  rowTypes,
  columns,
}: TableDataPresentationRowProps) => {
  return (
    <>
      {rowTypes.map((_, index) => (
        <td key={columns[index]}>
          <TableDataPresentationCell
            data={rowData[index]}
            type={rowTypes[index]}
            isFirst={index == 0}
          />
        </td>
      ))}
    </>
  );
};
