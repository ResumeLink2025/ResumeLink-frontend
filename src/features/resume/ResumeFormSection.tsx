'use client';

import { FormProvider } from 'react-hook-form';

import { Button } from '@/components/common';
import Textarea from '@/components/common/Textarea';

import type { ResumeProps } from '.';
import ActivityField from './ActivityField';
import CategoryField from './CategoryField';
import CertificateField from './CertificateField';
import ExperienceField from './ExperienceField';
import useResumeFormSection from './hooks/useResumeFormSection';
import PrivateField from './PrivateField';
import ProjectField from './ProjectField';
import ThemeField from './ThemeField';
import TitleField from './TitleField';
import UserInfoSection from './UserInfoSection';

const ResumeFormSection = ({ id }: ResumeProps) => {
  const {
    methods,
    selectedCategories,
    selectedProjects,
    selectedThemeOption,
    myProfile,
    resumeImageUrl,
    isPublic,
    isSubmitted,
    errors,
    onClickCategory,
    onClickProject,
    onChangeThemeOption,
    setIsPublic,
    register,
    handleSubmit,
    onSubmitResume,
  } = useResumeFormSection(id);

  return (
    <FormProvider {...methods}>
      <form className="mt-6 flex flex-col gap-14" onSubmit={handleSubmit(onSubmitResume)}>
        <UserInfoSection id={id} myProfile={myProfile} resumeImageUrl={resumeImageUrl} />
        <TitleField register={register} errorMessage={errors.title?.message} />
        <Textarea
          label="자기 소개"
          placeholder="자신이 어떤 개발자인지 작성해 주세요. (최소 50글자 이상)"
          {...register('summary')}
          errorMessage={errors.summary?.message}
        />
        <CategoryField
          selectedCategories={selectedCategories}
          onClickCategory={onClickCategory}
          errorMessage={errors.categories?.message}
          isSubmitted={isSubmitted}
        />
        <ProjectField
          selectedProjects={selectedProjects}
          onClickProject={onClickProject}
          errorMessage={errors.projects?.message}
          isSubmitted={isSubmitted}
        />
        {!id && <ExperienceField register={register} errorMessage={errors.experienceNote?.message} />}
        <ActivityField />
        <CertificateField />
        <ThemeField selectedThemeOption={selectedThemeOption} onChangeThemeOption={onChangeThemeOption} />
        <PrivateField isPublic={isPublic} onChangePrivateToggle={setIsPublic} />
        <Button size="large" type="submit">
          {id ? '이력서 수정하기' : 'AI를 활용하여 이력서 작성하기'}
        </Button>
      </form>
    </FormProvider>
  );
};

export default ResumeFormSection;
