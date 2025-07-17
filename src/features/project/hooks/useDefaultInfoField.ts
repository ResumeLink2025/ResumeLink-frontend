import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

import useUploadImage from '@/hooks/apis/image/useUploadImage';

import type { ProjectFormDataType } from '../schemas/projectSchema';

const useDefaultInfoField = (defaultImageUrl?: string) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<ProjectFormDataType>();

  const { mutate: uploadImage } = useUploadImage({
    onSuccess: (response) => {
      setValue('imgUrl', response.imageUrl);
    },
    onError: () => {
      toast.error('이미지 업로드중 올류가 발생했습니다.');
    },
  });
  const [imageUrl, setImageUrl] = useState<string | null>(defaultImageUrl ?? null);

  const handleUploadImageFile = (files?: FileList | null) => {
    if (!files) {
      setImageUrl(null);
      setValue('imgUrl', null);

      return;
    }

    const imageFile = files[0];
    const imageURL = URL.createObjectURL(imageFile);

    setImageUrl(imageURL);
    uploadImage(imageFile);
  };

  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  return { imageUrl, errors, handleUploadImageFile, register };
};

export default useDefaultInfoField;
