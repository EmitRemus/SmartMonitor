import {Theme} from '@radix-ui/themes';

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {RouterProvider, createBrowserRouter} from 'react-router';

import {Home} from './pages/home';

const router = createBrowserRouter([
    {
        path: '/',
        Component: Home,
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Theme appearance="light" accentColor="cyan">
            <RouterProvider router={router} />
        </Theme>
    </StrictMode>,
);
