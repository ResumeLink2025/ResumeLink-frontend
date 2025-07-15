import { Typography } from '@/components/common';
import { PageWrapper } from '@/layouts';

import ProjectFormSection from './ProjectFormSection';

export interface ProjectParamsProps {
  id?: string;
}

const Project = ({ id }: ProjectParamsProps) => {
  return (
    <PageWrapper className="max-w-3xl my-12">
      <Typography type="heading1">{id ? '프로젝트 수정하기' : '프로젝트 작성하기'}</Typography>
      <ProjectFormSection id={id} />
    </PageWrapper>
  );
};

export default Project;
