import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';

import { SidebarLayout } from '@/layout/sidebarLayout/SidebarLayout';
import AllBuildings from '@/pages/building/all/AllBuildings';
import AllPipes from '@/pages/pipe/all/AllPipes';
import AllPumpStations from '@/pages/pumpStation/all/AllPumpStations';

const SidesPaddingLayout = lazy(
  () => import('@/layout/sidesPaddingLayout/SidesPaddingLayout'),
);

const Home = lazy(() => import('@/pages/home/Home'));
const Settings = lazy(() => import('@/pages/settings/Settings'));
const AllApartments = lazy(() => import('@/pages/apartment/all/AllApartments'));
const TestPage = lazy(() => import('@/pages/test/TestPage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SidebarLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'test', element: <TestPage /> },
      { path: 'settings', element: <Settings /> },
      {
        element: <SidesPaddingLayout />,
        children: [
          {
            path: 'apartment',
            children: [{ path: 'all', element: <AllApartments /> }],
          },
          {
            path: 'building',
            children: [{ path: 'all', element: <AllBuildings /> }],
          },
          {
            path: 'pump-station',
            children: [{ path: 'all', element: <AllPumpStations /> }],
          },
          {
            path: 'pipe',
            children: [{ path: 'all', element: <AllPipes /> }],
          },
        ],
      },
    ],
  },
]);
