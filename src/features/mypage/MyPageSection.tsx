'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import type { UserProfileType } from '../registerProfile/shcemas/userProfileSchema';
import ViewProfileSection from './MyPageViewSection';

export type ProfileData = UserProfileType & {
  contact?: string;
};

export default function MyPageSection() {
  const [activeTab, setActiveTab] = useState<'resume' | 'project'>('resume');
  const router = useRouter();

  // 임시 프로필 데이터
  const [profile] = useState<UserProfileType>({
    nickname: '홍길동',
    birthday: new Date('1990-01-01'),
    gender: 'male',
    skill: {
      generalSkills: ['JavaScript', 'React'],
      customSkills: [],
    },
    desirePositions: ['프론트엔드 개발자'],
    experienceYears: 3,
    customInterest: null,
    customPosition: null,
    profileImage: null,
    summary: null,
  });
  useEffect(() => {}, []);
  return (
    <div className="min-h-[calc(100vh-155px)] mt-16">
      <ViewProfileSection
        profile={profile}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onEditClick={() => router.push('/mypage/edit')}
      />
    </div>
  );
}
