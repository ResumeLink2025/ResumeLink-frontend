import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { get } from '@/apis/httpClient';
import type { ProjectDetailType } from '@/constants/project';

export const PROJECT_LIST = 'projectList';

const useGetProjectList = (
  listType: string,
  searchTerm: string | null,
  skillNames: string | null,
  sort?: string | null,
) => {
  return useQuery<ProjectDetailType[], AxiosError>({
    queryKey: [PROJECT_LIST, listType, searchTerm, skillNames, sort],
    queryFn: () => {
      const params = new URLSearchParams();

      if (searchTerm) params.set('searchTerm', searchTerm);
      if (skillNames) params.set('skillNames', skillNames);
      if (sort) params.set('sortBy', sort);

      const queryString = params.toString();

      return get(`/api/projects/all${queryString ? `?${queryString}` : ''}`);
    },
    enabled: listType === 'project',
  });
};

export default useGetProjectList;
