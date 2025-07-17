'use client';

import { useSearchParams } from 'next/navigation';

import { PageWrapper } from '@/layouts';

import ProfileList from './ProfileList';
import SearchSection from './SearchSection';

const DevelopersHub = () => {
  const params = useSearchParams();
  const listType = params.get('type') as string;

  return (
    <PageWrapper>
      <SearchSection />
      <ProfileList listType={listType} />
    </PageWrapper>
  );
};

export default DevelopersHub;
