import { Box } from '@radix-ui/themes';

import { BorderedTableDataPresentation } from '@/components/dataPresentation/borderedTableDataPresentation/BorderedTableDataPresentation';
import { useFetchAllPipes } from '@/hooks/dataFetch/tables/specific/useFetch.allPipes';

const AllPipes = () => {
  const { data, onEndReached, isDataFinished } = useFetchAllPipes();

  return (
    <Box className="pt-40 w-full">
      <h2 className="text-3xl pl-5 pb-1">All pipes</h2>
      <BorderedTableDataPresentation
        className="h-100"
        data={data}
        onEndReached={onEndReached}
        isDataFinished={isDataFinished}
      />
    </Box>
  );
};

export default AllPipes;
