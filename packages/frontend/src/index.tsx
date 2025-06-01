import { environment } from '@config/environment';
import '@styles/cssHacksRadix.css';
import '@styles/index.css';
import '@styles/scrollbar.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';

import { AppWrapper } from '@/core/appWrapper/AppWrapper';
import { router } from '@/core/router/router';

const _App = (
  <StrictMode>
    <AppWrapper>
      <RouterProvider router={router} />
    </AppWrapper>
  </StrictMode>
);

if (environment.USE_MOCKED_BACKEND) {
  import('@test/mockBackend/browserWorker')
    .then(({ worker }) => {
      worker.start();
    })
    .then(() => {
      createRoot(document.getElementById('root')!).render(_App);
    });
} else {
  createRoot(document.getElementById('root')!).render(_App);
}
