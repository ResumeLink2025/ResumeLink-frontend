'use client';

import Image from 'next/image';

import { Tag, Typography } from '@/components/common';
import { IMAGE_BLUR } from '@/constants/imageBlur';
import { RESUME_RESPONSE } from '@/fixtures/resume';
import { PageWrapper } from '@/layouts';
import { cn } from '@/utils/styleMerge';

import ActivityList from './ActivityList';
import Certificate from './Certificate';
import ActionButtons from './HeaderSection';
import useResumeDetail from './hooks/useResumeDetail';

const ResumeDetail = () => {
  const { isThemeBlack, resumeRef, onClickDownLoadResume } = useResumeDetail();

  return (
    <PageWrapper className="max-w-4xl my-12">
      <ActionButtons onClickDownLoadResume={onClickDownLoadResume} />
      <div className={cn('border rounded-xl', isThemeBlack ? 'bg-gray-70' : 'border-gray-40')}>
        <div ref={resumeRef} className={cn('p-8 flex flex-col gap-14', isThemeBlack && 'dark')}>
          <div className="flex gap-8">
            <Image
              src={RESUME_RESPONSE.imageUrl}
              className={cn('rounded-[10px]', isThemeBlack && 'border border-gray-50 object-cover')}
              width={170}
              height={170}
              placeholder="blur"
              blurDataURL={IMAGE_BLUR}
              alt="user-image"
            />
            <div className="flex flex-col justify-center gap-3">
              <Typography type="hero2" className="text-current-mode">
                {RESUME_RESPONSE.title}
              </Typography>
              <Typography type="title1" className={isThemeBlack ? 'text-gray-30' : 'text-gray-60'}>
                {RESUME_RESPONSE.positions.map((position) => position).join(', ')}
              </Typography>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Typography type="heading2" className="text-current-mode">
              자기 소개
            </Typography>
            <div className={cn('py-3 px-4 rounded-[10px]', isThemeBlack ? 'bg-gray-60' : 'bg-gray-10')}>
              <Typography type="body1" className={isThemeBlack ? 'text-gray-30' : 'text-gray-70'}>
                {RESUME_RESPONSE.summary}
              </Typography>
            </div>
          </div>
          <ActivityList
            isThemeBlack={isThemeBlack}
            title="개발 경험"
            activities={RESUME_RESPONSE.activities}
          />
          <ActivityList isThemeBlack={isThemeBlack} title="프로젝트" activities={RESUME_RESPONSE.projects} />
          <div className="flex flex-col gap-3">
            <Typography type="heading2" className="text-current-mode">
              기술 스택
            </Typography>
            <div className="flex flex-wrap gap-3">
              {RESUME_RESPONSE.skills.map((skill) => (
                <Tag key={skill} size="large" styleType={isThemeBlack ? 'primary' : 'outline'}>
                  {skill}
                </Tag>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Typography type="heading2" className="text-current-mode">
              보유 자격증
            </Typography>
            <div className="flex flex-wrap gap-20 mt-3">
              {RESUME_RESPONSE.certificates.map((certificate, idx) => (
                <Certificate key={idx} isThemeBlack={isThemeBlack} {...certificate} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ResumeDetail;
