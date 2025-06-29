'use client';

import { PageWrapper } from '@/layouts';

import FeaturesSection from './FeaturesSection';
import HeroSection from './HeroSection';
import HowItWorksSection from './HowItWorksSection';

const Landing = () => {
  return (
    <PageWrapper>
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
    </PageWrapper>
  );
};

export default Landing;
