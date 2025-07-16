import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { get } from '@/apis/httpClient';
import type { ResumeDetailType } from '@/constants/resume';

export const RESUME_LIST = 'resumeList';

const useGetResumeList = (listType: string) => {
  return useQuery<ResumeDetailType[], AxiosError>({
    queryKey: [RESUME_LIST],
    queryFn: () => get('/api/resumes/all'),
    enabled: listType === 'resume',
  });
};

export default useGetResumeList;
