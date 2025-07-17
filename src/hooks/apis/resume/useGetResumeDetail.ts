import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { get } from '@/apis/httpClient';
import type { ResumeDetailType } from '@/constants/resume';

export const RESUME_DETAIL = 'resumeDetail';

const useGetResumeDetail = (id: string, hasProjectId: boolean) => {
  return useQuery<ResumeDetailType, AxiosError>({
    queryKey: [RESUME_DETAIL, id],
    queryFn: () => get(`/api/resumes/${id}`),
    enabled: hasProjectId,
  });
};

export default useGetResumeDetail;
