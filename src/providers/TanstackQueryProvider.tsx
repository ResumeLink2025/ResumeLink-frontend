'use client';

import type { QueryClientConfig} from '@tanstack/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

interface TanstackQueryProviderProps {
  children: React.ReactNode;
}

const TanstackQueryProvider = ({ children }: TanstackQueryProviderProps) => {
  const queryOptions: QueryClientConfig = {
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnMount: false,
      },
    },
  };

  const [queryClient] = useState(() => new QueryClient(queryOptions));
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default TanstackQueryProvider;
