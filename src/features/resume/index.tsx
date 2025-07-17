import { PageWrapper } from '@/layouts';

import ResumeFormSection from './ResumeFormSection';

export interface ResumeProps {
  id?: string;
}

const Resume = ({ id }: ResumeProps) => {
  return (
    <PageWrapper className="max-w-3xl my-12">
      <ResumeFormSection id={id} />
    </PageWrapper>
  );
};

export default Resume;
