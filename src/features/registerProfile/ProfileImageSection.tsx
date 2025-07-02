'use client';
import ImageUpload from '@/components/common/ImageUpload';

interface Props {
  imageUrl: string;
  handleUploadFile: (file: File) => void;
}

export default function ProfileImageSection({ imageUrl, handleUploadFile }: Props) {
  return (
    <div className="col-span-1 flex flex-col gap-2">
      <label className="text-sm font-medium text-black">프로필 사진</label>
      <ImageUpload size="profile" previewUrl={imageUrl} uploadFile={handleUploadFile} />
    </div>
  );
}
