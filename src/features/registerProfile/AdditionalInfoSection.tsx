import { useFormContext } from 'react-hook-form';

import { Typography } from '@/components/common';
import CustomSelectBox from '@/components/common/customSelectBox';

import type { UserProfileType } from '../registerProfile/shcemas/userProfileSchema';

interface Props {
  jobOptions: { label: string; value: string }[];
  yearOptions: { label: string; value: string }[];
}

export default function AdditionalInfoSection({ jobOptions, yearOptions }: Props) {
  const { setValue, watch } = useFormContext<UserProfileType>();

  // 객체 형태이므로 id 추출 필요
  const desirePositions = watch('user.desirePositions') ?? [];
  const selectedJobId = desirePositions[0]?.position?.id ?? '';

  const experienceYears = watch('experienceYears');

  return (
    <>
      <div className="flex flex-col gap-2">
        <Typography type="body4">희망 직무</Typography>
        <CustomSelectBox
          options={jobOptions}
          value={selectedJobId}
          onChange={(v) => {
            // value로 받은 id로 다시 jobOptions에서 전체 객체 찾아서 할당
            const job = jobOptions.find((opt) => opt.value === v);
            if (job) {
              setValue('user.desirePositions', [{ position: { id: job.value, name: job.label } }], {
                shouldDirty: true,
              });
            } else {
              setValue('user.desirePositions', [], { shouldDirty: true });
            }
          }}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Typography type="body4">연차</Typography>
        <CustomSelectBox
          options={yearOptions}
          value={experienceYears ? String(experienceYears) : ''}
          onChange={(v) => setValue('experienceYears', Number(v), { shouldDirty: true })}
        />
      </div>
    </>
  );
}
