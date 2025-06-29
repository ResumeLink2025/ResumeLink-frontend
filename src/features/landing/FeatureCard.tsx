import { Typography } from '@/components/common';

type FeatureCardProps = {
  title: string;
  icon: React.ElementType;
  description: string;
};

const FeatureCard = ({ title, icon: Icon, description }: FeatureCardProps) => {
  return (
    <div className="shadow-button p-5 rounded-lg h-50 flex flex-col gap-2">
      <Icon className="text-gray-70 size-7 mb-3" />
      <Typography type="title1">{title}</Typography>
      <Typography type="body2" className="text-gray-60">
        {description}
      </Typography>
    </div>
  );
};

export default FeatureCard;
