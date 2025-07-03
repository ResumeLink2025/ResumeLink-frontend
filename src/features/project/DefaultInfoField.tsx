import { ImageUpload, Typography } from '@/components/common';
import Input from '@/components/common/Input';

import useDefaultInfoField from './hooks/useDefaultInfoField';

const DefaultInfoField = () => {
  const { imageUrl, errors, handleUploadImageFile, register } = useDefaultInfoField();

  return (
    <div className="flex flex-col mt-12 gap-3">
      <Typography type="heading2">기본 정보</Typography>
      <div className="flex items-center gap-6">
        <ImageUpload size="large" previewUrl={imageUrl} uploadFile={handleUploadImageFile} />
        <div className="flex-1 grid grid-cols-2 gap-4">
          <Input
            label="프로젝트 이름"
            className="col-span-2"
            placeholder="프로젝트 이름을 입력해주세요."
            {...register('projectName')}
            errorMessage={errors.projectName?.message}
          />
          <Input
            label="시작일"
            type="date"
            {...register('startDate')}
            errorMessage={errors.startDate?.message}
          />
          <Input label="종료일" type="date" {...register('endDate')} errorMessage={errors.endDate?.message} />
        </div>
      </div>
    </div>
  );
};

export default DefaultInfoField;
