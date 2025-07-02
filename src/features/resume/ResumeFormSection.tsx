'use client';

import { FormProvider } from 'react-hook-form';

import { Button } from '@/components/common';
import Textarea from '@/components/common/Textarea';

import ActivityField from './ActivityField';
import CategoryField from './CategoryField';
import CertificationField from './CertificateField';
import ExperienceField from './ExperienceField';
import useResumeFormSection from './hooks/useResumeFormSection';
import PrivateField from './PrivateField';
import ProjectField from './ProjectField';

const ResumeFormSection = () => {
  const {
    methods,
    selectedCategories,
    selectedProjects,
    isPublic,
    errors,
    onClickCategory,
    onClickProject,
    setIsPublic,
    register,
    handleSubmit,
    onSubmitResume,
  } = useResumeFormSection();

  return (
    <FormProvider {...methods}>
      <form className="mt-6 flex flex-col gap-14" onSubmit={handleSubmit(onSubmitResume)}>
        <Textarea
          label="자기 소개"
          placeholder="자신이 어떤 개발자인지 작성해 주세요. (최소 50글자 이상)"
          {...register('introduction')}
          errorMessage={errors.introduction && errors.introduction.message}
        />
        <CategoryField
          selectedCategories={selectedCategories}
          onClickCategory={onClickCategory}
          errorMessage={errors.selectedCategories?.message}
        />
        <ProjectField
          selectedProjects={selectedProjects}
          onClickProject={onClickProject}
          errorMessage={errors.selectedProjects?.message}
        />
        <ExperienceField register={register} errorMessage={errors.experience?.message} />
        <ActivityField />
        <CertificationField />
        <PrivateField isPublic={isPublic} onChangePrivateToggle={setIsPublic} />
        <Button size="large" type="submit">
          AI를 활용하여 이력서 작성하기
        </Button>
      </form>
    </FormProvider>
  );
};

export default ResumeFormSection;
