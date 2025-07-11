import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { patch } from '@/apis/httpClient';
import type { ProjectFormDataType } from '@/features/project/schemas/projectSchema';

export const PROJECT_DETAIL = 'projectDetail';

const useGetProjectDetail = (id: string, hasProjectId: boolean) => {
  return useQuery<ProjectFormDataType, AxiosError>({
    queryKey: [PROJECT_DETAIL, id],
    queryFn: () => patch(`/api/projects/${id}`),
    enabled: hasProjectId,
  });
};

export default useGetProjectDetail;
