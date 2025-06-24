import './globals.css';

import type { Metadata } from 'next';

import { generateMetadata } from '@/utils/generateMetadata';

import { pretendard } from './fonts';

export const metadata: Metadata = generateMetadata();

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="kr">
      <body className={`${pretendard.variable} font-pretendard`}>{children}</body>
    </html>
  );
};

export default RootLayout;
