'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import DevSkillField from '../project/DevSkillField';
import type { UserProfileType } from '../registerProfile/shcemas/userProfileSchema';
import ActionButtonSection from './ActionButtonSection';
import AdditionalInfoSection from './AdditionalInfoSection';
import { patchUserProfile, uploadImage } from './apis/userInfoApi';
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

interface SkillShape {
  skill: {
    generalSkills?: string[];
    customSkills?: string[];
  };
}
type SubmitProfile = UserProfileType | (UserProfileType & SkillShape);

export default function RegisterProfileSection({
  onSave,
  onCancel,
  mode,
  initialProfile,
}: RegisterProfileSectionProps) {
  const router = useRouter();

  const defaultProfile: UserProfileType = {
    id: initialProfile?.id ?? '',
    nickname: initialProfile?.nickname ?? '',
    birthday: initialProfile?.birthday ?? null,
    gender: initialProfile?.gender ?? null,
    customSkill: initialProfile?.customSkill ?? {},
    customInterest: initialProfile?.customInterest ?? {},
    customPosition: initialProfile?.customPosition ?? {},
    experienceYears: initialProfile?.experienceYears ?? 0,
    employmentStatus: initialProfile?.employmentStatus ?? null,
    imageUrl: initialProfile?.imageUrl ?? null,
    summary: initialProfile?.summary ?? null,
    updatedAt: initialProfile?.updatedAt ?? '',
    userSkills: initialProfile?.userSkills ?? [],
    desirePositions: initialProfile?.desirePositions ?? [],
  };

  const methods = useForm<UserProfileType>({
    defaultValues: defaultProfile,
    mode: 'onBlur',
  });

  useEffect(() => {
    if (initialProfile) {
      methods.reset({
        ...defaultProfile,
        ...initialProfile,
        // birthday 초기값도 항상 YYYY-MM-DD로 세팅!
        birthday: initialProfile.birthday ? initialProfile.birthday.split('T')[0] : null,
      });
    }
  }, [initialProfile]);

  const userSkills = methods.watch('userSkills') ?? [];
  const customSkills = Object.keys(initialProfile?.customSkill ?? {});

  const onSubmit: SubmitHandler<SubmitProfile> = async (data) => {
    let imageUrl = 'imageUrl' in data ? data.imageUrl : null;

    if ('profileImage' in data && data.profileImage && data.profileImage instanceof File) {
      imageUrl = await uploadImage(data.profileImage);
    }

    let userSkills: string[];
    let customSkill: Record<string, true>;

    if ('skill' in data && data.skill) {
      userSkills = data.skill.generalSkills ?? [];
      customSkill = (data.skill.customSkills ?? []).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {} as Record<string, true>);
    } else {
      userSkills = 'userSkills' in data && data.userSkills ? data.userSkills : [];
      customSkill = 'customSkill' in data && data.customSkill ? data.customSkill : {};
    }

    // birthday가 ISO string이라면 YYYY-MM-DD로 변환해서 보냄
    let birthday: string | null = null;
    if (data.birthday) {
      birthday = typeof data.birthday === 'string' ? data.birthday.split('T')[0] : null;
    }

    const payload: UserProfileType = {
      ...(data as UserProfileType),
      userSkills,
      customSkill,
      imageUrl,
      birthday, // 변환한 값으로 덮어씀!
    };

    try {
      await patchUserProfile(payload);
      toast.success('프로필이 저장되었습니다.');
      if (onSave) onSave(payload);
      if (mode === 'register') {
        router.replace('/developersHub?type=resume&sort=popular');
      }
    } catch {
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
            defaultUserSkills={userSkills}
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
  defaultUserSkills: string[];
  defaultCustomSkills: string[];
};

function FormBody({ onSubmit, onCancel, defaultUserSkills, defaultCustomSkills }: FormBodyProps) {
  const { imageUrl, handleUploadImageFile } = useDefaultInfoField();

  return (
    <form className="grid grid-cols-2 gap-4 w-full" onSubmit={onSubmit}>
      <ProfileImageSection imageUrl={imageUrl} handleUploadFile={handleUploadImageFile} />
      <BasicInfoSection />
      <AdditionalInfoSection jobOptions={DEVELOPERLIST} yearOptions={YEARLIST} />
      <DevSkillField
        defaultGeneralSkills={defaultUserSkills}
        defaultCustomSkills={defaultCustomSkills}
        className="col-span-2"
      />
      <SummarySection className="col-span-2" />
      <ActionButtonSection onCancel={onCancel} />
    </form>
  );
}
