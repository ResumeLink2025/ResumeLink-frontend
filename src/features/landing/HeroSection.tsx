import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button, Typography } from '@/components/common';
import useRedirectPath from '@/hooks/useRedirectPath';

import { SlideUpMotion } from '../components';

const HeroSection = () => {
  const router = useRouter();

  const routePath = useRedirectPath();
  return (
    <div className="px-8 py-10">
      <div className="relative h-150 p-5 rounded-lg overflow-hidden">
        <Image src="/images/landing-hero.avif" alt="hero" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-black opacity-45 rounded-lg" />
        <div className="relative h-full z-5 flex flex-col gap-3 items-center justify-center text-white">
          <SlideUpMotion>
            <Typography type="hero1" className="inline-block text-center">
              AI를 사용하여 이력서를 작성해보세요!
            </Typography>
          </SlideUpMotion>
          <SlideUpMotion delay={0.5}>
            <Typography type="body1" className="inline-block text-center">
              AI로 빠르고 간편하게 이력서를 완성해보세요. 기본 정보만 입력하면 이력서가 자동으로 생성돼요.
              <br />
              작성 후에는 편집하거나 AI의 검토를 받아 이력서의 완성도를 높여보세요!
            </Typography>
          </SlideUpMotion>
          <SlideUpMotion delay={0.9}>
            <Button onClick={() => router.push(routePath)} className="w-36 mt-4">
              시작하기
            </Button>
          </SlideUpMotion>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
