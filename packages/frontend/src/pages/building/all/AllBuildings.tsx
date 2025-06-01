import { Box } from '@radix-ui/themes';

import { BorderedTableDataPresentation } from '@/components/dataPresentation/borderedTableDataPresentation/BorderedTableDataPresentation';
import { useFetchAllBuildings } from '@/hooks/dataFetch/tables/specific/useFetch.allBuildings';

const AllBuildings = () => {
  const { data, onEndReached, isDataFinished } = useFetchAllBuildings();

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
