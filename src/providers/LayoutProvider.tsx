import Footer from '@/features/layouts/Footer';
import Header from '@/features/layouts/Header';

interface LayoutProviderProps {
  children: React.ReactNode;
}

const LayoutProvider = ({ children }: LayoutProviderProps) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default LayoutProvider;
