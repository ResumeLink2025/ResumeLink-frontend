import { Suspense } from 'react';

import { Loader } from '@/components/common';
import DevelopersHub from '@/features/developersHub';

const DevelopersHubPage = () => (
  <Suspense fallback={<Loader />}>
    <DevelopersHub />
  </Suspense>
);

export default DevelopersHubPage;
