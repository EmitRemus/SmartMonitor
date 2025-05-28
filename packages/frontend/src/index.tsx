import { Theme } from '@radix-ui/themes';
import '@styles/cssHacksRadix.css';
import '@styles/index.css';
import '@styles/scrollbar.css';

import { StrictMode, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router';

import { SidebarLayout } from '@/layout/sidebarLayout/sidebarLayout';

const SidesPaddingLayout = lazy(
  () => import('@/layout/sidesPaddingLayout/sidesPaddingLayout'),
);

const Home = lazy(() => import('@/pages/home/home'));
const Settings = lazy(() => import('@/pages/settings/settings'));
const AllApartments = lazy(() => import('@/pages/apartment/all/allApartments'));

const router = createBrowserRouter([
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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="font-[Raleway]">
      <Theme appearance="light" accentColor="blue">
        <RouterProvider router={router} />
      </Theme>
    </div>
  </StrictMode>,
);
