'use client';

import { FormProvider } from 'react-hook-form';

import { Button } from '@/components/common';
import Textarea from '@/components/common/Textarea';

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

const ResumeFormSection = () => {
  const {
    methods,
    selectedCategories,
    selectedProjects,
    selectedThemeOption,
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
  } = useResumeFormSection();

  return (
    <FormProvider {...methods}>
      <form className="mt-6 flex flex-col gap-14" onSubmit={handleSubmit(onSubmitResume)}>
        <UserInfoSection />
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
        <ExperienceField register={register} errorMessage={errors.experienceNote?.message} />
        <ActivityField />
        <CertificateField />
        <ThemeField selectedThemeOption={selectedThemeOption} onChangeThemeOption={onChangeThemeOption} />
        <PrivateField isPublic={isPublic} onChangePrivateToggle={setIsPublic} />
        <Button size="large" type="submit">
          AI를 활용하여 이력서 작성하기
        </Button>
      </form>
    </FormProvider>
  );
};

export default ResumeFormSection;
