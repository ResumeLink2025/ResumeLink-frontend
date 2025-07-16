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

  return (
    <>
      <div className="flex flex-col gap-2">
        <Typography type="body4">희망 직무</Typography>
        <CustomSelectBox
          options={jobOptions}
          value={watch('desirePositions')[0]}
          onChange={(v) => setValue('desirePositions', [v], { shouldDirty: true })}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Typography type="body4">연차</Typography>
        <CustomSelectBox
          options={yearOptions}
          value={String(watch('experienceYears'))}
          onChange={(v) => setValue('experienceYears', Number(v), { shouldDirty: true })}
        />
      </div>
    </>
  );
}
