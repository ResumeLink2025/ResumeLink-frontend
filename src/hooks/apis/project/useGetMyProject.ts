import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { get } from '@/apis/httpClient';
import type { ProjectFormDataType } from '@/features/project/schemas/projectSchema';

export const MY_PROJECTS = 'myProject';

const useGetMyProject = () => {
  return useQuery<ProjectFormDataType[], AxiosError>({
    queryKey: [MY_PROJECTS],
    queryFn: () => get('/api/projects'),
  });
};

export default useGetMyProject;
