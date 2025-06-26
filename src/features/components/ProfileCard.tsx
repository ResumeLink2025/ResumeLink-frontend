'use client';
import { Heart } from 'lucide-react';
import Image from 'next/image';

import UseLikeToggle from '@/hooks/UseLikeToggle';

interface ProfileCardProps {
  imageUrl: string;
  title: string;
  year: string;
  description: string;
  avatarUrl: string;
  author: string;
  likes: number;
}

export default function ProfileCard({
  imageUrl,
  title,
  year,
  description,
  avatarUrl,
  author,
  likes,
}: ProfileCardProps) {
  const { liked, count, toggle } = UseLikeToggle(false, likes);

  return (
    <div
      className="rounded-2xl overflow-hidden bg-white"
      style={{ boxShadow: 'var(--shadow-button)', width: 230 }}
    >
      <Image
        src={imageUrl}
        alt={title}
        width={230}
        height={180}
        className="w-full object-cover rounded-t-xl"
        style={{ height: 180, border: '0.5px solid var(--color-gray-30)', boxSizing: 'border-box' }}
      />
      <div className="space-y-2" style={{ width: 230 }}>
        <div className="px-4 py-2">
          <h3 className=" text-[var(--color-gray-70)] py-1 px-0 m-0" style={{ fontWeight: 500 }}>
            {title}
          </h3>

          <span
            className="bg-[var(--color-gray-20)] text-[var(--color-gray-60)] rounded py-1 px-1 "
            style={{ fontSize: 'var(--text-5xs)' }}
          >
            {year}년차
          </span>

          <p
            className="line-clamp-3 leading-relaxed py-1 px-0 my-1"
            style={{
              color: 'var(--color-gray-60)',
              fontSize: 'var(--text-5xs)',
            }}
          >
            {description}
          </p>
        </div>

        <div
          className="flex justify-between items-center text-[var(--text-5xs)] pt-2 mt-2 border-[var(--color-gray-20)] px-4 py-3"
          style={{ boxSizing: 'border-box', borderTop: '0.5px solid var(--color-gray-30) ' }}
        >
          <div className="flex items-center gap-2">
            <Image
              src={avatarUrl}
              alt={`${author} `}
              width={24}
              height={24}
              className="rounded-full object-cover"
              style={{ border: '1px solid var(--color-gray-30)' }}
            />
            <span className="text-[var(--color-gray-50)]" style={{ fontSize: 'var(--text-5xs)' }}>
              by{' '}
              <strong className="text-[var(--color-gray-60)] fl" style={{ fontSize: 'var(--text-5xs)' }}>
                @{author}
              </strong>
            </span>
          </div>

          <button onClick={toggle} className="flex items-center gap-1 focus:outline-none">
            <Heart
              size={14}
              className={`transition-colors ${
                liked ? 'text-[var(--color-primary)]' : 'text-[var(--color-gray-50)]'
              }`}
              fill={liked ? 'var(--color-primary)' : 'none'}
              cursor="pointer"
            />
            <span className="text-[var(--color-gray-60)]" style={{ fontSize: 'var(--text-5xs)' }}>
              {count}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
