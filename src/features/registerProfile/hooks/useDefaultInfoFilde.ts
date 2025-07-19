import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { uploadImage } from '../apis/userInfoApi';
import type { UserProfileType } from '../shcemas/userProfileSchema';

const useDefaultInfoField = () => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<UserProfileType>();

  // imageUrl(미리보기 용), 닉네임, 생일, 성별, 희망직무(배열), 연차
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [nickName, setNickName] = useState<string>('');
  const [birthday, setBirthday] = useState<string | null>(null);
  const [gender, setGender] = useState<UserProfileType['gender']>(null);
  const [desirePositions, setDesirePositions] = useState<string[]>([]); // ★ 배열로 변경
  const [experienceYears, setExperienceYears] = useState<number>(0);

  const handleUploadImageFile = async (files?: FileList | null) => {
    if (!files || files.length === 0) {
      setImageUrl(null); // 미리보기용
      setValue('imageUrl', null, { shouldDirty: true, shouldValidate: false });
      return;
    }

    const file = files[0];

    const previewUrl = URL.createObjectURL(file);
    setImageUrl(previewUrl);

    try {
      const serverUrl = await uploadImage(file); // 이게 실제 url
      setValue('imageUrl', serverUrl, { shouldDirty: true, shouldValidate: false });
    } catch {
      setValue('imageUrl', null, { shouldDirty: true, shouldValidate: false });
    }
  };
  // 닉네임
  const handleNickName = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNickName(value);
    setValue('nickname', value, { shouldDirty: true, shouldValidate: false });
  };

  // 생일
  const handleBirthday = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || null;
    setBirthday(value);
    setValue('birthday', value, { shouldDirty: true, shouldValidate: true });
  };

  // 성별
  const handleGender = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const value = e.target.value || null;
    setGender(value as UserProfileType['gender']);
    setValue('gender', value, { shouldDirty: true, shouldValidate: false });
  };

  // 희망직무 (배열형, 단일 선택도 배열로)
  const handleDesirePosition = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const value = e.target.value;
    setDesirePositions([value]); // ★ 배열로 set
    setValue('desirePositions', [value], { shouldDirty: true, shouldValidate: false });
  };

  // 만약 복수 선택 지원이면
  // const handleDesirePositions = (values: string[]) => {
  //   setDesirePositions(values);
  //   setValue('desirePositions', values, { shouldDirty: true, shouldValidate: false });
  // }

  // 연차
  const handleExperienceYears = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const value = Number(e.target.value);
    setExperienceYears(value);
    setValue('experienceYears', value, { shouldDirty: true, shouldValidate: false });
  };

  // 마운트 시 기존 값 세팅
  useEffect(() => {
    // 초기값 세팅 (폼에 watch 있으면 여기서 가져와도 됨)
    setImageUrl(watch('imageUrl') ?? null);
    setNickName(watch('nickname') ?? '');
    setBirthday(watch('birthday') ?? null);
    setGender(watch('gender') ?? null);
    setDesirePositions(watch('desirePositions') ?? []);
    setExperienceYears(watch('experienceYears') ?? 0);
  }, []);

  // 이미지 URL 정리
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
    desirePositions, // ★ 배열 상태로 반환
    experienceYears,
    handleUploadImageFile,
    handleNickName,
    handleBirthday,
    handleGender,
    handleDesirePosition,
    handleExperienceYears,
    setValue, // 필요하면 외부에서도 set 가능
  };
};

export default useDefaultInfoField;
