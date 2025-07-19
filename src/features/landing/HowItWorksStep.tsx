import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

import { Typography } from '@/components/common';
import { IMAGE_BLUR } from '@/constants/imageBlur';
import { cn } from '@/utils/styleMerge';

interface HowItWorksStepProps {
  id: number;
  title: string;
  description: string;
  image: string;
}

const HowItWorksStep = ({ id, title, description, image }: HowItWorksStepProps) => {
  const { ref, inView } = useInView({ threshold: 0.35, triggerOnce: true });
  const reverseItemOrder = id % 2 === 0;

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col lg:flex-row gap-4 items-center justify-between transition-opacity duration-1000 ease-in-out',
        inView ? 'opacity-100' : 'opacity-0',
        reverseItemOrder && 'lg:flex-row-reverse',
      )}
    >
      <Image src={image} width={500} height={338} alt={title} placeholder="blur" blurDataURL={IMAGE_BLUR} />
      <div className="flex flex-col gap-4 max-w-130">
        <Typography type="heading1">{title}</Typography>
        <Typography type="body1" className="text-gray-50">
          {description}
        </Typography>
      </div>
    </div>
  );
};

export default HowItWorksStep;
