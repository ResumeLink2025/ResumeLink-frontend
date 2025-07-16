import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { get } from '@/apis/httpClient';
import type { ProjectDetailType } from '@/constants/project';

export const MY_PROJECTS = 'myProject';

const useGetMyProject = () => {
  return useQuery<ProjectDetailType[], AxiosError>({
    queryKey: [MY_PROJECTS],
    queryFn: () => get('/api/projects'),
  });
};

export default useGetMyProject;
