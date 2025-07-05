'use client';

import { PageWrapper } from '@/layouts';

import ActionButtons from './HeaderSection';
import ResumeSection from './ResumeSection';

const ResumeDetail = () => {
  return (
    <PageWrapper className="max-w-4xl my-12">
      <ActionButtons />
      <ResumeSection />
    </PageWrapper>
  );
};

export default ResumeDetail;
