import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { get } from '@/apis/httpClient';
import type { ResumeFormDataType } from '@/features/resume/schemas/resumeSchema';

export const RESUME_DETAIL = 'resumeDetail';

const useGetResumeDetail = (id: string) => {
  return useQuery<ResumeFormDataType, AxiosError>({
    queryKey: [RESUME_DETAIL, id],
    queryFn: () => get(`/api/resumes/${id}`),
  });
};

export default useGetResumeDetail;
