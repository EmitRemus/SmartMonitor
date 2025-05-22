import { Theme } from '@radix-ui/themes';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router';

import '../styles/index.css';
import { SidebarLayout } from './layout/sidebarLayout/sidebarLayout';
import { Home } from './pages/home/home';
import { Settings } from './pages/settings/settings';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SidebarLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme appearance="light" accentColor="blue">
      <RouterProvider router={router} />
    </Theme>
  </StrictMode>,
);
