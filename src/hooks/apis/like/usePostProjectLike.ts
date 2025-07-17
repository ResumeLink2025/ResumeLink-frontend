import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { post } from '@/apis/httpClient';

const usePostProjectLike = (options?: UseMutationOptions<unknown, AxiosError, number>) => {
  return useMutation({
    mutationFn: (id: number) => post(`/api/projects/${id}/favorite`),
    ...options,
  });
};

export default usePostProjectLike;
