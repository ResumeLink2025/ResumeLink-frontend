import { useQuery } from '@tanstack/react-query';

import { get } from '@/apis/httpClient';

export const MY_PROFILE = 'myProfile';

const useGetMyProfile = () => {
  return useQuery({
    queryKey: [MY_PROFILE],
    queryFn: () => get('/api/profiles'),
  });
};

export default useGetMyProfile;
