import { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';

import type { UserProfileType } from '../shcemas/userProfileSchema';

const useDevSkillField = ({
  defaultUserSkills = [],
  defaultCustomSkills = [],
}: {
  defaultUserSkills?: string[];
  defaultCustomSkills?: string[];
}) => {
  const {
    setValue,
    control,
    formState: { errors, isSubmitted },
  } = useFormContext<UserProfileType>();

  // 커스텀 skill 입력 상태만 별도 관리
  const [typingSkill, setTypingSkill] = useState('');

  // form state에서 직접 watch
  const userSkills: string[] = useWatch({ control, name: 'userSkills' }) ?? [];
  const customSkillObj: Record<string, true> = useWatch({ control, name: 'customSkill' }) ?? {};
  const customSkills: string[] = Object.keys(customSkillObj ?? {});

  // mount 시 form에 값 세팅
  useEffect(() => {
    setValue('userSkills', defaultUserSkills);
    setValue(
      'customSkill',
      defaultCustomSkills.reduce<Record<string, true>>((acc, key) => {
        acc[key] = true;
        return acc;
      }, {}),
    );
  }, [defaultUserSkills, defaultCustomSkills, setValue]);

  // 기본 스킬(checkbox 등) 클릭 토글
  const onClickSkill = (skill: string) => {
    const next = userSkills.includes(skill) ? userSkills.filter((s) => s !== skill) : [...userSkills, skill];
    setValue('userSkills', next, { shouldDirty: true });
  };

  // 커스텀 스킬 입력
  const onChangeTypingSkill = (e: React.ChangeEvent<HTMLInputElement>) => setTypingSkill(e.target.value);

  // 커스텀 스킬 추가 (Enter)
  const onEnterAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      if (typingSkill.trim() === '') return;
      if (customSkills.includes(typingSkill)) {
        toast.error('이미 추가된 기술입니다.');
        setTypingSkill('');
        return;
      }
      // object로 변환해서 추가
      setValue('customSkill', { ...customSkillObj, [typingSkill]: true }, { shouldDirty: true });
      setTypingSkill('');
    }
  };

  // 커스텀 스킬 삭제
  const onClickDeleteCustomSkill = (skill: string) => {
    // skill만 뺀 object로 변환
    const updated = { ...customSkillObj };
    delete updated[skill];
    setValue('customSkill', updated, { shouldDirty: true });
  };

  return {
    errors,
    isSubmitted,
    userSkills,
    typingSkill,
    customSkills,
    onClickSkill,
    onChangeTypingSkill,
    onEnterAddSkill,
    onClickDeleteCustomSkill,
  };
};

export default useDevSkillField;
