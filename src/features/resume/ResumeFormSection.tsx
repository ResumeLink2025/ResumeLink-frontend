'use client';

import { Button } from '@/components/common';
import Textarea from '@/components/common/Textarea';

import useResumeFormSection from './hooks/useResumeFormSection';
import ResumeCategoryField from './ResumeCategoryField';
import ResumeExperienceField from './ResumeExperienceField';
import ResumeProjectField from './ResumeProjectField';

const ResumeFormSection = () => {
  const {
    selectedCategories,
    selectedProjects,
    errors,
    onClickCategory,
    onClickProject,
    register,
    handleSubmit,
    onSubmitResume,
  } = useResumeFormSection();

  return (
    <form className="mt-6 flex flex-col gap-14" onSubmit={handleSubmit(onSubmitResume)}>
      <Textarea
        label="자기 소개"
        placeholder="자신이 어떤 개발자인지 작성해 주세요. (최소 50글자 이상)"
        {...register('introduction')}
        errorMessage={errors.introduction && errors.introduction.message}
      />
      <ResumeCategoryField
        selectedCategories={selectedCategories}
        onClickCategory={onClickCategory}
        errorMessage={errors.selectedCategories?.message}
      />
      <ResumeProjectField
        selectedProjects={selectedProjects}
        onClickProject={onClickProject}
        errorMessage={errors.selectedProjects?.message}
      />
      <ResumeExperienceField register={register} errorMessage={errors.experience?.message} />

      {/* <div className="p-5 border-2 border-dashed border-gray-60 rounded-[10px] flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Typography type="heading2">자격증</Typography>
          <Plus className="cursor-pointer" />
        </div>
      </div> */}
      <Button size="large" type="submit">
        AI를 활용하여 이력서 작성하기
      </Button>
    </form>
  );
};

export default ResumeFormSection;
