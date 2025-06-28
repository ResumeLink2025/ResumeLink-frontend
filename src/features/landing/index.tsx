import { PageWrapper } from '@/layouts';

import CallToActionSection from './CallToActionSection';
import FeaturesSection from './FeaturesSection';
import HeroSection from './HeroSection';

const Landing = () => {
  return (
    <PageWrapper>
      <HeroSection />
      <FeaturesSection />
      <CallToActionSection />
    </PageWrapper>
  );
};

export default Landing;
