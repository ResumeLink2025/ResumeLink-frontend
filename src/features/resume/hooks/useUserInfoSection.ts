import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import useGetMyProfile from '@/hooks/apis/profile/useGetMyProfile';

import type { ResumeFormDataType } from './../schemas/resumeSchema';

const useUserInfoSection = () => {
  const { setValue } = useFormContext<ResumeFormDataType>();
  const { data: myProfile } = useGetMyProfile();

  useEffect(() => {
    if (!myProfile) return;

    setValue(
      'skills',
      myProfile?.profile.user.userSkills.map((skill) => skill.skill.name),
    );
    setValue(
      'positions',
      myProfile?.profile.user.desirePositions.map((position) => position.position.name).join(','),
    );
  }, [setValue, myProfile]);

  return { myProfile };
};

export default useUserInfoSection;
