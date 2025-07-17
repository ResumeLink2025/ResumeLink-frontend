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

  // 선택된 이름들 -> 객체로 변환해서 form에 저장
  useEffect(() => {
    setValue(
      'user.userSkills',
      defaultGeneralSkills.map((name, idx) => ({
        skill: {
          id: String(idx), // id 생성이 필요하면 실제 id로!
          name,
        },
      })),
    );
    // 커스텀 스킬 등도 필요시 setValue
  }, [defaultGeneralSkills, setValue]);

  // 필드 관리
  const [generalSkills, setGeneralSkills] = useState<string[]>(defaultGeneralSkills);
  const [customSkills, setCustomSkills] = useState<string[]>(defaultCustomSkills);
  const [typingSkill, setTypingSkill] = useState('');

  // 일반 스킬 선택/해제
  const onClickSkill = (skill: string) => {
    setGeneralSkills((prev) => {
      const newList = prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill];
      setValue(
        'user.userSkills',
        newList.map((name, idx) => ({
          skill: {
            id: String(idx), // id 생성이 필요하면 실제 id로!
            name,
          },
        })),
      );
      return newList;
    });
  };

  // 커스텀 스킬 추가/삭제
  const onChangeTypingSkill = (e: React.ChangeEvent<HTMLInputElement>) => setTypingSkill(e.target.value);

  const onEnterAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      if (typingSkill.trim() === '') return;
      if (customSkills.includes(typingSkill)) {
        toast.error('이미 추가된 기술입니다.');
        setTypingSkill('');
        return;
      }
      const next = [...customSkills, typingSkill];
      setCustomSkills(next);
      setTypingSkill('');
      // 필요시 setValue('user.customSkill', ...) 또는 다른 필드에 set
    }
  };

  const onClickDeleteCustomSkill = (skill: string) => {
    setCustomSkills((prev) => prev.filter((customSkill) => customSkill !== skill));
    // 필요시 setValue 연동
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
