import { patch, post } from '@/apis/httpClient';

import type { UserProfileType } from '../shcemas/userProfileSchema';

export type PatchUserProfilePayload = Omit<UserProfileType, 'birthday'> & {
  birthday?: string | null;
};

export async function patchUserProfile(data: PatchUserProfilePayload) {
  return await patch('/api/profiles', data);
}

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('image', file);

  const data = await post<{ imageUrl: string }>('/api/images', formData);
  return data.imageUrl;
}
