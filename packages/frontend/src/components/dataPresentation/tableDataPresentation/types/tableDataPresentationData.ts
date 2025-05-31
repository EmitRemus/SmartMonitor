import type {
  TableDataPresentationItem,
  TableDataPresentationItemType,
} from '@/components/dataPresentation/tableDataPresentation/types/tableDataPresentationItem';

export type TableDataPresentationData = {
  columns: Record<string, TableDataPresentationItemType>;
  data: (TableDataPresentationItem | null)[][];
  dataId: string[];
};
