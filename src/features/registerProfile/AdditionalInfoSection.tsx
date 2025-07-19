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

  // string[]로 watch!
  const desirePositions: string[] = watch('desirePositions') ?? [];
  // 선택된 직무(단일 선택)
  const selectedJob = desirePositions.length > 0 ? desirePositions[0] : jobOptions[0].value;

  const experienceYears = watch('experienceYears');

  return (
    <>
      <div className="flex flex-col gap-2">
        <Typography type="body4">희망 직무</Typography>
        <CustomSelectBox
          options={jobOptions}
          value={selectedJob}
          onChange={(v) => {
            setValue('desirePositions', v ? [v] : [], { shouldDirty: true });
          }}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Typography type="body4">연차</Typography>
        <CustomSelectBox
          options={yearOptions}
          value={experienceYears !== undefined && experienceYears !== null ? String(experienceYears) : ''}
          onChange={(v) => setValue('experienceYears', Number(v), { shouldDirty: true })}
        />
      </div>
    </>
  );
}
