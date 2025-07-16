import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { get } from '@/apis/httpClient';
import type { ProjectDetailType } from '@/constants/project';

export const PROJECT_LIST = 'projectList';

const useGetProjectList = (listType: string) => {
  return useQuery<ProjectDetailType[], AxiosError>({
    queryKey: [PROJECT_LIST, listType],
    queryFn: () => get('/api/projects/all'),
    enabled: listType === 'project',
  });
};

export default useGetProjectList;
