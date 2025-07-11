import type { UseFormRegister } from 'react-hook-form';

import { Typography } from '@/components/common';
import Input from '@/components/common/Input';

import type { ResumeFormDataType } from './schemas/resumeSchema';

interface TitleFieldProps {
  errorMessage?: string;
  register: UseFormRegister<ResumeFormDataType>;
}

const TitleField = ({ errorMessage, register }: TitleFieldProps) => {
  return (
    <div className="flex flex-col gap-1">
      <Typography type="body1">이력서 제목</Typography>
      <Input
        placeholder="이력서의 제목을 작성해 주세요."
        {...register('title')}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default TitleField;
