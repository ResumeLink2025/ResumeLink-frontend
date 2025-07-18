import { Suspense } from 'react';

import DevelopersHub from '@/features/developersHub';

const DevelopersHubPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <DevelopersHub />
  </Suspense>
);

export default DevelopersHubPage;
