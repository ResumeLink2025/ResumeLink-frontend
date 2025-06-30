import { useState } from 'react';

import type { DevelopExperienceType, DevelopOccupationType } from '@/constants/developersHub';

const useResumeCategory = () => {
  const [experience, setExperience] = useState<DevelopExperienceType[]>([]);
  const [occupation, setOccupation] = useState<DevelopOccupationType[]>([]);

  const onClickExperience = (experience: DevelopExperienceType) => {
    setExperience((prevState) => {
      const isSelected = prevState.some((prevExperience) => prevExperience.id == experience.id);

      if (isSelected) {
        return prevState.filter((prevExperience) => prevExperience.id !== experience.id);
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
    console.log([...experience, ...occupation]);
  };

  return { experience, occupation, onClickExperience, onClickOccupation, onClickSearchKeyword };
};

export default useResumeCategory;
