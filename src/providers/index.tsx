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
      <LayoutProvider>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </LayoutProvider>
    </TanstackQueryProvider>
  );
};

export default Providers;
