import { Box } from '@radix-ui/themes';

import { BorderedTableDataPresentation } from '@/components/dataPresentation/borderedTableDataPresentation/borderedTableDataPresentation';
import { useFetchAllPumpStations } from '@/hooks/dataFetch/tables/specific/useFetch.allPumpStations';

const AllPumpStations = () => {
  const { data, onEndReached, isDataFinished } = useFetchAllPumpStations();

  return (
    <Box className="pt-40 w-full">
      <h2 className="text-3xl pl-5 pb-1">All pump stations</h2>
      <BorderedTableDataPresentation
        className="h-100"
        data={data}
        onEndReached={onEndReached}
        isDataFinished={isDataFinished}
      />
    </Box>
  );
};

export default AllPumpStations;
