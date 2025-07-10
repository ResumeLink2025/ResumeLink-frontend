'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

import { Typography } from '@/components/common';
import { PROFILE_LIST } from '@/fixtures/profiles';

import { ProfileCard } from '../components';
import AdditionalInfoSection from '../registerProfile/AdditionalInfoSection';
import BasicInfoSection from '../registerProfile/BasicInfoSection';
import ProfileImageSection from '../registerProfile/ProfileImageSection';
import { developerList, yearList } from '../registerProfile/types';

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
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [selectJob, setSelectJob] = useState<string>(developerList[0].value);
  const [selectYear, setSelectYear] = useState<string>(yearList[0].value);

  const handleUploadFile = (files?: FileList | null) => {
    if (!files || files.length === 0) {
      setImageUrl(null);
      return;
    }
    const file = files[0];
    const imageUrl = URL.createObjectURL(file);
    setImageUrl(imageUrl);
  };

  const [profile, setProfile] = useState<ProfileData>({
    nickname: '홍길동',
    gender: 'male',
    birth: '1990-01-01',
    position: '프론트엔드 개발자',
    contact: '010-1234-5678',
    skills: ['JavaScript', 'React'],
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-155px)] bg-white">
      <Typography type="heading1">마이페이지</Typography>
      <div className="w-full max-w-2xl flex flex-col items-center px-4">
        <h1 className="text-3xl font-bold text-yellow-400 mb-2">RESUMELINK</h1>
        <h2 className="text-base font-semibold text-black mb-6">마이페이지</h2>

        <motion.div layout className="grid grid-cols-2 gap-4 w-full max-h-[90vh] overflow-y-auto">
          {/* 프로필 사진 */}
          <motion.div layout className="col-span-1 flex flex-col gap-2">
            {editMode ? (
              <ProfileImageSection imageUrl={imageUrl} handleUploadFile={handleUploadFile} />
            ) : (
              <>
                <label className="text-sm font-medium text-black">프로필 사진</label>
                <div className="w-[280px] aspect-square bg-gray-200 rounded-md flex items-center justify-center">
                  <span className="text-gray-500 text-sm">사진</span>
                </div>
              </>
            )}
          </motion.div>

          {/* 오른쪽 필드 */}
          <motion.div layout className="col-span-1 flex flex-col gap-2">
            {editMode ? (
              <BasicInfoSection />
            ) : (
              <>
                <label className="text-sm font-medium text-black">닉네임</label>
                <span>{profile.nickname}</span>
                <label className="text-sm font-medium text-black mt-2">성별</label>
                <span>{profile.gender === 'male' ? '남성' : profile.gender === 'female' ? '여성' : '-'}</span>
                <label className="text-sm font-medium text-black mt-2">생일</label>
                <span>{profile.birth}</span>
              </>
            )}
          </motion.div>

          <motion.div layout className="flex justify-between col-span-2  w-full">
            {editMode ? (
              <div className="w-full flex justify-between gap-4">
                <AdditionalInfoSection
                  selectJob={selectJob}
                  setSelectJob={setSelectJob}
                  selectYear={selectYear}
                  setSelectYear={setSelectYear}
                />
              </div>
            ) : (
              <>
                <div className="flex flex-col flex-1">
                  <label className="text-sm font-medium text-black">희망 직무</label>
                  <span>{profile.position}</span>
                </div>
                <div className="flex flex-col flex-1 items-end text-right">
                  <label className="text-sm font-medium text-black">연락처</label>
                  <span>{profile.contact}</span>
                </div>
              </>
            )}
          </motion.div>

          {/* 기술 스택 */}
          <motion.div layout className="col-span-2 flex flex-col gap-2">
            <label className="text-sm font-medium text-black">기술 스택</label>
            {editMode ? (
              <input
                placeholder="쉼표로 구분하여 입력하세요 (예: JavaScript,React)"
                value={profile.skills.join(',')}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    skills: e.target.value.split(',').map((s) => s.trim()),
                  })
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
          </motion.div>
        </motion.div>

        <button
          onClick={() => setEditMode(!editMode)}
          className="mt-6 px-6 py-2 rounded bg-primary text-white hover:bg-primaryHover cursor-pointer"
        >
          {editMode ? '수정 완료' : '프로필 수정'}
        </button>

        {/* 탭 영역 */}
        <div className="flex flex-col mt-6 w-full">
          <section className="flex gap-2 mb-4">
            <button
              onClick={() => setActiveTab('resume')}
              className={`px-6 py-2 rounded cursor-pointer ${
                activeTab === 'resume'
                  ? 'bg-yellow-400 text-white'
                  : 'border border-gray-300 bg-white text-black'
              }`}
            >
              이력서
            </button>
            <button
              onClick={() => setActiveTab('project')}
              className={`px-6 py-2 cursor-pointer rounded ${
                activeTab === 'project'
                  ? 'bg-yellow-400 text-white'
                  : 'border border-gray-300 bg-white text-black'
              }`}
            >
              프로젝트
            </button>
          </section>

          <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {PROFILE_LIST.map((profile) => (
              <ProfileCard key={profile.id} {...profile} />
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
