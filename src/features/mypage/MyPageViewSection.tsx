'use client';

import { motion } from 'framer-motion';

import Typography from '@/components/common/Typography';
import { PROFILE_LIST } from '@/fixtures/profiles';

import { ProfileCard } from '../components';
import type { UserProfileType } from '../registerProfile/shcemas/userProfileSchema';

export type ProfileData = UserProfileType & {
  contact?: string;
  profileImageUrl?: string; // 프로필 이미지 URL 추가(필요하면)
};

interface ViewProfileSectionProps {
  profile: ProfileData;
  activeTab: 'resume' | 'project';
  setActiveTab: (tab: 'resume' | 'project') => void;
  onEditClick: () => void;
}

export default function ViewProfileSection({
  profile,
  activeTab,
  setActiveTab,
  onEditClick,
}: ViewProfileSectionProps) {
  // 생일 출력용 포맷 함수
  const formatBirthday = (birthday?: string | Date | null) => {
    if (!birthday) return '-';
    if (typeof birthday === 'string') return birthday || '-';
    if (birthday instanceof Date && !isNaN(birthday.getTime())) {
      return birthday.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
    }
    return '-';
  };

  // 기술 스택: generalSkills 사용 예시
  const skills = profile.skill?.generalSkills ?? [];

  // 희망 직무: desirePositions 첫번째 값 혹은 대체 텍스트
  const position =
    Array.isArray(profile.desirePositions) && profile.desirePositions.length > 0
      ? profile.desirePositions[0]
      : '-';

  return (
    <div className="w-full max-w-2xl flex flex-col items-center px-4">
      <Typography type="hero2" className="text-yellow-400 mb-2">
        RESUMELINK
      </Typography>
      <Typography type="title1" className="text-black mb-6">
        마이페이지
      </Typography>

      <motion.div layout className="grid grid-cols-2 gap-4 w-full max-h-[90vh] overflow-y-auto">
        {/* 프로필 사진 */}
        <motion.div layout className="col-span-1 flex flex-col gap-2">
          <Typography type="body4" className="text-black">
            프로필 사진
          </Typography>
          <div className="w-[280px] aspect-square bg-gray-200 rounded-md flex items-center justify-center overflow-hidden">
            {profile.profileImageUrl ? (
              <img src={profile.profileImageUrl} alt="프로필 사진" className="object-cover w-full h-full" />
            ) : (
              <span className="text-gray-500 text-sm">사진 없음</span>
            )}
          </div>
        </motion.div>

        {/* 프로필 정보 */}
        <motion.div layout className="col-span-1 flex flex-col gap-2">
          <Typography type="body4" className="text-black">
            닉네임
          </Typography>
          <span>{profile.nickname || '-'}</span>

          <Typography type="body4" className="text-black mt-2">
            성별
          </Typography>
          <span>{profile.gender === 'male' ? '남성' : profile.gender === 'female' ? '여성' : '-'}</span>

          <Typography type="body4" className="text-black mt-2">
            생일
          </Typography>
          <span>{formatBirthday(profile.birthday)}</span>
        </motion.div>

        <motion.div layout className="flex justify-between col-span-2 w-full">
          <div className="flex flex-col flex-1">
            <Typography type="body4" className="text-black">
              희망 직무
            </Typography>
            <span>{position}</span>
          </div>
          <div className="flex flex-col flex-1 items-end text-right">
            <Typography type="body4" className="text-black">
              연락처
            </Typography>
            <span>{profile.contact || '-'}</span>
          </div>
        </motion.div>

        {/* 기술 스택 */}
        <motion.div layout className="col-span-2 flex flex-col gap-2">
          <Typography type="body4" className="text-black">
            기술 스택
          </Typography>
          {skills.length > 0 ? (
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.map((skill, idx) => (
                <span key={idx} className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-gray-500 mt-2">기술 스택 없음</span>
          )}
        </motion.div>
      </motion.div>

      {/* 수정 버튼 */}
      <button
        onClick={onEditClick}
        className="mt-6 px-6 py-2 rounded bg-primary text-white hover:bg-primaryHover cursor-pointer"
      >
        프로필 수정
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
  );
}
