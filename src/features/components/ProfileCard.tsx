import { Heart } from 'lucide-react';
import Image from 'next/image';

import { Tag, Typography } from '@/components/common';
import { IMAGE_BLUR } from '@/constants/imageBlur';
import { cn } from '@/utils/styleMerge';

export type ProfileType = {
  id: number;
  imageUrl: string;
  title: string;
  categories: string[];
  description: string;
  avatarUrl: string;
  author: string;
  likeCount: number;
  isLiked?: boolean;
};

type ProfileCardProps = {
  onClick?: () => void;
} & ProfileType;

export default function ProfileCard({
  imageUrl,
  title,
  categories,
  description,
  avatarUrl,
  author,
  likeCount,
  isLiked,
  onClick,
}: ProfileCardProps) {
  return (
    <div className="shadow-button min-w-[230px] rounded-[10px] cursor-pointer">
      <Image
        src={imageUrl}
        alt={title}
        width={230}
        height={200}
        placeholder="blur"
        blurDataURL={IMAGE_BLUR}
        className="w-full h-50 object-cover rounded-t-[10px] box-border"
      />
      <div className="flex flex-col gap-2 h-36 border-t-1 border-gray-20 py-[6px] px-2 bg-white">
        <Typography type="title2">{title}</Typography>
        <div className="flex flex-wrap gap-1">
          {categories.map((category, idx) => (
            <Tag key={idx} size="small" styleType="gray">
              {category}
            </Tag>
          ))}
        </div>
        <Typography type="body4" className="text-gray-50 line-clamp-3">
          {description}
        </Typography>
      </div>
      <div className="border-t-1 border-gray-20 flex items-center justify-between rounded-b-[10px] py-[6px] px-2">
        <div className="flex items-center gap-2">
          <Image
            src={avatarUrl}
            alt={author}
            width={24}
            height={24}
            className="rounded-full object-cover border border-gray-30"
          />
          <div className="flex gap-1">
            <Typography type="body3" className="text-gray-40">
              by
            </Typography>
            <Typography type="body3" className="text-gray-70">
              {author}
            </Typography>
          </div>
        </div>
        <div onClick={onClick} className="flex items-center gap-1">
          <Heart
            size={15}
            fill={isLiked ? 'var(--color-primary)' : 'none'}
            className={cn('transition mb-[2px]', isLiked ? 'text-primaryHover' : 'text-gray-50')}
          />
          <Typography type="body5" className="text-gray-60">
            {likeCount}
          </Typography>
        </div>
      </div>
    </div>
  );
}
