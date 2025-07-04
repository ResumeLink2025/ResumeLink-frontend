import Image from 'next/image';

import { Tag, Typography } from '@/components/common';
import { IMAGE_BLUR } from '@/constants/imageBlur';
import { PROJECT_INFO } from '@/fixtures/project';
import { PageWrapper } from '@/layouts';

import ContentField from './ContentField';
import TagField from './TagField';

const ProjectDetail = () => {
  return (
    <PageWrapper className="max-w-4xl mt-6 mb-10 flex flex-col gap-10">
      <div className="flex gap-8">
        <Image
          src={PROJECT_INFO.imageUrl}
          width={230}
          height={230}
          alt="project-image"
          className="rounded-[10px] shrink-0"
          placeholder="blur"
          blurDataURL={IMAGE_BLUR}
        />
        <div className="flex flex-col gap-5">
          <Typography type="heading1">{PROJECT_INFO.projectName}</Typography>
          <div className="flex flex-col gap-2">
            <Typography type="title2">프로젝트 진행 기간</Typography>
            <div className="flex gap-3">
              <div className="rounded-[10px] px-3 py-2 bg-gray-10">
                <Typography type="body2" className="text-gray-60">
                  {PROJECT_INFO.startDate} ~ {PROJECT_INFO.endData ? PROJECT_INFO.endData : '진행중'}
                </Typography>
              </div>
              <Tag size="large">{PROJECT_INFO.status}</Tag>
            </div>
          </div>
          <TagField title="프로젝트 태그" tags={PROJECT_INFO.tags} />
        </div>
      </div>
      <TagField title="사용한 기술스택" tags={PROJECT_INFO.skills} />
      <ContentField title="프로젝트 설명" content={PROJECT_INFO.projectDesc} />
      <ContentField title="프로젝트에서 맡은 역할" content={PROJECT_INFO.role} />
    </PageWrapper>
  );
};

export default ProjectDetail;
