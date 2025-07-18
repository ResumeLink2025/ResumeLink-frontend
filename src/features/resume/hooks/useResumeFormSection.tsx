import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useOverlay } from '@toss/use-overlay';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { Loader, Modal, Typography } from '@/components/common';
import type { ProjectDetailType } from '@/constants/project';
import { THEME_OPTIONS } from '@/constants/resume';
import { routeMainPage } from '@/constants/routes';
import useGetMyProfile from '@/hooks/apis/profile/useGetMyProfile';
import useGetMyProject from '@/hooks/apis/project/useGetMyProject';
import type { createResumeResponseType } from '@/hooks/apis/resume/useCreateResume';
import useCreateResume from '@/hooks/apis/resume/useCreateResume';
import useGetResumeDetail from '@/hooks/apis/resume/useGetResumeDetail';
import { RESUME_LIST } from '@/hooks/apis/resume/useGetResumeList';
import useUpdateResume from '@/hooks/apis/resume/useUpdateResume';
import { formatDate } from '@/utils/date';

import type { ResumeFormDataType } from '../schemas/resumeSchema';
import { resumeFormSchema } from '../schemas/resumeSchema';

const useResumeFormSection = (id?: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const overlay = useOverlay();

  const hasResumeId = !!id;

  const { data: resumeDetail } = useGetResumeDetail(String(id), hasResumeId);
  const { data: myProjectList } = useGetMyProject();
  const { data: myProfile } = useGetMyProfile();

  const methods = useForm<ResumeFormDataType>({ resolver: zodResolver(resumeFormSchema) });

  const { mutate: createResumeMutate, isPending: isCreatingResume } = useCreateResume({
    onSuccess: (response: createResumeResponseType) => {
      toast.success('이력서 생성이 완료되었습니다!');
      queryClient.invalidateQueries({ queryKey: [RESUME_LIST, 'resume'] });

      router.replace(`/resume/${response.id}`);
    },
    onError: () => {
      toast.error('이력서 생성 중 에러가 발생했습니다.');
    },
  });

  const { mutate: updateResumeMutate } = useUpdateResume(String(id), {
    onSuccess: () => {
      toast.success('이력서 수정이 완료되었습니다!');
      queryClient.invalidateQueries({ queryKey: [RESUME_LIST, 'resume'] });

      router.replace(routeMainPage);
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitted },
  } = methods;

  const [selectedCategoriesState, setSelectedCategoriesState] = useState<string[]>([]);
  const [selectedProjectsState, setSelectedProjectsState] = useState<ProjectDetailType[]>([]);
  const [selectedThemeOption, setSelectedThemeOption] = useState(
    resumeDetail?.theme ?? THEME_OPTIONS[0].value,
  );
  const [isPublic, setIsPublic] = useState(resumeDetail?.isPublic ?? false);

  useEffect(() => {
    if (hasResumeId && resumeDetail) {
      if (resumeDetail.categories) {
        setSelectedCategoriesState(resumeDetail.categories);
      }
      if (resumeDetail.projects && myProjectList) {
        const initialSelectedProjects: ProjectDetailType[] = [];

        resumeDetail.projects.forEach((resumeProject) => {
          const matchingMyProject = myProjectList.find(
            (myProject: ProjectDetailType) => myProject.projectName === resumeProject.projectName,
          );

          if (matchingMyProject) {
            initialSelectedProjects.push(matchingMyProject);
          }
        });
        setSelectedProjectsState(initialSelectedProjects);
      }
      reset({
        title: resumeDetail.title || '',
        summary: resumeDetail.summary || '',
        experienceNote: resumeDetail.experienceNote || '',
        theme: resumeDetail.theme || 'light',
        isPublic: resumeDetail.isPublic || false,
        categories: resumeDetail.categories || [],
        activities:
          resumeDetail?.activities?.map((activity) => ({
            ...activity,
            startDate: activity.startDate && formatDate(activity.startDate),
            endDate: activity.endDate && formatDate(activity.endDate),
          })) || [],
        certificates:
          resumeDetail.certificates?.map((certificate) => ({
            ...certificate,
            date: certificate.date && formatDate(certificate.date),
            grade: certificate.grade,
          })) || [],
        resumeImgUrl: resumeDetail.resumeImgUrl || myProfile?.profile?.imageUrl,
      });
    }
  }, [hasResumeId, resumeDetail, myProjectList, reset]);

  useEffect(() => {
    if (myProfile?.profile?.generalSkills) {
      setValue('skills', myProfile?.profile.generalSkills);
    }
  }, [myProfile?.profile.generalSkills, setValue]);

  useEffect(() => {
    if (myProfile?.profile?.desirePositions) {
      setValue('positions', myProfile?.profile.desirePositions);
    }
  }, [myProfile?.profile.desirePositions, setValue]);

  useEffect(() => {
    setValue('categories', selectedCategoriesState);
  }, [selectedCategoriesState, setValue]);

  useEffect(() => {
    setValue('projects', selectedProjectsState);
  }, [selectedProjectsState, setValue]);

  useEffect(() => {
    setValue('theme', selectedThemeOption);
  }, [selectedThemeOption, setValue]);

  useEffect(() => {
    setValue('isPublic', isPublic);
  }, [isPublic, setValue]);

  const onClickCategory = (category: string) => {
    const isSelected = selectedCategoriesState.some((selectedCategory) => selectedCategory === category);

    let newCategories;

    if (isSelected) {
      newCategories = selectedCategoriesState.filter((prevCategory) => prevCategory !== category);
    } else {
      if (selectedCategoriesState.length >= 5) {
        toast.error('카테고리는 최대 5개까지만 선택 가능합니다.', { duration: 2000 });
        return;
      }

      newCategories = [...selectedCategoriesState, category];
    }

    setSelectedCategoriesState(newCategories);
  };

  const onClickProject = (project: ProjectDetailType) => {
    const isSelected = selectedProjectsState.some((selectedProject) => selectedProject.id === project.id);

    let newProjects;

    if (isSelected) {
      newProjects = selectedProjectsState.filter((prevProject) => prevProject.id !== project.id);
    } else {
      newProjects = [...selectedProjectsState, project];
    }

    setSelectedProjectsState(newProjects);
  };

  const onChangeThemeOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedThemeOption(e.target.value);
  };

  const onSubmitResume = (data: ResumeFormDataType) => {
    if (hasResumeId) {
      updateResumeMutate(data);
    } else {
      createResumeMutate(data);
    }
  };

  useEffect(() => {
    if (isCreatingResume) {
      overlay.open(({ isOpen }) => (
        <Modal isOpen={isOpen}>
          <div className="flex flex-col gap-5">
            <Loader />
            <Typography type="body1" className="text-gray-25">
              이력서를 생성하는 중이에요!
            </Typography>
          </div>
        </Modal>
      ));
    } else {
      overlay.close();
    }
  }, [isCreatingResume, overlay]);

  return {
    methods,
    selectedCategories: selectedCategoriesState,
    selectedProjects: selectedProjectsState,
    selectedThemeOption,
    myProfile,
    resumeImageUrl: resumeDetail?.resumeImgUrl,
    isPublic,
    isSubmitted,
    errors,
    setIsPublic,
    onClickCategory,
    onClickProject,
    onChangeThemeOption,
    register,
    handleSubmit,
    onSubmitResume,
  };
};

export default useResumeFormSection;
