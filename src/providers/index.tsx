'use client';

import { OverlayProvider } from '@toss/use-overlay';
import { Toaster } from 'react-hot-toast';

import AuthProvider from './AuthProvider';
import LayoutProvider from './LayoutProvider';
import TanstackQueryProvider from './TanstackQueryProvider';

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <TanstackQueryProvider>
      <OverlayProvider>
        <LayoutProvider>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </LayoutProvider>
      </OverlayProvider>
    </TanstackQueryProvider>
  );
};

export default Providers;
