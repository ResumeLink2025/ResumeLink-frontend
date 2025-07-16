import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { get } from '@/apis/httpClient';
import type { ResumeFormDataType } from '@/features/resume/schemas/resumeSchema';

export const RESUME_LIST = 'resumeList';

const useGetResumeList = () => {
  return useQuery<ResumeFormDataType[], AxiosError>({
    queryKey: [RESUME_LIST],
    queryFn: () => get('/api/resumes/all'),
  });
};

export default useGetResumeList;
