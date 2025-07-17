import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { del } from '@/apis/httpClient';

const useDeleteProject = (id?: number, options?: UseMutationOptions<unknown, AxiosError>) => {
  return useMutation({
    mutationFn: () => del(`/api/projects/${id}`),
    ...options,
  });
};

export default useDeleteProject;
