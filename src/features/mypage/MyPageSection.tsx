'use client';

import { useState } from 'react';

import { PROFILE_LIST } from '@/fixtures/profiles';

import { ProfileCard } from '../components';

interface ProfileData {
  nickname: string;
  gender: 'male' | 'female' | '';
  birth: string;
  position: string;
  contact: string;
  skills: string[];
}

export default function MyPageSection() {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'resume' | 'project'>('resume');
  const [profile, setProfile] = useState<ProfileData>({
    nickname: '홍길동',
    gender: 'male',
    birth: '1990-01-01',
    position: '프론트엔드 개발자',
    contact: '010-1234-5678',
    skills: ['JavaScript', 'React'],
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-2xl flex flex-col items-center px-4">
        {/* Logo */}
        <h1 className="text-3xl font-bold text-yellow-400 mb-2">RESUMELINK</h1>
        <h2 className="text-base font-semibold text-black mb-6">마이페이지</h2>

        {/* Content */}
        <div className="grid grid-cols-2 gap-4 w-full max-h-[90vh] overflow-y-auto">
          {/* 프로필 사진 */}
          <div className="col-span-1 flex flex-col gap-2">
            <label className="text-sm font-medium text-black">프로필 사진</label>
            <div className="w-full aspect-square bg-gray-200 rounded-md flex items-center justify-center">
              <span className="text-gray-500 text-sm">사진</span>
            </div>
          </div>

          {/* 오른쪽 필드 */}
          <div className="col-span-1 flex flex-col gap-2">
            <label className="text-sm font-medium text-black">닉네임</label>
            {editMode ? (
              <input
                value={profile.nickname}
                onChange={(e) => setProfile({ ...profile, nickname: e.target.value })}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
            ) : (
              <span>{profile.nickname}</span>
            )}

            <label className="text-sm font-medium text-black mt-2">성별</label>
            {editMode ? (
              <select
                value={profile.gender}
                onChange={(e) => setProfile({ ...profile, gender: e.target.value as ProfileData['gender'] })}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              >
                <option value="">선택</option>
                <option value="male">남성</option>
                <option value="female">여성</option>
              </select>
            ) : (
              <span>{profile.gender === 'male' ? '남성' : profile.gender === 'female' ? '여성' : '-'}</span>
            )}

            <label className="text-sm font-medium text-black mt-2">생일</label>
            {editMode ? (
              <input
                type="date"
                value={profile.birth}
                onChange={(e) => setProfile({ ...profile, birth: e.target.value })}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
            ) : (
              <span>{profile.birth}</span>
            )}
          </div>

          {/* 희망 직무 */}
          <div className="col-span-1 flex flex-col gap-2">
            <label className="text-sm font-medium text-black">희망 직무</label>
            {editMode ? (
              <input
                value={profile.position}
                onChange={(e) => setProfile({ ...profile, position: e.target.value })}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
            ) : (
              <span>{profile.position}</span>
            )}
          </div>

          {/* 연락처 */}
          <div className="col-span-1 flex flex-col gap-2">
            <label className="text-sm font-medium text-black">연락처</label>
            {editMode ? (
              <input
                value={profile.contact}
                onChange={(e) => setProfile({ ...profile, contact: e.target.value })}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
            ) : (
              <span>{profile.contact}</span>
            )}
          </div>

          {/* 기술 스택 */}
          <div className="col-span-2 flex flex-col gap-2">
            <label className="text-sm font-medium text-black">기술 스택</label>
            {editMode ? (
              <input
                placeholder="쉼표로 구분하여 입력하세요 (예: JavaScript,React)"
                value={profile.skills.join(',')}
                onChange={(e) =>
                  setProfile({ ...profile, skills: e.target.value.split(',').map((s) => s.trim()) })
                }
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
            ) : (
              <div className="flex flex-wrap gap-2 mt-2">
                {profile.skills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 탭 */}
        <div className="flex flex-col mt-6 w-full">
          <section className="flex gap-2 mb-4">
            <button
              onClick={() => setActiveTab('resume')}
              className={`px-6 py-2 rounded ${
                activeTab === 'resume'
                  ? 'bg-yellow-400 text-white'
                  : 'border border-gray-300 bg-white text-black'
              }`}
            >
              이력서
            </button>
            <button
              onClick={() => setActiveTab('project')}
              className={`px-6 py-2 rounded ${
                activeTab === 'project'
                  ? 'bg-yellow-400 text-white'
                  : 'border border-gray-300 bg-white text-black'
              }`}
            >
              프로젝트
            </button>
          </section>

          {/* 프로필 카드 */}
          <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {PROFILE_LIST.map((profile) => (
              <ProfileCard key={profile.id} {...profile} />
            ))}
          </section>
        </div>

        {/* 수정 버튼 */}
        <button
          onClick={() => setEditMode(!editMode)}
          className="mt-6 px-6 py-2 rounded bg-yellow-400 text-white hover:bg-yellow-500"
        >
          {editMode ? '수정 완료' : '수정'}
        </button>
      </div>
    </div>
  );
}
