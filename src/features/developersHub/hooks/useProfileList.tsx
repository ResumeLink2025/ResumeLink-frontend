import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

import useDeleteProjectLike from '@/hooks/apis/like/useDeleteProjectLike';
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
  const sort = params.get('sort');

  const { data: resumeList } = useGetResumeList(listType, searchTerm, skillNames, positionNames, sort);
  const { data: projectList } = useGetProjectList(listType, searchTerm, skillNames, sort);

  const { mutate: postResumeLikeMutate } = usePostResumeLike({
    onSuccess: () => {
      toast.success('스크랩에 추가되었습니다!');
      queryClient.invalidateQueries({ queryKey: [RESUME_LIST] });
    },
    onError: () => {
      toast.error('이력서 스크랩에 실패했습니다.');
    },
  });

  const { mutate: postProjectLikeMutate } = usePostProjectLike({
    onSuccess: () => {
      toast.success('스크랩에 추가되었습니다!');
      queryClient.invalidateQueries({ queryKey: [PROJECT_LIST] });
    },
    onError: () => {
      toast.error('프로젝트 스크랩에 실패했습니다.');
    },
  });
  const { mutate: deleteProjectLikeMutate } = useDeleteProjectLike({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PROJECT_LIST] });
    },
  });

  const onClickResumeHeart = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    e.stopPropagation();

    postResumeLikeMutate(id);
  };

  const onClickProjectHeart = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    e.stopPropagation();

    const targetProject = projectList?.find((project) => project.projectNumber === id);

    if (targetProject?.isFavorite) {
      deleteProjectLikeMutate(id);
    } else {
      postProjectLikeMutate(id);
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
