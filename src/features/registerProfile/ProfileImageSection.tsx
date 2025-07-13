import ImageUpload from '@/components/common/ImageUpload';

interface Props {
  imageUrl: string | null;
  handleUploadFile: (files?: FileList | null) => void;
}

export default function ProfileImageSection({ imageUrl, handleUploadFile }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-black">프로필 사진</label>
      <ImageUpload size="profile" previewUrl={imageUrl} uploadFile={handleUploadFile} />
    </div>
  );
}
