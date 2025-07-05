import { Toaster } from 'react-hot-toast';

import LayoutProvider from './LayoutProvider';
import TanstackQueryProvider from './TanstackQueryProvider';

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <TanstackQueryProvider>
      <LayoutProvider>
        {children}
        <Toaster />
      </LayoutProvider>
    </TanstackQueryProvider>
  );
};

export default Providers;
