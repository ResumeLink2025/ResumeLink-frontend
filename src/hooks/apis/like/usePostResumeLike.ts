import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { post } from '@/apis/httpClient';

const usePostResumeLike = (options?: UseMutationOptions<unknown, AxiosError, string>) => {
  return useMutation({
    mutationFn: (id: string) => post(`/api/resumes/${id}/favorite`),
    ...options,
  });
};

export default usePostResumeLike;
