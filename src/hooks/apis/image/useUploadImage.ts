import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { post } from '@/apis/httpClient';

type uploadImageResponse = {
  imageUrl: string;
};

const useUploadImage = (options?: UseMutationOptions<uploadImageResponse, AxiosError, File>) => {
  return useMutation({
    mutationFn: (imageFile: File) => {
      const formData = new FormData();
      formData.append('image', imageFile);

      return post('/api/images', formData);
    },
    ...options,
  });
};
export default useUploadImage;
