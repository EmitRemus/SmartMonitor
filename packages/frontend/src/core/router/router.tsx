import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';

import { SidebarLayout } from '@/layout/sidebarLayout/sidebarLayout';

const SidesPaddingLayout = lazy(
  () => import('@/layout/sidesPaddingLayout/sidesPaddingLayout'),
);

const Home = lazy(() => import('@/pages/home/home'));
const Settings = lazy(() => import('@/pages/settings/settings'));
const AllApartments = lazy(() => import('@/pages/apartment/all/allApartments'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SidebarLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'settings', element: <Settings /> },
      {
        element: <SidesPaddingLayout />,
        children: [
          {
            path: 'apartment',
            children: [{ path: 'all', element: <AllApartments /> }],
          },
        ],
      },
    ],
  },
]);
