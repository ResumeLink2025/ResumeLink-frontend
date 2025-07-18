import './globals.css';

import type { Metadata } from 'next';

import ChatWrapper from '@/layouts/ChatWrapper';
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
          <ChatWrapper />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
