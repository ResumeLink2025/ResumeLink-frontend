'use client';

import { PageWrapper } from '@/layouts';

import useDevelopersHub from './hooks/useDevelopersHub';
import ProfileList from './ProfileList';
import SearchSection from './SearchSection';

const DevelopersHub = () => {
  const listType = useDevelopersHub();

  if (!listType) return null;

  return (
    <PageWrapper>
      <SearchSection />
      <ProfileList listType={listType} />
    </PageWrapper>
  );
};

export default DevelopersHub;
