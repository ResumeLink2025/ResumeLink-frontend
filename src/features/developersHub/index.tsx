'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

import { PageWrapper } from '@/layouts';

import ProfileList from './ProfileList';
import SearchSection from './SearchSection';

const DevelopersHub = () => {
  const params = useSearchParams();
  const listType = params.get('type') as string;

  return (
    <PageWrapper>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchSection />
        <ProfileList listType={listType} />
      </Suspense>
    </PageWrapper>
  );
};

export default DevelopersHub;
