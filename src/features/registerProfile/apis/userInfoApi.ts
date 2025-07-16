import type { UserProfileType } from '../shcemas/userProfileSchema';

export type PatchUserProfilePayload = Omit<UserProfileType, 'birthday'> & {
  birthday?: string | null;
};

export async function patchUserProfile(data: PatchUserProfilePayload) {
  const token = localStorage.getItem('accessToken');
  const response = await fetch('http://localhost:8080/api/profiles', {
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
