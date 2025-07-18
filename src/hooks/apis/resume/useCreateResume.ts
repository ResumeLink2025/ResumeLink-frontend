import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { post } from '@/apis/httpClient';
import type { ResumeFormDataType } from '@/features/resume/schemas/resumeSchema';

export type createResumeResponseType = { id: string };

const useCreateResume = (
  options?: UseMutationOptions<createResumeResponseType, AxiosError, ResumeFormDataType>,
) => {
  return useMutation({
    mutationFn: (data: ResumeFormDataType) => post('/api/resumes', data),
    ...options,
  });
};

export default useCreateResume;
