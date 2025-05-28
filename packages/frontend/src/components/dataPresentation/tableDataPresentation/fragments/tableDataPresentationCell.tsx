import type {
  TableDataPresentationItemType,
  TableDataPresentationItemValueType,
} from '@/components/dataPresentation/tableDataPresentation/types/tableDataPresentationItem';

interface TableDataPresentationCellProps {
  data: TableDataPresentationItemValueType | null;
  type: TableDataPresentationItemType;
}

export const TableDataPresentationCell = ({
  data,
  type,
}: TableDataPresentationCellProps) => {
  return (
    <h1>
      {data}
      {type}
    </h1>
  );
};
