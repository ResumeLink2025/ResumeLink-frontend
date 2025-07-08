'use client';

import { OverlayProvider } from '@toss/use-overlay';
import { Toaster } from 'react-hot-toast';

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
          {children}
          <Toaster />
        </LayoutProvider>
      </OverlayProvider>
    </TanstackQueryProvider>
  );
};
export default Providers;
