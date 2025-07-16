'use client';

import { useState } from 'react';

import RegisterProfileSection from '../registerProfile/RegisterProfileSection';
import type { UserProfileType } from '../registerProfile/shcemas/userProfileSchema';
import ViewProfileSection from './MyPageViewSection';

export type ProfileData = UserProfileType & {
  contact?: string; // 필요하면 추가 필드로 확장 가능
};
export default function MyPageSection() {
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'resume' | 'project'>('resume');

  // 임시 프로필 데이터 — 실제는 API에서 불러오세요
  const [profile, setProfile] = useState<UserProfileType>({
    nickname: '홍길동',
    birthday: new Date('1990-01-01'), // Date 객체 (coerce.date()에 맞춤)
    gender: 'male',
    skill: {
      generalSkills: ['JavaScript', 'React'], // 최소 1개 이상 필요
      customSkills: [],
    },
    desirePositions: ['프론트엔드 개발자'], // 최대 1개, 최소 1개
    experienceYears: 3, // 정수, 0 이상
    customInterest: null,
    customPosition: null,
    profileImage: null,
    summary: null,
  });
  return (
    <>
      {editMode ? (
        <RegisterProfileSection
          onCancel={() => setEditMode(false)}
          onSave={(updatedProfile: ProfileData) => {
            setProfile(updatedProfile);
            setEditMode(false);
          }}
        />
      ) : (
        <ViewProfileSection
          profile={profile}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onEditClick={() => setEditMode(true)}
        />
      )}
    </>
  );
}
