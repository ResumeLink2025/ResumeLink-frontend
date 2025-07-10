import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { put } from '@/apis/httpClient';
import type { ProjectFormDataType } from '@/features/project/schemas/projectSchema';

const useUpdateProject = (
  id: string,
  options?: UseMutationOptions<unknown, AxiosError, ProjectFormDataType>,
) => {
  return useMutation({
    mutationFn: (data: ProjectFormDataType) => put(`/api/projects/${id}`, data),
    ...options,
  });
};

export default useUpdateProject;
