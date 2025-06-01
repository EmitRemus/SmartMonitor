import { Box } from '@radix-ui/themes';

import { BorderedTableDataPresentation } from '@/components/dataPresentation/borderedTableDataPresentation/BorderedTableDataPresentation';
import type { TableDataPresentationItemType } from '@/components/dataPresentation/tableDataPresentation/types/tableDataPresentationItem';
import { useFetchAllBuildings } from '@/hooks/dataFetch/tables/specific/useFetch.allBuildings';

const AllBuildings = () => {
  const { data, onEndReached, isDataFinished } = useFetchAllBuildings();

  const newColumns: Record<string, TableDataPresentationItemType> = {};
  Object.entries(data.columns).forEach(([key, value]) => {
    if (key == 'Building ID') {
      newColumns['alasfglasdsfj sadlfgkjasdfgl; asdfsafasdf'] = value;
    } else {
      newColumns[key] = value;
    }
  });

  data.columns = newColumns;

  return (
    <Box className="pt-40 w-full">
      <h2 className="text-3xl pl-5 pb-1">All buildings</h2>
      <BorderedTableDataPresentation
        className="h-100"
        data={data}
        onEndReached={onEndReached}
        isDataFinished={isDataFinished}
      />
    </Box>
  );
};

export default AllBuildings;
