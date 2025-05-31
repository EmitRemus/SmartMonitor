import { Box } from '@radix-ui/themes';

import { BorderedTableDataPresentation } from '@/components/dataPresentation/borderedTableDataPresentation/borderedTableDataPresentation';
import { useFetchAllApartments } from '@/hooks/dataFetch/useFetch.allApartments';

const AllApartments = () => {
  const { data, onEndReached, isDataFinished } = useFetchAllApartments();

  return (
    <Box className="pt-40 w-full">
      <h2 className="text-3xl pl-5 pb-1">All apartments</h2>
      <BorderedTableDataPresentation
        data={data}
        onEndReached={onEndReached}
        isDataFinished={isDataFinished}
      />
    </Box>
  );
};

export default AllApartments;
