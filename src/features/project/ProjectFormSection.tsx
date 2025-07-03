'use client';

import { FormProvider } from 'react-hook-form';

import { Button } from '@/components/common';

import DefaultInfoField from './DefaultInfoField';
import useProjectFormSection from './hooks/useProjectFormSection';

const ProjectFormSection = () => {
  const { methods, handleSubmit, onSubmitProject } = useProjectFormSection();

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col gap-14" onSubmit={handleSubmit(onSubmitProject)}>
        <DefaultInfoField />
        <Button size="large" type="submit">
          프로젝트 작성하기
        </Button>
      </form>
    </FormProvider>
  );
};

export default ProjectFormSection;
