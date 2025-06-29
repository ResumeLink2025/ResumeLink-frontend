import { Button, Typography } from '@/components/common';
import { FEATURES_EXPLAIN } from '@/constants/landing';

import FeatureCard from './FeatureCard';

const FeaturesSection = () => {
  return (
    <>
      <div className="mt-30 flex flex-col">
        <Typography type="heading1">이력서 외에도 다양한 기능들을 경험해 보세요!</Typography>
        <Typography type="body1" className="mt-4 text-gray-60">
          다른 개발자분들이 작성한 이력서를 열람할 수 있어요. 마음에 드는 이력서가 있다면 커피챗을 신청해
          보세요!
          <br /> 신청이 승인되면 다양한 분야와 연차의 개발자분들과 자유롭게 이야기를 나눌 수 있어요.
        </Typography>
      </div>
      <div className="my-10 grid grid-cols-3 gap-4">
        {FEATURES_EXPLAIN.map((explain) => (
          <FeatureCard key={explain.title} {...explain} />
        ))}
      </div>
      <div className="mb-20 flex items-center justify-center">
        <Button size="large" className="w-42">
          시작하기
        </Button>
      </div>
    </>
  );
};

export default FeaturesSection;
