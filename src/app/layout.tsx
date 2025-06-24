import './globals.css';

import type { Metadata } from 'next';

import { generateMetadata } from '@/utils/generateMetadata';

import { pretendard } from './fonts';

export const metadata: Metadata = generateMetadata();

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  const 사용하지않는코드 = 'trash code';
  console.log(사용하지않는코드);

  return (
    <html lang="kr">
      <body className={`${pretendard.variable} font-pretendard`}>{children}</body>
    </html>
  );
};

export default RootLayout;
