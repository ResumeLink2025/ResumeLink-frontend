'use client';

import { FormProvider } from 'react-hook-form';

import { Button } from '@/components/common';
import Textarea from '@/components/common/Textarea';

import DefaultInfoField from './DefaultInfoField';
import DevSkillField from './DevSkillField';
import useProjectFormSection from './hooks/useProjectFormSection';
import PrivateField from './PrivateField';
import StatusField from './StatusField';

const ProjectFormSection = () => {
  const {
    methods,
    projectStatus,
    isPublic,
    errors,
    setIsPublic,
    onChangeStatus,
    register,
    handleSubmit,
    onSubmitProject,
  } = useProjectFormSection();

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col gap-10" onSubmit={handleSubmit(onSubmitProject)}>
        <DefaultInfoField />
        <StatusField
          projectStatus={projectStatus}
          onChangeStatus={onChangeStatus}
          errorMessage={errors.status?.message}
        />
        <Textarea
          label="프로젝트 소개"
          placeholder="프로젝트를 소개하는 글을 작성해주세요."
          {...register('projectDesc')}
          errorMessage={errors.projectDesc?.message}
        />
        <Textarea
          label="프로젝트에서 맡은 역할"
          placeholder="프로젝트에서 내에서 맡은 역할을 작성해주세요."
          {...register('role')}
          errorMessage={errors.role?.message}
        />
        <DevSkillField />
        <PrivateField isPublic={isPublic} onChangePrivateToggle={setIsPublic} />
        <Button size="large" type="submit">
          프로젝트 작성하기
        </Button>
      </form>
    </FormProvider>
  );
};

export default ProjectFormSection;
