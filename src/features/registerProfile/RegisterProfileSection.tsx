'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import DevSkillField from '../project/DevSkillField';
import type { UserProfileType } from '../registerProfile/shcemas/userProfileSchema';
import { UserProfileSchema } from '../registerProfile/shcemas/userProfileSchema';
import ActionButtonSection from './ActionButtonSection';
import AdditionalInfoSection from './AdditionalInfoSection';
import { patchUserProfile } from './apis/userInfoApi';
import BasicInfoSection from './BasicInfoSection';
import useDefaultInfoField from './hooks/useDefaultInfoFilde';
import { ProfileHederSection } from './ProfileHeaderSection';
import ProfileImageSection from './ProfileImageSection';
import SummarySection from './SummarySeciton';
import { DEVELOPERLIST, YEARLIST } from './types';

export default function RegisterProfileSection() {
  const router = useRouter();
  const methods = useForm<UserProfileType>({
    resolver: zodResolver(UserProfileSchema),
    defaultValues: {
      birthday: null,
      desirePositions: [DEVELOPERLIST[0].value],
      experienceYears: Number(YEARLIST[0].value),
    },
  });

  const onSubmit = async (data: UserProfileType) => {
    try {
      const birthday =
        data.birthday instanceof Date
          ? data.birthday.toISOString().slice(0, 10)
          : typeof data.birthday === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(data.birthday)
          ? data.birthday
          : null;

      const processedData = {
        ...data,
        birthday,
      };
      console.log(processedData);
      await patchUserProfile(processedData);
      toast.success('프로필이 저장되었습니다.');
      router.replace('/developersHub?type=resume&sort=popular');
    } catch (err) {
      console.error(err);
      toast.error('저장 실패');
    }
  };
  return (
    <div className="flex items-center justify-center w-full h-full bg-white py-20">
      <div className="w-full max-w-2xl flex flex-col items-center px-4">
        <ProfileHederSection />
        <FormProvider {...methods}>
          <FormProvider {...methods}>
            <FormBody
              onSubmit={methods.handleSubmit(onSubmit, () => {
                toast.error('필수 입력을 확인해주세요.');
              })}
            />
          </FormProvider>
        </FormProvider>
      </div>
    </div>
  );
}

type FormBodyProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

function FormBody({ onSubmit }: FormBodyProps) {
  const { imageUrl, handleUploadImageFile } = useDefaultInfoField();

  return (
    <form className="grid grid-cols-2 gap-4 w-full" onSubmit={onSubmit}>
      <ProfileImageSection imageUrl={imageUrl} handleUploadFile={handleUploadImageFile} />
      <BasicInfoSection />
      <AdditionalInfoSection jobOptions={DEVELOPERLIST} yearOptions={YEARLIST} />
      <DevSkillField className="col-span-2" />
      <SummarySection className="col-span-2" />
      <ActionButtonSection className="col-span-2" />
    </form>
  );
}
