import { Theme } from '@radix-ui/themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import type { ReactNode } from 'react';

interface AppWrapperProps {
  children: ReactNode | ReactNode[];
}

export const AppWrapper = ({ children }: AppWrapperProps) => {
  return (
    <div className="font-[Raleway]">
      <QueryClientProvider client={_queryClient}>
        <Theme appearance="light" accentColor="blue">
          {children}
        </Theme>
      </QueryClientProvider>{' '}
    </div>
  );
};

const _queryClient = new QueryClient();
