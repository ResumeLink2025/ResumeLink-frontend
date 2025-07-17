import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import type { DevelopOccupationType, DevelopSkillType } from '@/constants/developersHub';

const useResumeCategory = (onClose: () => void) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [devSkill, setDevSkill] = useState<DevelopSkillType[]>([]);
  const [occupation, setOccupation] = useState<DevelopOccupationType[]>([]);

  const isTypeProject = searchParams.get('type') === 'project';

  const onClickDevSkill = (experience: DevelopSkillType) => {
    setDevSkill((prevState) => {
      const isSelected = prevState.some((prevDevSkill) => prevDevSkill.id == experience.id);

      if (isSelected) {
        return prevState.filter((prevDevSkill) => prevDevSkill.id !== experience.id);
      } else {
        return [...prevState, experience];
      }
    });
  };

  const onClickOccupation = (occupation: DevelopOccupationType) => {
    setOccupation((prevState) => {
      const isSelected = prevState.some((prevOccupation) => prevOccupation.id == occupation.id);

      if (isSelected) {
        return prevState.filter((prevOccupation) => prevOccupation.id !== occupation.id);
      } else {
        return [...prevState, occupation];
      }
    });
  };

  const onClickSearchKeyword = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (devSkill.length > 0) {
      params.set('skillNames', [...devSkill].map((skill) => skill.skill.replace(/\s+/g, '')).join(','));
    }
    if (occupation.length > 0) {
      params.set(
        'positionNames',
        [...occupation].map((occupation) => occupation.occupation.replace(/\s+/g, '')).join(','),
      );
    }

    router.push(`?${params.toString().replace(/%2C/g, ',')}`);
    onClose();
  };

  return { devSkill, occupation, isTypeProject, onClickDevSkill, onClickOccupation, onClickSearchKeyword };
};

export default useResumeCategory;
