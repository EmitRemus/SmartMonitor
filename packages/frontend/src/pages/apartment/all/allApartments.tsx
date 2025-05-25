import { Box } from '@radix-ui/themes';

import { BorderedBox } from '@/components/layout/borderedBox';

const AllApartments = () => {
  return (
    <Box className="pt-40 w-full">
      <h2 className="text-3xl">All apartments</h2>
      <BorderedBox></BorderedBox>
    </Box>
  );
};

export default AllApartments;
