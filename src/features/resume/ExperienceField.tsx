import type { UseFormRegister } from 'react-hook-form';

import { Tag, Typography } from '@/components/common';
import Textarea from '@/components/common/Textarea';

import type { ResumeFormDataType } from './schemas/resumeSchema';

interface ExperienceFieldProps {
  register: UseFormRegister<ResumeFormDataType>;
  errorMessage?: string;
}

const ExperienceField = ({ register, errorMessage }: ExperienceFieldProps) => {
  return (
    <div className="p-5 border-2 border-dashed border-gray-60 rounded-[10px] flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Typography type="heading2">개발 관련 경험</Typography>
        <Tag size="small">필수</Tag>
      </div>
      <Textarea
        placeholder="개발 관련 경험을 작성해주세요. (공부했던 언어, 참여했던 헤커톤 등등)"
        {...register('experienceNote')}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default ExperienceField;
