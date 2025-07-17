import { Heart } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Tag, Tooltip, Typography } from '@/components/common';
import { IMAGE_BLUR } from '@/constants/imageBlur';
import { cn } from '@/utils/styleMerge';

export type ResumeProfileType = {
  id: string;
  imageUrl?: string;
  title: string;
  positions: string[];
  skills: string[];
  categories?: string[];
  summary?: string;
  avatarUrl?: string;
  nickname?: string;
  favoriteCount?: number;
  isFavorited?: boolean;
};

type ResumeProfileCardProps = {
  onClick?: (e: React.MouseEvent<HTMLDivElement>, id: string) => void;
} & ResumeProfileType;

const ResumeProfileCard = ({
  id,
  imageUrl,
  title,
  positions,
  skills,
  summary,
  avatarUrl,
  nickname,
  favoriteCount,
  isFavorited,
  onClick,
}: ResumeProfileCardProps) => {
  const router = useRouter();

  return (
    <div
      className="shadow-button min-w-[230px] rounded-[10px] cursor-pointer"
      onClick={() => router.push(`/resume/${id}`)}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
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
          {title}
        </Typography>
        <div className="flex gap-1">
          {positions.length > 0 && (
            <Tooltip
              content={
                <div className="flex flex-wrap gap-2">
                  {positions.map((position) => (
                    <Tag key={position}>{position}</Tag>
                  ))}
                </div>
              }
            >
              <Tag styleType="gray">포지션</Tag>
            </Tooltip>
          )}
          {skills.length > 0 && (
            <Tooltip
              content={
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Tag key={skill}>{skill}</Tag>
                  ))}
                </div>
              }
            >
              <Tag styleType="gray">기술 스택</Tag>
            </Tooltip>
          )}
        </div>
        <Typography type="body5" className="text-gray-50 line-clamp-3">
          {summary}
        </Typography>
      </div>
      <div className="bg-white border-t-1 border-gray-20 flex items-center justify-between rounded-b-[10px] py-[6px] px-2">
        <div className="flex items-center gap-2">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt="profile-image"
              width={24}
              height={24}
              className="rounded-full object-cover border border-gray-30"
            />
          ) : (
            <div className="size-6 rounded-full bg-gray-30" />
          )}
          <div className="flex gap-1">
            <Typography type="body3" className="text-gray-40">
              by
            </Typography>
            <Typography type="body3" className="text-gray-70">
              {nickname}
            </Typography>
          </div>
        </div>
        <div onClick={(e) => onClick?.(e, id)} className="flex items-center gap-1">
          <Heart
            size={15}
            fill={isFavorited ? 'var(--color-primary)' : 'none'}
            className={cn('transition', isFavorited ? 'text-primaryHover' : 'text-gray-50')}
          />
          <Typography type="body5" className="text-gray-60">
            {favoriteCount}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default ResumeProfileCard;
