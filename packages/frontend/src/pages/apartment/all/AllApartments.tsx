import { Box } from '@radix-ui/themes';

import { BorderedTableDataPresentation } from '@/components/dataPresentation/borderedTableDataPresentation/BorderedTableDataPresentation';
import { useFetchAllApartments } from '@/hooks/dataFetch/tables/specific/useFetch.allApartments.js';

const AllApartments = () => {
  const { data, onEndReached, isDataFinished } = useFetchAllApartments();

  return (
    <Box className="pt-40 w-full">
      <h2 className="text-3xl pl-5 pb-1">All apartments</h2>
      <BorderedTableDataPresentation
        className="h-100"
        data={data}
        onEndReached={onEndReached}
        isDataFinished={isDataFinished}
      />
    </Box>
  );
};

export default AllApartments;
