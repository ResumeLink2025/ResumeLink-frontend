import { PageWrapper } from '@/layouts';

import ResumeFormSection from './ResumeFormSection';
import UserInfoSection from './UserInfoSection';

const Resume = () => {
  return (
    <PageWrapper className="max-w-3xl my-12">
      <UserInfoSection />
      <ResumeFormSection />
    </PageWrapper>
  );
};

export default Resume;
