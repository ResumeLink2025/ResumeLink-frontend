'use client';

import Typography from '@/components/common/Typography';

import type { UserProfileType } from '../registerProfile/shcemas/userProfileSchema';

export type ProfileData = UserProfileType & {
  contact?: string;
  profileImageUrl?: string;
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
    if (typeof birthday === 'string') return birthday || '-';
    if (birthday instanceof Date && !isNaN(birthday.getTime())) {
      return birthday.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
    }
    return '-';
  };

  const generalSkills = profile.skill.generalSkills ?? [];
  const customSkills = profile.skill.customSkills ?? [];
  const allSkills = [...generalSkills, ...customSkills];
  return (
    <div className="flex flex-col items-center w-full min-h-[calc(100vh-155px)] py-12 bg-white">
      <Typography type="title1" className="text-black mb-6">
        마이페이지
      </Typography>
      {/* 메인 프로필 2단 영역 */}
      <div className="w-full max-w-4xl grid grid-cols-2 gap-10 bg-white rounded-2xl shadow-md p-10 mb-10">
        <div className="flex flex-col items-center gap-8">
          {/* 프로필 사진 */}
          <div className="flex flex-col items-center gap-2 w-full">
            <Typography type="body4" className="text-black">
              프로필 사진
            </Typography>
            <div className="w-[200px] aspect-square bg-gray-200 rounded-md flex items-center justify-center overflow-hidden">
              {profile.imageUrl ? (
                <img src={profile.imageUrl} alt="프로필 사진" className="object-cover w-full h-full" />
              ) : (
                <span className="text-gray-500 text-sm">사진 없음</span>
              )}
            </div>
          </div>

          <div className="w-full">
            <Typography type="body4" className="text-black mb-1">
              희망 직무
            </Typography>
            <span className="block mb-4">
              {!!profile.user.desirePositions[0] && profile.user.desirePositions[0].position.name}
            </span>
            <Typography type="body4" className="text-black mb-1">
              연차
            </Typography>
            <span>{`${profile.experienceYears}년차` || '-'}</span>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-6 w-full">
          <div>
            <Typography type="body4" className="text-black">
              닉네임
            </Typography>
            <div className="mb-2">{profile.nickname || '-'}</div>
            <Typography type="body4" className="text-black">
              성별
            </Typography>
            <div className="mb-2">
              {profile.gender === 'male' ? '남성' : profile.gender === 'female' ? '여성' : '-'}
            </div>
            <Typography type="body4" className="text-black">
              생일
            </Typography>
            <div className="mb-2">{formatBirthday(profile.birthday)}</div>
          </div>

          <div>
            <Typography type="body4" className="text-black mb-1">
              기술 스택
            </Typography>
            {allSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-2">
                {allSkills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-gray-500 mt-2">기술 스택 없음</span>
            )}
          </div>
        </div>
      </div>

      {/* 수정 버튼 */}
      <button
        onClick={onEditClick}
        className="mt-2 px-6 py-2 rounded bg-primary text-white hover:bg-primaryHover cursor-pointer"
      >
        프로필 수정
      </button>

      {/* 탭 영역 */}
      <div className="flex flex-col mt-6 w-full items-center">
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
        <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl justify-items-center">
          {/* {RESUME_LIST &&
        resumeList?.map((resume) => (
          <ResumeProfileCard key={resume.id} onClick={onClickResumeHeart} {...resume} />
        ))}
      {projectList &&
        projectList?.map((project) => (
          <ProjectProfileCard key={project.id} onClick={onClickProjectHeart} {...project} />
        ))} */}
        </section>
      </div>
    </div>
  );
}
