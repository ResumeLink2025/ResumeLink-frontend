import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { type DeveloperCategoryType, THEME_OPTIONS, type UserProjectType } from '@/constants/resume';

import type { ResumeFormDataType } from '../schemas/resumeSchema';
import { resumeFormSchema } from '../schemas/resumeSchema';

const useResumeFormSection = () => {
  const methods = useForm<ResumeFormDataType>({ resolver: zodResolver(resumeFormSchema) });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitted },
  } = methods;

  const [selectedCategoriesState, setSelectedCategoriesState] = useState<DeveloperCategoryType[]>([]);
  const [selectedProjectsState, setSelectedProjectsState] = useState<UserProjectType[]>([]);
  const [selectedThemeOption, setSelectedThemeOption] = useState(THEME_OPTIONS[0].value);
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    setValue('selectedCategories', selectedCategoriesState, { shouldDirty: true, shouldValidate: true });
  }, [selectedCategoriesState, setValue]);

  useEffect(() => {
    setValue('selectedProjects', selectedProjectsState, { shouldDirty: true, shouldValidate: true });
  }, [selectedProjectsState, setValue]);

  useEffect(() => {
    setValue('theme', selectedThemeOption);
  }, [selectedThemeOption, setValue]);

  useEffect(() => {
    setValue('isPublic', isPublic);
  }, [isPublic, setValue]);

  const onClickCategory = (category: DeveloperCategoryType) => {
    const isSelected = selectedCategoriesState.some(
      (selectedCategory) => selectedCategory.id === category.id,
    );

    let newCategories;

    if (isSelected) {
      newCategories = selectedCategoriesState.filter((prevCategory) => prevCategory.id !== category.id);
    } else {
      if (selectedCategoriesState.length >= 5) {
        toast.error('카테고리는 최대 5개까지만 선택 가능합니다.', { duration: 2000 });
        return;
      }

      newCategories = [...selectedCategoriesState, category];
    }

    setSelectedCategoriesState(newCategories);
  };

  const onClickProject = (project: UserProjectType) => {
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
    console.log('data', data);
  };

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
