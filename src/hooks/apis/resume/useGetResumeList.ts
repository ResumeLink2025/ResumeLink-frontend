import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { get } from '@/apis/httpClient';
import type { ResumeDetailType } from '@/constants/resume';

export const RESUME_LIST = 'resumeList';

const useGetResumeList = (
  listType: string,
  searchTerm: string | null,
  skillNames: string | null,
  positionNames?: string | null,
  sort?: string | null,
) => {
  return useQuery<ResumeDetailType[], AxiosError>({
    queryKey: [RESUME_LIST, listType, searchTerm, skillNames, positionNames, sort],
    queryFn: () => {
      const params = new URLSearchParams();

      if (searchTerm) params.set('searchTerm', searchTerm);
      if (skillNames) params.set('skillNames', skillNames);
      if (positionNames) params.set('positionNames', positionNames);
      if (sort) params.set('sortBy', sort);

      const queryString = params.toString();

      return get(`/api/resumes/search${queryString ? `?${queryString}` : ''}`);
    },
    enabled: listType === 'resume',
  });
};

export default useGetResumeList;
