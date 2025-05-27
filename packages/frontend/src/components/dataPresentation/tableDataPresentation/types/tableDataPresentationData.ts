import type {
  TableDataPresentationItemType,
  TableDataPresentationItemValueType,
} from '@/components/dataPresentation/tableDataPresentation/types/tableDataPresentationItem';

export type TableDataPresentationData = {
  columns: Record<string, TableDataPresentationItemType>;
  data: (TableDataPresentationItemValueType | null)[][];
};
