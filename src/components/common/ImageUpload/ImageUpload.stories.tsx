import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';

import ImageUploadButton from '.';

type ImageUploadButtonType = typeof ImageUploadButton;

const meta: Meta<ImageUploadButtonType> = {
  title: 'common/ImageUploadButton',
  component: ImageUploadButton,
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['medium', 'large'],
    },
  },
};

export default meta;

export const DefaultImageUploadButton: StoryObj<ImageUploadButtonType> = {
  render: (args) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleUploadFile = (files?: FileList | null) => {
      if (!files || files.length === 0) {
        setImageUrl(null); // X버튼 클릭시 이미지 제거하기 위해서 이부분이 꼭 필요함

        return;
      }

      const file = files[0];

      console.log('file', file);
      const imageUrl = URL.createObjectURL(file);

      setImageUrl(imageUrl);
    };

    return (
      <div>
        <ImageUploadButton {...args} previewUrl={imageUrl} uploadFile={handleUploadFile} />
      </div>
    );
  },
};
