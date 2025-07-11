import type { ChangeEvent} from 'react';
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
  const [desirePosition, setDesirePosition] = useState<string>(''); // 희망 직무
  const [experienceYears, setExperienceYears] = useState<number>(0); // 연차

  const handleUploadImageFile = (files?: FileList | null) => {
    if (!files || files.length === 0) {
      setImageUrl(null);
      setValue('profileImage', null);
      return;
    }
    const imageFile = files[0];
    const imageURL = URL.createObjectURL(imageFile);
    setValue('profileImage', imageFile, { shouldDirty: true, shouldValidate: true });
    setImageUrl(imageURL);
  };

  const handleNickName = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNickName(value);
    setValue('nickname', value, { shouldDirty: true, shouldValidate: true });
  };

  const handleBirthday = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const date = value ? new Date(value) : null;
    setBirthday(date);
    setValue('birthday', date as Date, { shouldDirty: true, shouldValidate: true });
  };

  const handleGender = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const value = e.target.value as UserProfileType['gender'];
    setGender(value);
    setValue('gender', value, { shouldDirty: true, shouldValidate: true });
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
