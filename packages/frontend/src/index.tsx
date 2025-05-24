import { Theme } from '@radix-ui/themes';
import '@styles/cssHacksRadix.css';
import '@styles/index.css';
import '@styles/scrollbar.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router';

import { SidebarLayout } from '@/layout/sidebarLayout/sidebarLayout';

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
    <div className="font-[Raleway]">
      <Theme appearance="light" accentColor="blue">
        <RouterProvider router={router} />
      </Theme>
    </div>
  </StrictMode>,
);
