'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Typography } from '@/components/common';
import { cn } from '@/utils/styleMerge';

interface NavLinkProps {
  navHref: string;
  title: string;
}

const NavLink = ({ navHref, title }: NavLinkProps) => {
  const pathname = usePathname();

  return (
    <Link
      href={navHref}
      className={cn('cursor-pointer py-[5px]', pathname.includes(navHref) && 'shadow-border-b')}
    >
      <Typography type="body2" className="hover:bg-gray-10 p-[5px] rounded-md">
        {title}
      </Typography>
    </Link>
  );
};

export default NavLink;
