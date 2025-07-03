import { PageWrapper } from '@/layouts';

import ProfileList from './ProfileList';
import SearchSection from './SearchSection';

const DevelopersHub = () => {
  return (
    <PageWrapper>
      <SearchSection />
      <ProfileList />
    </PageWrapper>
  );
};

export default DevelopersHub;
