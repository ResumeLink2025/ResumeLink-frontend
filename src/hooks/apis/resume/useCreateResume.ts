import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { post } from '@/apis/httpClient';
import type { ResumeFormDataType } from '@/features/resume/schemas/resumeSchema';

const useCreateResume = (options?: UseMutationOptions<unknown, AxiosError, ResumeFormDataType>) => {
  return useMutation({
    mutationFn: (data: ResumeFormDataType) => post('/api/resumes', data),
    ...options,
  });
};

export default useCreateResume;
