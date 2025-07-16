import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import useUploadImage from '@/hooks/apis/image/useUploadImage';

import type { ProjectFormDataType } from '../schemas/projectSchema';

const useDefaultInfoField = () => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<ProjectFormDataType>();

  const { mutate: uploadImage } = useUploadImage({
    onSuccess: (response) => {
      setValue('projectImage', response.imageUrl);
    },
  });
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleUploadImageFile = (files?: FileList | null) => {
    if (!files) {
      setImageUrl(null);
      setValue('projectImage', null);

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
