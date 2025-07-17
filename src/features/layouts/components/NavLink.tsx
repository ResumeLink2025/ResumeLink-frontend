'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Typography } from '@/components/common';
import { cn } from '@/utils/styleMerge';

interface NavLinkProps {
  navHref: string;
  title: string;
}

const NavLink = ({ navHref, title }: NavLinkProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  const currentPath = navHref.split('?')[0];

  const onClickRouteHref = () => {
    router.push(navHref);
  };

  if (!mount) return null;

  return (
    <div
      onClick={onClickRouteHref}
      className={cn('cursor-pointer py-[5px]', pathname.includes(currentPath) && 'shadow-border-b')}
    >
      <Typography type="body2" className="hover:bg-gray-10 py-[5px] px-[6px] rounded-md">
        {title}
      </Typography>
    </div>
  );
};

export default NavLink;
