import type { MutationOptions} from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { patch } from '@/apis/httpClient';
import type { ResumeFormDataType } from '@/features/resume/schemas/resumeSchema';

const useEditResume = (id: string, options?: MutationOptions<unknown, AxiosError, ResumeFormDataType>) => {
  return useMutation({
    mutationFn: (data: ResumeFormDataType) => patch(`/api/resumes/${id}`, data),
    ...options,
  });
};

export default useEditResume;
