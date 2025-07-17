import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

import type { ProjectDetailType } from '@/constants/project';
import type { ResumeDetailType } from '@/constants/resume';
import useDeleteProjectLike from '@/hooks/apis/like/useDeleteProjectLike';
import useDeleteResumeLike from '@/hooks/apis/like/useDeleteResumeLike';
import usePostProjectLike from '@/hooks/apis/like/usePostProjectLike';
import usePostResumeLike from '@/hooks/apis/like/usePostResumeLike';
import useGetProjectList, { PROJECT_LIST } from '@/hooks/apis/project/useGetProjectList';
import useGetResumeList, { RESUME_LIST } from '@/hooks/apis/resume/useGetResumeList';

const useProfileList = (listType: string) => {
  const params = useSearchParams();
  const queryClient = useQueryClient();

  const searchTerm = params.get('searchTerm');
  const skillNames = params.get('skillNames');
  const positionNames = params.get('positionNames');

  const [clickResumeDetail, setClickResumeDetail] = useState<ResumeDetailType>();
  const [clickProjectDetail, setClickProjectDetail] = useState<ProjectDetailType>();

  const { data: resumeList } = useGetResumeList(listType, searchTerm, skillNames, positionNames);
  const { data: projectList } = useGetProjectList(listType, searchTerm, skillNames);

  const { mutate: postResumeLikeMutate } = usePostResumeLike({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RESUME_LIST] });
    },
    onError: () => {
      toast.error('이력서 스크랩에 실패했습니다.');
    },
  });
  const { mutate: deleteResumeLikeMutate } = useDeleteResumeLike();

  const { mutate: postProjectLikeMutate } = usePostProjectLike({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PROJECT_LIST] });
    },
    onError: () => {
      toast.error('프로젝트 스크랩에 실패했습니다.');
    },
  });
  const { mutate: deleteProjectLikeMutate } = useDeleteProjectLike();

  const onClickResumeHeart = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    e.stopPropagation();

    if (resumeList && id) {
      setClickResumeDetail(resumeList.find((resume) => resume.id == id));
    }

    if (clickResumeDetail?.isFavorited) {
      deleteResumeLikeMutate(id);
    } else {
      postResumeLikeMutate(id);
    }
  };

  const onClickProjectHeart = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    e.stopPropagation();

    if (projectList && id) {
      setClickProjectDetail(projectList.find((project) => project.projectNumber == id));
    }

    console.log('clickProjectDetail', clickProjectDetail);

    if (clickProjectDetail?.isFavorite) {
      postProjectLikeMutate(id);
    } else {
      deleteProjectLikeMutate(id);
    }
  };

  return {
    resumeList,
    projectList,
    onClickResumeHeart,
    onClickProjectHeart,
  };
};

export default useProfileList;
