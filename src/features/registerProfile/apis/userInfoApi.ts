import type { UserProfileType } from '../shcemas/userProfileSchema';

export type PatchUserProfilePayload = Omit<UserProfileType, 'birthday'> & {
  birthday?: string | null;
};

export async function patchUserProfile(data: PatchUserProfilePayload) {
  const token = localStorage.getItem('accessToken');

  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/profiles`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Error! status: ${response.status}`);
  }
  return response.json();
}

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/images`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('이미지 업로드 실패');
  }

  const data = await response.json();
  return data.imageUrl;
}
