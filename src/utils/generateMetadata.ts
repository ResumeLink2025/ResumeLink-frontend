import type { Metadata } from 'next';

import { META_DATA } from '@/constants/metadata';

export const generateMetadata = (): Metadata => {
  return {
    title: META_DATA.title,
    icons: META_DATA.icons,
    description: META_DATA.description,
    keywords: [...META_DATA.keyword],
    openGraph: {
      title: META_DATA.title,
      description: META_DATA.description,
      locale: 'ko_KR',
      type: 'website',
    },
    twitter: {
      title: META_DATA.title,
      description: META_DATA.description,
    },
  };
};
