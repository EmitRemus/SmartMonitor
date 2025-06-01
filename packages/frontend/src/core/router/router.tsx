import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';

import { SidebarLayout } from '@/layout/sidebarLayout/sidebarLayout';
import AllBuildings from '@/pages/building/all/allBuildings';
import AllPipes from '@/pages/pipe/all/allPipes';
import AllPumpStations from '@/pages/pumpStation/all/allPumpStations';

const SidesPaddingLayout = lazy(
  () => import('@/layout/sidesPaddingLayout/sidesPaddingLayout'),
);

const Home = lazy(() => import('@/pages/home/home'));
const Settings = lazy(() => import('@/pages/settings/settings'));
const AllApartments = lazy(() => import('@/pages/apartment/all/allApartments'));
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
