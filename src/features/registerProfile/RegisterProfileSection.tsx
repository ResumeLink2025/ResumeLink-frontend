'use client';

import { useRouter } from 'next/navigation';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import DevSkillField from '../project/DevSkillField';
import type { UserProfileType } from '../registerProfile/shcemas/userProfileSchema';
import ActionButtonSection from './ActionButtonSection';
import AdditionalInfoSection from './AdditionalInfoSection';
import { patchUserProfile } from './apis/userInfoApi';
import BasicInfoSection from './BasicInfoSection';
import useDefaultInfoField from './hooks/useDefaultInfoFilde';
import { ProfileHederSection } from './ProfileHeaderSection';
import ProfileImageSection from './ProfileImageSection';
import SummarySection from './SummarySeciton';
import { DEVELOPERLIST, YEARLIST } from './types';

type RegisterProfileSectionProps = {
  mode: 'register' | 'edit';
  onSave?: (updatedProfile: UserProfileType) => void;
  onCancel?: () => void;
  initialProfile?: UserProfileType;
};

export default function RegisterProfileSection({
  onSave,
  onCancel,
  mode,
  initialProfile,
}: RegisterProfileSectionProps) {
  const router = useRouter();

  const defaultProfile: UserProfileType = initialProfile ?? {
    id: '',
    nickname: '',
    birthday: null,
    gender: null,
    customSkill: null,
    customInterest: null,
    customPosition: null,
    experienceYears: 0,
    employmentStatus: null,
    imageUrl: null,
    summary: null,
    updatedAt: '',
    skill: {
      generalSkills: [],
      customSkills: [],
    },
    user: {
      userSkills: [],
      desirePositions: [],
    },
  };

  const methods = useForm<UserProfileType>({
    defaultValues: defaultProfile,
  });

  const skillNames = methods.watch('user.userSkills')?.map((us) => us.skill.name) ?? [];
  const customSkills: string[] = defaultProfile.customSkill ? [defaultProfile.customSkill] : [];

  const onSubmit: SubmitHandler<UserProfileType> = async (data) => {
    try {
      const imageUrl = null;
      await patchUserProfile({ ...data, imageUrl });
      toast.success('프로필이 저장되었습니다.');

      if (onSave) onSave(data);
      if (mode === 'register') {
        router.replace('/developersHub?type=resume&sort=popular');
      }
    } catch (err) {
      console.error(err);
      toast.error('저장 실패');
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full bg-white py-20">
      <div className="w-full max-w-2xl flex flex-col items-center px-4">
        <ProfileHederSection title={mode === 'edit' ? '내 정보 수정' : '추가 정보 입력'} />
        <FormProvider {...methods}>
          <FormBody
            onSubmit={methods.handleSubmit(onSubmit)}
            onCancel={onCancel}
            defaultGeneralSkills={skillNames}
            defaultCustomSkills={customSkills}
          />
        </FormProvider>
      </div>
    </div>
  );
}

type FormBodyProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel?: () => void;
  defaultGeneralSkills: string[];
  defaultCustomSkills: string[];
};

function FormBody({ onSubmit, onCancel, defaultGeneralSkills, defaultCustomSkills }: FormBodyProps) {
  const { imageUrl, handleUploadImageFile } = useDefaultInfoField();

  return (
    <form className="grid grid-cols-2 gap-4 w-full" onSubmit={onSubmit}>
      <ProfileImageSection imageUrl={imageUrl} handleUploadFile={handleUploadImageFile} />
      <BasicInfoSection />
      <AdditionalInfoSection jobOptions={DEVELOPERLIST} yearOptions={YEARLIST} />
      <DevSkillField
        defaultGeneralSkills={defaultGeneralSkills}
        defaultCustomSkills={defaultCustomSkills}
        className="col-span-2"
      />
      <SummarySection className="col-span-2" />
      <ActionButtonSection onCancel={onCancel} />
    </form>
  );
}
