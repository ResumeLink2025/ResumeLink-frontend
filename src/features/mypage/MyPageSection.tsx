'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getMyProfile } from '../login/apis/profile';
import type { UserProfileType } from '../registerProfile/shcemas/userProfileSchema';
import ViewProfileSection from './MyPageViewSection';

export type ProfileData = UserProfileType & {
  contact?: string;
};

export default function MyPageSection() {
  const [activeTab, setActiveTab] = useState<'resume' | 'project'>('resume');
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [profile, setProfile] = useState<ProfileData | null>(null);

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
  if (loading) return <div>로딩중...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div className="min-h-[calc(100vh-155px)] mt-16">
      {profile && (
        <ViewProfileSection
          profile={profile}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onEditClick={() => router.push('/mypage/edit')}
        />
      )}
    </div>
  );
}
