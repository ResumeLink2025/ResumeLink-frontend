import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { get } from '@/apis/httpClient';
import type { ProfileType } from '@/constants/profile';

export const MY_PROFILE = 'myProfile';

const useGetMyProfile = () => {
  return useQuery<ProfileType, AxiosError>({
    queryKey: [MY_PROFILE],
    queryFn: () => get('/api/profiles'),
  });
};

export default useGetMyProfile;
