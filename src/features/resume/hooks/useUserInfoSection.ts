import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

import useUploadImage from '@/hooks/apis/image/useUploadImage';

import type { ResumeFormDataType } from '../schemas/resumeSchema';
import type { UserInfoSectionProps } from '../UserInfoSection';

const useUserInfoSection = ({ myProfile, resumeImageUrl }: Omit<UserInfoSectionProps, 'id'>) => {
  const { setValue } = useFormContext<ResumeFormDataType>();

  const { mutate: uploadImage } = useUploadImage({
    onSuccess: (response) => {
      setValue('resumeImgUrl', response.imageUrl);
    },
    onError: () => {
      toast.error('이미지 업로드중 올류가 발생했습니다.');
    },
  });

  const [imageUrl, setImageUrl] = useState<string | null>(
    resumeImageUrl ?? myProfile?.profile.imageUrl ?? null,
  );

  const handleUploadImageFile = (files?: FileList | null) => {
    if (!files) {
      setImageUrl(null);
      setValue('resumeImgUrl', null);

      return;
    }

    const imageFile = files[0];
    const imageURL = URL.createObjectURL(imageFile);

    setImageUrl(imageURL);
    uploadImage(imageFile);
  };

  return { imageUrl, handleUploadImageFile };
};

export default useUserInfoSection;
