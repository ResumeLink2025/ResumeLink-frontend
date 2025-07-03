import LayoutProvider from './LayoutProvider';
import TanstackQueryProvider from './TanstackQueryProvider';

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <TanstackQueryProvider>
      <LayoutProvider>{children}</LayoutProvider>
    </TanstackQueryProvider>
  );
};

export default Providers;
