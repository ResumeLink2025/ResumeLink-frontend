import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { USER_INFO } from '@/constants/resume';

import type { ResumeFormDataType } from './../schemas/resumeSchema';

const useUserInfoSection = () => {
  const { setValue } = useFormContext<ResumeFormDataType>();

  useEffect(() => {
    setValue('skills', USER_INFO.skills);
    setValue('positions', USER_INFO.positions);
  }, [setValue]);

  return {
    skills: USER_INFO.skills,
    positions: USER_INFO.positions,
  };
};

export default useUserInfoSection;
