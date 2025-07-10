import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import useCreateProject from '@/hooks/apis/project/useCreateProject';
import useGetProjectDetail from '@/hooks/apis/project/useGetProjectDetail';
import useUpdateProject from '@/hooks/apis/project/useUpdateProject';
import { formatDate } from '@/utils/date';

import type { ProjectFormDataType } from '../schemas/projectSchema';
import { projectFormSchema } from '../schemas/projectSchema';

const useProjectFormSection = (id?: string) => {
  const isEditMode = !!id;

  const { data: projectDetail } = useGetProjectDetail(String(id));

  const methods = useForm<ProjectFormDataType>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      projectName: '',
      startDate: '',
      endDate: '',
      status: '',
      projectDesc: '',
      role: '',
      isPublic: false,
      tags: [],
    },
  });

  const { mutate: createProjectMutate } = useCreateProject({
    onSuccess: () => {
      toast.success('프로젝트 생성이 완료되었습니다!');
    },
  });

  const { mutate: updateProjectMutate } = useUpdateProject(String(id), {
    onSuccess: () => {
      toast.success('프로젝트 수정이 완료되었습니다!');
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitted },
  } = methods;

  useEffect(() => {
    if (isEditMode && projectDetail) {
      reset({
        projectName: projectDetail.projectName || '',
        startDate: projectDetail.startDate ? formatDate(projectDetail.startDate) : '',
        endDate: projectDetail.endDate ? formatDate(projectDetail.endDate) : '',
        status: projectDetail.status || '',
        projectDesc: projectDetail.projectDesc || '',
        role: projectDetail.role || '',
        isPublic: projectDetail.isPublic || false,
        tags: [],
      });
    }
  }, [isEditMode, projectDetail, setValue]);

  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    setValue('isPublic', isPublic);
  }, [isPublic, setValue]);

  const projectStatus = watch('status');

  const onChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue('status', e.target.value);
  };

  const onSubmitProject = (data: ProjectFormDataType) => {
    if (isEditMode) {
      updateProjectMutate(data);
    } else {
      createProjectMutate(data);
    }
  };

  return {
    methods,
    projectStatus,
    isPublic,
    projectDetail,
    errors,
    isSubmitted,
    setIsPublic,
    register,
    onChangeStatus,
    handleSubmit,
    onSubmitProject,
  };
};

export default useProjectFormSection;
