import { get } from '@/apis/httpClient';
import type { ProfileType } from '@/constants/profile';

export const getMyProfile = async (): Promise<ProfileType> => {
  const data = await get<ProfileType>('/api/profiles');
  return data;
};
