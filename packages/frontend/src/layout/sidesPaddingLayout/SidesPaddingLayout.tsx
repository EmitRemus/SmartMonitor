import { Box } from '@radix-ui/themes';

import { Outlet } from 'react-router';

const SidesPaddingLayout = () => {
  return (
    <Box className="px-25">
      <Outlet />
    </Box>
  );
};

export default SidesPaddingLayout;
