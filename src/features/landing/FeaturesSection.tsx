import { useRouter } from 'next/navigation';
import { useInView } from 'react-intersection-observer';

import { Button, Typography } from '@/components/common';
import { FEATURES_EXPLAIN } from '@/constants/landing';
import { routeLoginPage } from '@/constants/routes';

import { SlideUpMotion } from '../components';
import FadeInOutMotion from '../components/motions/FadeInOutMotion';
import FeatureCard from './FeatureCard';

const FeaturesSection = () => {
  const { ref: featuresRef, inView } = useInView({ threshold: 0.35, triggerOnce: true });
  const router = useRouter();

  return (
    <>
      <div ref={featuresRef} className="mt-20 h-5" />
      {inView && (
        <FadeInOutMotion delay={0.5}>
          <div className="flex flex-col">
            <Typography type="heading1">이력서 외에도 다양한 기능들을 경험해 보세요!</Typography>
            <Typography type="body1" className="mt-4 text-gray-60">
              다른 개발자분들이 작성한 이력서를 열람할 수 있어요. 마음에 드는 이력서가 있다면 커피챗을 신청해
              보세요!
              <br /> 신청이 승인되면 다양한 분야와 연차의 개발자분들과 자유롭게 이야기를 나눌 수 있어요.
            </Typography>
          </div>

          <div className="my-10 grid grid-cols-3 gap-4">
            {FEATURES_EXPLAIN.map((explain) => (
              <FeatureCard key={explain.id} {...explain} delay={explain.id * 0.35} />
            ))}
          </div>

          <SlideUpMotion delay={2}>
            <div className="mb-20 flex items-center justify-center">
              <Button onClick={() => router.push(routeLoginPage)} size="large" className="w-42">
                시작하기
              </Button>
            </div>
          </SlideUpMotion>
        </FadeInOutMotion>
      )}
    </>
  );
};

export default FeaturesSection;
