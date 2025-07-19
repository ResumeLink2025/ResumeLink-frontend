import { useFormContext } from 'react-hook-form';

import { Typography } from '@/components/common';
import Input from '@/components/common/Input';
import SelectBox from '@/components/common/SelectBox';

import type { UserProfileType } from '../registerProfile/shcemas/userProfileSchema';
import { genderList } from './types';

export default function BasicInfoSection() {
  const { register, setValue, watch } = useFormContext<UserProfileType>();

  const handleGender = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setValue('gender', e.target.value || '', { shouldDirty: true, shouldValidate: false });
  };

  return (
    <div className="flex flex-col gap-3">
      <Input label="닉네임" size="medium" placeholder="닉네임" {...register('nickname')} />

      <Typography type="body4" className="text-gray-70">
        성별
      </Typography>
      <SelectBox
        id="gender"
        label="성별"
        size="medium"
        options={genderList}
        value={watch('gender') ?? ''}
        onChange={handleGender}
      />

      <Typography type="body4" className="text-gray-70">
        생일
      </Typography>
      <input
        type="date"
        className="appearance-auto border border-gray-40 rounded-[10px] cursor-pointer h-[45px] px-3 py-2 focus:ring-yellow-300"
        {...register('birthday')}
      />
    </div>
  );
}
