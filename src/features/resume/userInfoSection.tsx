import Image from 'next/image';

import { Tag, Typography } from '@/components/common';
import Textarea from '@/components/common/Textarea';
import { IMAGE_BLUR } from '@/constants/imageBlur';
import { USER_INFO } from '@/constants/resume';

const UserInfoSection = () => {
  return (
    <div className="mt-12 flex flex-col">
      <div className="flex flex-col gap-1">
        <Typography type="heading1">이력서 생성하기</Typography>
        <Typography type="body1" className="text-gray-50">
          [필수] 표시가 되어있는 항목은 꼭 작성해 주세요.
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
          className="rounded-[10px]"
        />
        <div className="w-full grid grid-cols-2 h-[168px]">
          <div className="flex flex-col gap-2">
            <Typography type="body2">이름</Typography>
            <Typography type="body2" className="text-gray-50">
              {USER_INFO.name}
            </Typography>
          </div>
          <div className="flex flex-col gap-2">
            <Typography type="body2">관심 직군</Typography>
            <Typography type="body2" className="text-gray-50">
              {USER_INFO.interested.join(', ')}
            </Typography>
          </div>
          <div className="col-span-2 flex flex-col gap-2">
            <Typography type="body2">기술 스택</Typography>
            <div className="flex flex-wrap gap-1">
              {USER_INFO.skills.map((skill) => (
                <Tag key={skill} styleType="gray" size="small">
                  {skill}
                </Tag>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Textarea />
    </div>
  );
};

export default UserInfoSection;
