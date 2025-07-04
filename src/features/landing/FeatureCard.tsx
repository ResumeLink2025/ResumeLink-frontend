import { Typography } from '@/components/common';

import { SlideUpMotion } from '../components';

interface FeatureCardProps {
  title: string;
  icon: React.ElementType;
  description: string;
  delay?: number;
}

const FeatureCard = ({ title, icon: Icon, description, delay = 0 }: FeatureCardProps) => {
  return (
    <SlideUpMotion delay={0.5 + delay}>
      <div className="shadow-button p-5 rounded-lg h-50 flex flex-col gap-2">
        <Icon className="text-gray-70 size-7 mb-3" />
        <Typography type="title1">{title}</Typography>
        <Typography type="body2" className="text-gray-60">
          {description}
        </Typography>
      </div>
    </SlideUpMotion>
  );
};

export default FeatureCard;
