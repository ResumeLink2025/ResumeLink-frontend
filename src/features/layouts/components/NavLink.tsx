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
  const currentPath = navHref.split('?')[0];

  return (
    <Link
      href={navHref}
      className={cn('cursor-pointer py-[5px]', pathname.includes(currentPath) && 'shadow-border-b')}
    >
      <Typography type="body2" className="hover:bg-gray-10 py-[5px] px-[6px] rounded-md">
        {title}
      </Typography>
    </Link>
  );
};

export default NavLink;
