import { zodResolver } from '@hookform/resolvers/zod';
import { useOverlay } from '@toss/use-overlay';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { Loader, Modal, Typography } from '@/components/common';
import type { ProjectDetailType } from '@/constants/project';
import { THEME_OPTIONS } from '@/constants/resume';
import useCreateResume from '@/hooks/apis/resume/useCreateResume';

import type { ResumeFormDataType } from '../schemas/resumeSchema';
import { resumeFormSchema } from '../schemas/resumeSchema';

const useResumeFormSection = () => {
  const overlay = useOverlay();
  const methods = useForm<ResumeFormDataType>({ resolver: zodResolver(resumeFormSchema) });
  const { mutate: createResumeMutate, isPending: isCreatingResume } = useCreateResume({
    onSuccess: () => {
      toast.success('이력서 생성이 완료되었습니다!');
    },
    onError: () => {
      toast.error('이력서 생성 중 에러가 발생했습니다.');
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitted },
  } = methods;

  const [selectedCategoriesState, setSelectedCategoriesState] = useState<string[]>([]);
  const [selectedProjectsState, setSelectedProjectsState] = useState<ProjectDetailType[]>([]);
  const [selectedThemeOption, setSelectedThemeOption] = useState(THEME_OPTIONS[0].value);
  const [isPublic, setIsPublic] = useState(false);

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
    createResumeMutate(data);
  };

  useEffect(() => {
    if (isCreatingResume) {
      overlay.open(({ isOpen }) => (
        <Modal isOpen={isOpen}>
          <div className="flex flex-col gap-5">
            <Loader />
            <Typography type="body1" className="text-gray-25">
              이력서를 생성중이에요!
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
