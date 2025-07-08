import type { MutationOptions} from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { del } from '@/apis/httpClient';

const useDeleteResume = (id: string, options?: MutationOptions<unknown, AxiosError>) => {
  return useMutation({
    mutationFn: () => del(`/api/resumes/${id}`),
    ...options,
  });
};

export default useDeleteResume;
