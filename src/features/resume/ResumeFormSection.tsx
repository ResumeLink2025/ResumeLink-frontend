'use client';

import { Button, Tag, Typography } from '@/components/common';
import Textarea from '@/components/common/Textarea';
import { DEVELOPER_CATEGORY, USER_PROJECT_LIST } from '@/constants/resume';
import { cn } from '@/utils/styleMerge';

import useResumeFormSection from './hooks/useResumeFormSection';

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
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <Typography type="heading2">개발자 카테고리</Typography>
          <Tag size="small">필수</Tag>
        </div>
        <Typography type="body2" className="text-gray-50 mt-2">
          나를 가장 잘 표현할 수 있는 카테고리를 선택해 주세요. (최대 5개까지 선택 가능)
        </Typography>
        <div className="flex flex-wrap gap-2 mt-5">
          {DEVELOPER_CATEGORY.map((category) => (
            <Tag
              key={category.id}
              onClick={() => onClickCategory(category)}
              isSelected={selectedCategories.includes(category)}
              styleType="outline"
              size="large"
            >
              {category.title}
            </Tag>
          ))}
        </div>
        {errors.selectedCategories && (
          <Typography className="text-red-600 mt-4">{errors.selectedCategories.message}</Typography>
        )}
      </div>
      <div className="p-5 border-2 border-dashed border-gray-60 rounded-[10px] flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Typography type="heading2">프로젝트 선택</Typography>
          <Tag size="small">필수</Tag>
        </div>
        <div className="flex flex-col gap-2">
          {USER_PROJECT_LIST.map((project) => (
            <div
              key={project.id}
              onClick={() => onClickProject(project)}
              className={cn(
                'p-3 border border-gray-40 rounded-[10px] cursor-pointer',
                selectedProjects.includes(project) && 'bg-primary border-transparent',
              )}
            >
              {project.title}
            </div>
          ))}
        </div>
        {errors.selectedProjects && (
          <Typography className="text-red-600">{errors.selectedProjects.message}</Typography>
        )}
      </div>
      <div className="p-5 border-2 border-dashed border-gray-60 rounded-[10px] flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Typography type="heading2">개발 관련 경험</Typography>
          <Tag size="small">필수</Tag>
        </div>
        <Textarea
          placeholder="개발 관련 경험을 작성해주세요. (공부했던 언어, 참여했던 헤커톤 등등)"
          {...register('experience')}
          errorMessage={errors.experience && errors.experience.message}
        />
      </div>
      <Button size="large" type="submit">
        AI를 활용하여 이력서 작성하기
      </Button>
    </form>
  );
};

export default ResumeFormSection;
