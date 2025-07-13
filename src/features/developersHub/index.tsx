import { Suspense } from 'react';

import { PageWrapper } from '@/layouts';

import ProfileList from './ProfileList';
import SearchSection from './SearchSection';

const DevelopersHub = () => {
  return (
    <PageWrapper>
      <Suspense>
        <SearchSection />
      </Suspense>
      <ProfileList />
    </PageWrapper>
  );
};

export default DevelopersHub;
