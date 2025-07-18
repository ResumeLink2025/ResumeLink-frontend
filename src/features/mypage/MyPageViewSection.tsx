'use client';

import Typography from '@/components/common/Typography';

import type { UserProfileType } from '../registerProfile/shcemas/userProfileSchema';

export type ProfileData = UserProfileType & {
  contact?: string;
  profileImageUrl?: string;
  generalSkills?: string[];
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
  const formatBirthday = (birthday?: string | Date | null) => {
    if (!birthday) return '-';
    if (typeof birthday === 'string') {
      // 2024-01-01T00:00:00.000Z → 2024-01-01로 변환
      const dateOnly = birthday.split('T')[0];
      return dateOnly || '-';
    }
    if (birthday instanceof Date && !isNaN(birthday.getTime())) {
      return birthday.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
    }
    return '-';
  };

  // 기술스택 평탄화
  const userSkills: string[] = profile.generalSkills ?? [];
  const customSkills: string[] =
    profile.customSkill && typeof profile.customSkill === 'object'
      ? Object.keys(profile.customSkill).filter((k) => profile.customSkill?.[k])
      : [];
  const allSkills = [...userSkills, ...customSkills];

  return (
    <div className="flex flex-col items-center w-full min-h-[calc(100vh-155px)] py-12 bg-white">
      <Typography type="title1" className="text-black mb-8 font-bold text-2xl">
        마이페이지
      </Typography>
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-3xl shadow-lg p-10 mb-10">
        <div className="flex flex-col items-center gap-8">
          {/* 프로필 사진 */}
          <div className="flex flex-col items-center gap-2 w-full">
            <Typography type="body3" className="text-gray-700 mb-1 font-semibold">
              프로필 사진
            </Typography>
            <div className="w-[180px] aspect-square bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden shadow">
              {profile.imageUrl ? (
                <img src={profile.imageUrl} alt="프로필 사진" className="object-cover w-full h-full" />
              ) : (
                <span className="text-gray-400 text-base">사진 없음</span>
              )}
            </div>
          </div>
          <div className="w-full">
            <div className="mb-2">
              <Typography type="body4" className="text-gray-700 font-semibold">
                희망 직무
              </Typography>
              <div className="text-base text-black font-medium mt-1">
                {Array.isArray(profile.desirePositions) && profile.desirePositions.length > 0 ? (
                  profile.desirePositions.join(', ')
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </div>
            </div>
            <div>
              <Typography type="body4" className="text-gray-700 font-semibold">
                연차
              </Typography>
              <div className="text-base text-black font-medium mt-1">
                {profile.experienceYears ? (
                  `연차 ${profile.experienceYears}년차`
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-7 w-full">
          <div>
            <div className="mb-3">
              <Typography type="body4" className="text-gray-700 font-semibold">
                닉네임
              </Typography>
              <div className="text-lg text-black font-semibold mt-1">{profile.nickname || '-'}</div>
            </div>
            <div className="mb-3">
              <Typography type="body4" className="text-gray-700 font-semibold">
                성별
              </Typography>
              <div className="text-base text-black mt-1">
                {profile.gender === 'male' ? (
                  '남성'
                ) : profile.gender === 'female' ? (
                  '여성'
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </div>
            </div>
            <div>
              <Typography type="body4" className="text-gray-700 font-semibold">
                생일
              </Typography>
              <div className="text-base text-black mt-1">{formatBirthday(profile.birthday)}</div>
            </div>
          </div>
          <div>
            <Typography type="body4" className="text-gray-700 font-semibold mb-1">
              기술 스택
            </Typography>

            {allSkills.length > 0 ? (
              <div className="flex flex-wrap gap-3 mt-2">
                {allSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-primary text-white rounded-full text-sm font-medium shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-gray-400 mt-2">기술 스택 없음</span>
            )}
          </div>
        </div>
      </div>
      {/* 수정 버튼 */}
      <button
        onClick={onEditClick}
        className="mt-2 px-8 py-3 rounded-xl bg-yellow-400 text-white hover:bg-yellow-500 transition font-semibold shadow-lg"
      >
        프로필 수정
      </button>
      {/* 탭 영역 */}
      <div className="flex flex-col mt-8 w-full items-center">
        <section className="flex gap-4 mb-5">
          <button
            onClick={() => setActiveTab('resume')}
            className={`px-7 py-2 rounded-lg cursor-pointer text-lg transition font-semibold ${
              activeTab === 'resume'
                ? 'bg-yellow-400 text-white shadow'
                : 'border border-gray-200 bg-white text-black hover:bg-gray-50'
            }`}
          >
            이력서
          </button>
          <button
            onClick={() => setActiveTab('project')}
            className={`px-7 py-2 rounded-lg cursor-pointer text-lg transition font-semibold ${
              activeTab === 'project'
                ? 'bg-yellow-400 text-white shadow'
                : 'border border-gray-200 bg-white text-black hover:bg-gray-50'
            }`}
          >
            프로젝트
          </button>
        </section>
        <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full max-w-4xl justify-items-center">
          {/* 카드 컴포넌트 들어갈 곳 */}
        </section>
      </div>
    </div>
  );
}
