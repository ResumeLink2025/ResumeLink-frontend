'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { PageWrapper } from '@/layouts';

import ProfileList from './ProfileList';
import SearchSection from './SearchSection';

const DevelopersHub = () => {
  const params = useSearchParams();
  const [listType, setListType] = useState<string | null>(null);

  useEffect(() => {
    const type = params.get('type');
    setListType(type);
  }, [params]);

  if (listType === null) {
    return <div>Loading...</div>;
  }

  return (
    <PageWrapper>
      <SearchSection />
      <ProfileList listType={listType} />
    </PageWrapper>
  );
};

export default DevelopersHub;
