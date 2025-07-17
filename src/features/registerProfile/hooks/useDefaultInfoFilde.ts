import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import type { UserProfileType } from '../shcemas/userProfileSchema';

const useDefaultInfoField = () => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<UserProfileType>();

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [nickName, setNickName] = useState<string>('');
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [gender, setGender] = useState<UserProfileType['gender']>(null);
  const [desirePosition, setDesirePosition] = useState<string>('');
  const [experienceYears, setExperienceYears] = useState<number>(0);

  const handleUploadImageFile = (files?: FileList | null) => {
    if (!files || files.length === 0) {
      setImageUrl(null);
      setValue('profileImage', null, { shouldDirty: true, shouldValidate: false });
      return;
    }
    const file = files[0];
    setValue('profileImage', file, { shouldDirty: true, shouldValidate: false });
    setImageUrl(URL.createObjectURL(file));
  };

  const handleNickName = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNickName(value);
    setValue('nickname', value, { shouldDirty: true, shouldValidate: false });
  };

  const handleBirthday = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const date = value ? new Date(value) : null;
    setBirthday(date);
    setValue('birthday', date, { shouldDirty: true, shouldValidate: true });
  };

  const handleGender = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {

    const value = e.target.value || null; // 빈 값일 때 null 처리
    setGender(value);
    setValue('gender', value, { shouldDirty: true, shouldValidate: false });
  };

  const handleDesirePosition = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setDesirePosition(value);
    setValue('desirePositions', [value], { shouldDirty: true, shouldValidate: false });
  };

  const handleExperienceYears = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const value = Number(e.target.value);
    setExperienceYears(value);
    setValue('experienceYears', value, { shouldDirty: true, shouldValidate: false });
  };

  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  return {
    register,
    errors,
    imageUrl,
    nickName,
    birthday,
    gender,
    desirePosition,
    experienceYears,
    handleUploadImageFile,
    handleNickName,
    handleBirthday,
    handleGender,
    handleDesirePosition,
    handleExperienceYears,
  };
};

export default useDefaultInfoField;
