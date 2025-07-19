import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';

import ImageUpload from '.';

type ImageUploadType = typeof ImageUpload;

const meta: Meta<ImageUploadType> = {
  title: 'common/ImageUpload',
  component: ImageUpload,
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['medium', 'large'],
    },
  },
};

export default meta;

export const DefaultImageUpload: StoryObj<ImageUploadType> = {
  render: (args) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleUploadFile = (files?: FileList | null) => {
      if (!files || files.length === 0) {
        setImageUrl(null); // X버튼 클릭시 이미지 제거하기 위해서 이부분이 꼭 필요함

        return;
      }

      const file = files[0];

      const imageUrl = URL.createObjectURL(file);

      setImageUrl(imageUrl);
    };

    return <ImageUpload {...args} previewUrl={imageUrl} uploadFile={handleUploadFile} />;
  },
};
