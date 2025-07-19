import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { routeProjectPage } from '@/constants/routes';
import { PROFILE_LIST } from '@/fixtures/profiles';
import type { createProjectResponseType } from '@/hooks/apis/project/useCreateProject';
import useCreateProject from '@/hooks/apis/project/useCreateProject';
import { MY_PROJECTS } from '@/hooks/apis/project/useGetMyProject';
import useGetProjectDetail from '@/hooks/apis/project/useGetProjectDetail';
import useUpdateProject from '@/hooks/apis/project/useUpdateProject';
import { formatDate } from '@/utils/date';

import type { ProjectFormDataType } from '../schemas/projectSchema';
import { projectFormSchema } from '../schemas/projectSchema';

const useProjectFormSection = (id?: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const hasProjectId = !!id;
  const { data: projectDetail } = useGetProjectDetail(String(id), hasProjectId);

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
    onSuccess: (response: createProjectResponseType) => {
      toast.success('프로젝트 생성이 완료되었습니다!');
      queryClient.invalidateQueries({ queryKey: [PROFILE_LIST, MY_PROJECTS] });

      router.replace(`/project/${response.data.projectNumber}`);
    },
  });

  const { mutate: updateProjectMutate } = useUpdateProject(String(id), {
    onSuccess: () => {
      toast.success('프로젝트 수정이 완료되었습니다!');
      queryClient.invalidateQueries({ queryKey: [PROFILE_LIST, MY_PROJECTS] });

      router.replace(routeProjectPage);
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitted },
  } = methods;

  const [projectStatus, setProjectStatus] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    if (hasProjectId && projectDetail) {
      if (projectDetail.status) {
        setProjectStatus(projectDetail.status);
      }
      if (projectDetail.isPublic) {
        setIsPublic(projectDetail.isPublic);
      }
      reset({
        projectName: projectDetail.projectName || '',
        startDate: projectDetail.startDate ? formatDate(projectDetail.startDate) : '',
        endDate: projectDetail.endDate ? formatDate(projectDetail.endDate) : '',
        status: projectDetail.status || '',
        projectDesc: projectDetail.projectDesc || '',
        role: projectDetail.role || '',
        isPublic: projectDetail.isPublic || false,
        tags: projectDetail.tags || [],
      });
    }
  }, [hasProjectId, projectDetail, reset]);

  useEffect(() => {
    setValue('status', projectStatus);
  }, [projectStatus, setValue]);

  useEffect(() => {
    setValue('isPublic', isPublic);
  }, [isPublic, setValue]);

  const onChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProjectStatus(e.target.value);
  };

  const onSubmitProject = (data: ProjectFormDataType) => {
    if (hasProjectId) {
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
