import { Typography } from '@/components/common';
import { HOW_IT_WORKS_EXPLAIN } from '@/constants/landing';

import { SlideUpMotion } from '../components';
import HowItWorksStep from './HowItWorksStep';

const HowItWorksSection = () => {
  return (
    <div className="flex flex-col mt-20 px-8">
      <SlideUpMotion delay={1.5}>
        <Typography type="heading1" className="block mb-2">
          ResumeLink, 이렇게 활용해 보세요!
        </Typography>
        <Typography type="body1" className="text-gray-60">
          ResumeLink 이용이 처음이신가요? 아래 가이드에 따라 쉽게 시작해보세요!
        </Typography>
      </SlideUpMotion>
      <div className="flex flex-col mt-8 gap-20 lg:gap-0">
        {HOW_IT_WORKS_EXPLAIN.map((explain) => (
          <HowItWorksStep key={explain.id} {...explain} />
        ))}
      </div>
    </div>
  );
};

export default HowItWorksSection;
