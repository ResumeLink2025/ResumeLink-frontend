import Image from 'next/image';

import { Typography } from '@/components/common';

export const ProfileHederSection = () => {
  return (
    <>
      <Image src="/images/RESUMELINK.png" alt="RESUMELINK" width={200} height={40} className="mb-8" />
      <Typography type="title2" className="text-black mb-6">
        추가 정보 입력
      </Typography>
    </>
  );
};
