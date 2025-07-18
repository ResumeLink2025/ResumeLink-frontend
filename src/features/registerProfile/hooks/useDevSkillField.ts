import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

import type { DevSkillFieldProps } from '../../project/DevSkillField';
import type { UserProfileType } from '../shcemas/userProfileSchema';

const useDevSkillField = ({
  defaultGeneralSkills = [],
  defaultCustomSkills = [],
}: Omit<DevSkillFieldProps, 'className'>) => {
  const {
    setValue,
    formState: { errors, isSubmitted },
  } = useFormContext<UserProfileType>();

  // 최초 mount 시에만 초기값 세팅!
  const [generalSkills, setGeneralSkills] = useState<string[]>(defaultGeneralSkills);
  const [customSkills, setCustomSkills] = useState<string[]>(defaultCustomSkills);
  const [typingSkill, setTypingSkill] = useState('');

  // form value도 최초 mount 시에만 동기화
  useEffect(() => {
    setGeneralSkills(defaultGeneralSkills || []);
    setValue('skill.generalSkills', defaultGeneralSkills || []);
    setCustomSkills(defaultCustomSkills || []);
    setValue('skill.customSkills', defaultCustomSkills || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setValue('skill.generalSkills', generalSkills);
  }, [generalSkills, setValue]);

  useEffect(() => {
    setValue('skill.customSkills', customSkills);
  }, [customSkills, setValue]);

  const onClickSkill = (skill: string) => {
    setGeneralSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]));
  };

  const onChangeTypingSkill = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTypingSkill(e.target.value);
  };

  const onEnterAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      if (typingSkill.trim() === '') return;
      if (customSkills.includes(typingSkill)) {
        toast.error('이미 추가된 기술입니다.');
        setTypingSkill('');
        return;
      }
      setCustomSkills((prev) => [...prev, typingSkill]);
      setTypingSkill('');
    }
  };

  const onClickDeleteCustomSkill = (skill: string) => {
    setCustomSkills((prev) => prev.filter((customSkill) => customSkill !== skill));
  };

  return {
    errors,
    isSubmitted,
    generalSkills,
    typingSkill,
    customSkills,
    onClickSkill,
    onChangeTypingSkill,
    onEnterAddSkill,
    onClickDeleteCustomSkill,
  };
};

export default useDevSkillField;
