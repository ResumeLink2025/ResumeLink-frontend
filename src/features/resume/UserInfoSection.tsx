import { ImageUpload, Tag, Typography } from '@/components/common';
import type { ProfileType } from '@/constants/profile';

import useUserInfoSection from './hooks/useUserInfoSection';
import UserInfoField from './UserInfoField';

export interface UserInfoSectionProps {
  id?: string;
  myProfile?: ProfileType;
  resumeImageUrl?: string;
}

const UserInfoSection = ({ id, myProfile, resumeImageUrl }: UserInfoSectionProps) => {
  const { imageUrl, handleUploadImageFile } = useUserInfoSection({ myProfile, resumeImageUrl });

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-1">
        <Typography type="heading1">{id ? '이력서 수정하기' : '이력서 생성하기'}</Typography>
        <Typography type="body1" className="text-gray-50">
          자기소개 및 [필수] 표시가 되어있는 항목은 꼭 작성해 주세요.
        </Typography>
      </div>
      <Typography type="heading2" className="mt-14 mb-4">
        기본 정보
      </Typography>
      <div className="flex gap-6">
        <ImageUpload size="large" previewUrl={imageUrl} uploadFile={handleUploadImageFile} />
        <div className="flex-1 grid grid-cols-2">
          <UserInfoField label="이름" value={myProfile?.profile.nickname} />
          <UserInfoField
            label="관심 직군"
            value={myProfile?.profile.desirePositions?.map((position: string) => position).join(',')}
          />
          <UserInfoField label="기술 스택">
            <div className="flex flex-wrap gap-1">
              {myProfile?.profile?.generalSkills?.map((skill: string) => (
                <Tag key={skill} styleType="gray" size="medium">
                  {skill}
                </Tag>
              ))}
            </div>
          </UserInfoField>
        </div>
      </div>
    </div>
  );
};

export default UserInfoSection;
