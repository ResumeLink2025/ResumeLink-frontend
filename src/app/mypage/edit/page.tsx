'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getMyProfile } from '@/features/login/apis/profile';
import RegisterProfileSection from '@/features/registerProfile/RegisterProfileSection';
import type { UserProfileType } from '@/features/registerProfile/shcemas/userProfileSchema';

export default function EditMyPage() {
  const [profile, setProfile] = useState<UserProfileType>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getMyProfile();

        setProfile({
          ...res.profile,
          userSkills: res.profile.generalSkills ?? [],
          gender: res.profile.gender ?? 'male',
          customSkill: res.profile.customSkill ?? {},
          customInterest: res.profile.customInterest ?? {},
          customPosition: res.profile.customPosition ?? {},
          birthday: res.profile.birthday ?? null,
          desirePositions: res.profile.desirePositions ?? [],
          experienceYears: res.profile.experienceYears ?? 0,
          employmentStatus: res.profile.employmentStatus ?? null,
          imageUrl: res.profile.imageUrl ?? null,
          summary: res.profile.summary ?? null,
        });
      } catch {
        setError('프로필 불러오기 실패');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = () => router.push('/mypage');
  const handleCancel = () => router.push('/mypage');

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <RegisterProfileSection
        mode="edit"
        onSave={handleSave}
        onCancel={handleCancel}
        initialProfile={profile}
      />
    </div>
  );
}
