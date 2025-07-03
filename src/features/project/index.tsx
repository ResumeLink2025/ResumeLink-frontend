import { Typography } from '@/components/common';
import { PageWrapper } from '@/layouts';

import ProjectFormSection from './ProjectFormSection';

const Project = () => {
  return (
    <PageWrapper className="max-w-3xl my-12">
      <Typography type="heading1">프로젝트 작성하기</Typography>
      <ProjectFormSection />
    </PageWrapper>
  );
};

export default Project;
