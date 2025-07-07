import './globals.css';

import type { Metadata } from 'next';

import Providers from '@/providers';
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
        <Providers>
          {children}
          <div id="portal-root" />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
