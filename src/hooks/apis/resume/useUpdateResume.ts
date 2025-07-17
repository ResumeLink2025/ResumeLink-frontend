import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { patch } from '@/apis/httpClient';
import type { ResumeFormDataType } from '@/features/resume/schemas/resumeSchema';

const useUpdateResume = (
  id: string,
  options?: UseMutationOptions<unknown, AxiosError, ResumeFormDataType>,
) => {
  return useMutation({
    mutationFn: (data: ResumeFormDataType) => patch(`/api/resumes/${id}`, data),
    ...options,
  });
};

export default useUpdateResume;
