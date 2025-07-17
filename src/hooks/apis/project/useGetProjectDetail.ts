import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { get } from '@/apis/httpClient';
import type { ProjectDetailType } from '@/constants/project';

export const PROJECT_DETAIL = 'projectDetail';

const useGetProjectDetail = (id: string, hasProjectId: boolean) => {
  return useQuery<ProjectDetailType, AxiosError>({
    queryKey: [PROJECT_DETAIL, id],
    queryFn: () => get(`/api/projects/${id}`),
    enabled: hasProjectId,
  });
};

export default useGetProjectDetail;
