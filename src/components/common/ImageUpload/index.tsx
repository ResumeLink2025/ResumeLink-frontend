'use client';

import { cva } from 'class-variance-authority';
import { Image, X } from 'lucide-react';
import type { InputHTMLAttributes } from 'react';

import { cn } from '@/utils/styleMerge';

import useUploadImage from './hooks/useUploadImage';

type ImageUploadProps = {
  size?: 'medium' | 'large' | 'profile';
  uploadFile: (files?: FileList | null) => void;
  previewUrl?: string | null;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;

const ImageUpload = ({ size = 'medium', uploadFile, previewUrl, ...props }: ImageUploadProps) => {
  const {
    handleClickRef,
    ref,
    isDragging,
    onDragEnter,
    onDragOver,
    onDragLeave,
    onDrop,
    onChangeFileUpload,
    onClickRemoveFile,
  } = useUploadImage(uploadFile);

  const imageUploadVariants = cva('rounded-[10px]', {
    variants: {
      size: {
        medium: 'size-42 p-3',
        large: 'size-45 p-3',
        profile: 'size-70 p-8',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  });

  return (
    <>
      {!previewUrl ? (
        <>
          <button
            type="button"
            onDragEnter={onDragEnter}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={handleClickRef}
            className={cn(
              'bg-gray-25 border-2 border-dashed border-gray-50 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-30 transition duration-150',
              imageUploadVariants({ size }),
              { 'border-primary': isDragging, 'p-0': previewUrl },
            )}
          >
            <Image
              size={{ medium: 45, large: 52, profile: 64 }[size]}
              className={cn(isDragging ? 'text-primaryHover' : 'text-gray-50', 'duration-150')}
            />
            <p className="text-sm text-gray-50 mt-2">클릭 또는 드래그를 이용하여 업로드 해주세요.</p>
          </button>
          <input ref={ref} onChange={onChangeFileUpload} className="hidden" type="file" multiple {...props} />
        </>
      ) : (
        <div
          className={cn(imageUploadVariants({ size }), 'border-1 border-gray-50 flex justify-end')}
          style={{
            backgroundImage: `url(${previewUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="flex items-center justify-center rounded-full bg-white size-7 cursor-pointer">
            <X size={20} onClick={onClickRemoveFile} />
          </div>
        </div>
      )}
    </>
  );
};

export default ImageUpload;
