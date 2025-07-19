'use client';

import Image from 'next/image';

import { Tag, Typography } from '@/components/common';
import { IMAGE_BLUR } from '@/constants/imageBlur';
import { createCoffeeChat } from '@/features/chat/apis/chatApi';
import ProjectDetailSkeleton from '@/features/skeleton/project/DetailSkeleton';
import useGetProjectDetail from '@/hooks/apis/project/useGetProjectDetail';
import { PageWrapper } from '@/layouts';
import { formatDate } from '@/utils/date';
import { getProjectStatus } from '@/utils/getProjectStatus';

import ActionButtons from './ActionButtons';
import ContentField from './ContentField';
import TagField from './TagField';

interface ProjectDetailProps {
  id: string;
}

const ProjectDetail = ({ id }: ProjectDetailProps) => {
  const { data: projectDetail, isLoading } = useGetProjectDetail(id, !!id);

  if (isLoading) {
    return <ProjectDetailSkeleton />;
  }

  return (
    <PageWrapper className="max-w-4xl mt-6 mb-10 flex flex-col gap-10 px-4">
      <div className="flex flex-col project-md:flex-row gap-8">
        {projectDetail?.imgUrl ? (
          <Image
            src={projectDetail.imgUrl}
            width={190}
            height={190}
            alt={projectDetail.imgUrl}
            className="rounded-[10px] shrink-0 w-auto project-md:w-[190px] h-[190px] object-cover"
            placeholder="blur"
            blurDataURL={IMAGE_BLUR}
          />
        ) : (
          <div className="bg-gray-30 size-[230px] shrink-0 rounded-[10px]" />
        )}
        <div className="flex flex-col w-full gap-5">
          <div className="flex items-center justify-between">
            <Typography type="heading1">{projectDetail?.projectName}</Typography>
            <ActionButtons
              userId={projectDetail?.userId}
              projectNumber={projectDetail?.projectNumber}
              requestCoffeeChat={async () => {
                if (!projectDetail?.userId) return;
                await createCoffeeChat(projectDetail.userId);
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Typography type="title2">프로젝트 진행 기간</Typography>
            <div className="flex gap-3">
              <div className="rounded-[10px] px-3 py-2 bg-gray-10">
                <Typography type="body2" className="text-gray-60">
                  {projectDetail?.startDate && formatDate(projectDetail?.startDate)} ~{' '}
                  {projectDetail?.endDate ? formatDate(projectDetail.endDate) : '진행중'}
                </Typography>
              </div>
              <Tag size="large">{getProjectStatus(String(projectDetail?.status))}</Tag>
            </div>
          </div>
        </div>
      </div>
      <TagField
        title="사용한 기술스택"
        tags={[...(projectDetail?.skill.generalSkills ?? []), ...(projectDetail?.skill.customSkills ?? [])]}
      />
      <ContentField title="프로젝트 설명" content={projectDetail?.projectDesc || ''} />
      <ContentField title="프로젝트에서 맡은 역할" content={projectDetail?.role || ''} />
    </PageWrapper>
  );
};

export default ProjectDetail;
