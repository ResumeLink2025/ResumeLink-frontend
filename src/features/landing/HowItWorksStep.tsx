import Image from 'next/image';

import { Typography } from '@/components/common';

type HowItWorksStepProps = {
  title: string;
  description: string;
  image: string;
};

const HowItWorksStep = ({ title, description, image }: HowItWorksStepProps) => {
  return (
    <div>
      <div>
        <Typography>{title}</Typography>
        <Typography>{description}</Typography>
      </div>
      <Image src={image} width={500} height={500} alt="image" />
    </div>
  );
};

export default HowItWorksStep;
