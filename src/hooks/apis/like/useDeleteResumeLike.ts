import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { del } from '@/apis/httpClient';

const useDeleteResumeLike = (options?: UseMutationOptions<unknown, AxiosError, string>) => {
  return useMutation({
    mutationFn: (id: string) => del(`/api/resumes/${id}/favorite`),
    ...options,
  });
};

export default useDeleteResumeLike;
