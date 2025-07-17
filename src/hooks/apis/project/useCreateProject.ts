import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { post } from '@/apis/httpClient';
import type { ProjectFormDataType } from '@/features/project/schemas/projectSchema';

const useCreateProject = (options?: UseMutationOptions<unknown, AxiosError, ProjectFormDataType>) => {
  return useMutation({
    mutationFn: (data: ProjectFormDataType) => post('/api/projects', data),
    ...options,
  });
};

export default useCreateProject;
