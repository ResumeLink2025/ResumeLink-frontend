import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import type { ProjectFormDataType } from '../schemas/projectSchema';
import { projectFormSchema } from '../schemas/projectSchema';

const useProjectFormSection = () => {
  const methods = useForm<ProjectFormDataType>({ resolver: zodResolver(projectFormSchema) });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const [projectStatus, setProjectStatus] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    setValue('status', projectStatus, { shouldDirty: true, shouldValidate: true });
  }, [projectStatus, setValue]);

  useEffect(() => {
    setValue('isPublic', isPublic);
  }, [isPublic, setValue]);

  const onChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProjectStatus(e.target.value);
  };

  const onSubmitProject = (data: ProjectFormDataType) => {
    console.log('data', data);
  };

  return {
    methods,
    projectStatus,
    isPublic,
    errors,
    setIsPublic,
    register,
    onChangeStatus,
    handleSubmit,
    onSubmitProject,
  };
};

export default useProjectFormSection;
