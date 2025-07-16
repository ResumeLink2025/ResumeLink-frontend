import Image from 'next/image';

import { Tag, Typography } from '@/components/common';
import { IMAGE_BLUR } from '@/constants/imageBlur';
import { USER_INFO } from '@/constants/resume';

import useUserInfoSection from './hooks/useUserInfoSection';
import UserInfoField from './UserInfoField';

interface UserInfoSectionProps {
  id?: string;
}

const UserInfoSection = ({ id }: UserInfoSectionProps) => {
  const { myProfile } = useUserInfoSection();

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
        <Image
          src={USER_INFO.image}
          width={168}
          height={168}
          alt="user-image"
          placeholder="blur"
          blurDataURL={IMAGE_BLUR}
          className="rounded-[10px] flex-shrink-0"
        />
        <div className="flex-1 grid grid-cols-2">
          <UserInfoField label="이름" value={myProfile?.profile.nickname} />
          <UserInfoField
            label="관심 직군"
            value={myProfile?.profile.user.desirePositions
              .map((position) => position.position.name)
              .join(',')}
          />
          <UserInfoField label="기술 스택">
            <div className="flex flex-wrap gap-1">
              {myProfile?.profile.user.userSkills.map((skill) => (
                <Tag key={skill.skill.id} styleType="gray" size="medium">
                  {skill.skill.name}
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
