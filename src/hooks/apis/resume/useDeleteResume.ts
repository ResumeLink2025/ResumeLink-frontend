import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { del } from '@/apis/httpClient';

const useDeleteResume = (id: string, options?: UseMutationOptions<unknown, AxiosError>) => {
  return useMutation({
    mutationFn: () => del(`/api/resumes/${id}`),
    ...options,
  });
};

export default useDeleteResume;
