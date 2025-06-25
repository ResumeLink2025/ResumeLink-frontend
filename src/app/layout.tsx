import './globals.css';

import type { Metadata } from 'next';

import LayoutProvider from '@/providers/LayoutProvider';
import { generateMetadata } from '@/utils/generateMetadata';

import { pretendard } from './fonts';

export const metadata: Metadata = generateMetadata();

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} font-pretendard`}>
        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  );
};

export default RootLayout;
