'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

import { Tag, Typography } from '@/components/common';
import type { ProjectDetailType } from '@/constants/project';
import { routeMainPage } from '@/constants/routes';
import useGetMyProject from '@/hooks/apis/project/useGetMyProject';
import { cn } from '@/utils/styleMerge';

interface ProjectFieldProps {
  selectedProjects: ProjectDetailType[];
  isSubmitted: boolean;
  errorMessage?: string;
  onClickProject: (project: ProjectDetailType) => void;
}

const ProjectField = ({ selectedProjects, isSubmitted, errorMessage, onClickProject }: ProjectFieldProps) => {
  const router = useRouter();
  const { data: myProjectList } = useGetMyProject();

  useEffect(() => {
    if (myProjectList && myProjectList.length < 1) {
      toast.error('하나 이상의 프로젝트 작성이 필요합니다.');

      router.push(routeMainPage);
    }
  }, [myProjectList, router]);

  return (
    <div className="p-5 border-2 border-dashed border-gray-60 rounded-[10px] flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Typography type="heading2">프로젝트 선택</Typography>
        <Tag size="small">필수</Tag>
      </div>
      <div className="flex flex-col gap-2">
        {myProjectList?.map((project) => (
          <div
            key={project.id}
            onClick={() => onClickProject(project)}
            className={cn(
              'p-3 border border-gray-40 rounded-[10px] cursor-pointer',
              selectedProjects.some(
                (selectedProject) => selectedProject.projectName === project.projectName,
              ) && 'bg-primary border-transparent',
            )}
          >
            {project.projectName}
          </div>
        ))}
      </div>
      {errorMessage && isSubmitted && <Typography className="text-red-600">{errorMessage}</Typography>}
    </div>
  );
};

export default ProjectField;
