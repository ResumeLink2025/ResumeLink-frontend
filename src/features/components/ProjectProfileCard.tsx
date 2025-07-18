import { Heart } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { title } from 'process';

import { Tag, Tooltip, Typography } from '@/components/common';
import { IMAGE_BLUR } from '@/constants/imageBlur';
import type { ProjectDetailType } from '@/constants/project';
import { getProjectStatus } from '@/utils/getProjectStatus';
import { cn } from '@/utils/styleMerge';

type ProjectProfileCardProps = {
  onClick?: (e: React.MouseEvent<HTMLDivElement>, id: number) => void;
} & ProjectDetailType;

const ProjectProfileCard = ({
  imgUrl,
  projectDesc,
  projectName,
  projectNumber,
  skill,
  status,
  user,
  favoriteCount,
  isFavorite,
  onClick,
}: ProjectProfileCardProps) => {
  const router = useRouter();

  const devSkills = [...skill.generalSkills, ...skill.customSkills];

  return (
    <div
      className="shadow-button min-w-[230px] rounded-[10px] cursor-pointer bg-white"
      onClick={() => router.push(`/project/${projectNumber}`)}
    >
      {imgUrl ? (
        <Image
          src={imgUrl}
          alt={title}
          width={230}
          height={200}
          placeholder="blur"
          blurDataURL={IMAGE_BLUR}
          className="w-full h-50 object-cover rounded-t-[10px] box-border"
        />
      ) : (
        <div className="w-full h-50 rounded-t-[10px] bg-gray-30" />
      )}
      <div className="flex flex-col gap-2 h-36 border-t-1 border-gray-20 py-[6px] px-2 bg-white">
        <Typography type="title2" className="line-clamp-1">
          {projectName}
        </Typography>
        <div className="flex gap-1">
          {devSkills.length > 0 && (
            <Tooltip
              content={
                <div className="flex flex-wrap gap-2">
                  {devSkills.map((skill) => (
                    <Tag key={skill}>{skill}</Tag>
                  ))}
                </div>
              }
            >
              <Tag styleType="gray">기술 스택</Tag>
            </Tooltip>
          )}
          <Tag>{getProjectStatus(status)}</Tag>
        </div>
        <Typography type="body5" className="text-gray-50 line-clamp-3">
          {projectDesc}
        </Typography>
      </div>
      <div className="bg-white border-t-1 border-gray-20 flex items-center justify-between rounded-b-[10px] py-[6px] px-2">
        <div className="flex items-center gap-2">
          {user?.profile.imageUrl ? (
            <Image
              src={user.profile.imageUrl}
              alt="profile-image"
              width={24}
              height={24}
              className="rounded-full object-cover border border-gray-30 min-h-6"
            />
          ) : (
            <div className="size-6 rounded-full bg-gray-30" />
          )}
          <div className="flex gap-1">
            <Typography type="body3" className="text-gray-40">
              by
            </Typography>
            <Typography type="body3" className="text-gray-70">
              {user?.profile.nickname}
            </Typography>
          </div>
        </div>
        <div onClick={(e) => onClick?.(e, projectNumber)} className="flex items-center gap-1">
          <Heart
            size={15}
            fill={isFavorite ? 'var(--color-primary)' : 'none'}
            className={cn('transition', isFavorite ? 'text-primaryHover' : 'text-gray-50')}
          />
          <Typography type="body5" className="text-gray-60">
            {favoriteCount}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default ProjectProfileCard;
