import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { del } from '@/apis/httpClient';

const useDeleteProjectLike = (options?: UseMutationOptions<unknown, AxiosError, number>) => {
  return useMutation({
    mutationFn: (id: number) => del(`/api/projects/${id}/favorite`),
    ...options,
  });
};

export default useDeleteProjectLike;
