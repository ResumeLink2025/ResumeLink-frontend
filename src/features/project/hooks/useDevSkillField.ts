import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

import { SKILL_CATEGORY } from '@/constants/project';

import type { ProjectFormDataType } from '../schemas/projectSchema';

const useDevSkillField = () => {
  const {
    formState: { errors },
    setValue,
  } = useFormContext<ProjectFormDataType>();

  const [viewAllSkills, setViewAllSkills] = useState(SKILL_CATEGORY.slice(0, 65));
  const [typingSkill, setTypingSkill] = useState('');
  const [generalSkills, setGeneralSkills] = useState<string[]>([]);
  const [customSkills, setCustomSkills] = useState<string[]>([]);

  useEffect(() => {
    setValue('skill.generalSkills', generalSkills);
  }, [setValue, generalSkills]);

  useEffect(() => {
    setValue('skill.customSkills', customSkills);
  }, [setValue, customSkills]);

  const onClickViewAllSkills = () => {
    setViewAllSkills(SKILL_CATEGORY);
  };

  const onClickSkill = (skill: string) => {
    if (generalSkills.includes(skill)) {
      setGeneralSkills((prevState) => prevState.filter((prevSkill) => prevSkill !== skill));
    } else {
      setGeneralSkills((prevState) => [...prevState, skill]);
    }
  };

  const onChangeTypingSkill = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTypingSkill(e.target.value);
  };

  const onEnterAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();

      if (typingSkill.trim() === '') {
        return;
      }

      if (customSkills.includes(typingSkill)) {
        toast.error('이미 추가된 기술입니다.');
        setTypingSkill('');

        return;
      }

      setCustomSkills((prevState) => [...prevState, typingSkill]);
      setTypingSkill('');
    }
  };

  const onClickDeleteCustomSkill = (skill: string) => {
    setCustomSkills((prevState) => prevState.filter((customSkill) => customSkill !== skill));
  };

  return {
    errors,
    generalSkills,
    viewAllSkills,
    typingSkill,
    customSkills,
    onClickSkill,
    onClickViewAllSkills,
    onChangeTypingSkill,
    onEnterAddSkill,
    onClickDeleteCustomSkill,
  };
};

export default useDevSkillField;
