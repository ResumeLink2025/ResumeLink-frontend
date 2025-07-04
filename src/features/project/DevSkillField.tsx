import { X } from 'lucide-react';

import { Tag, Typography } from '@/components/common';
import Input from '@/components/common/Input';
import { SKILL_CATEGORIES } from '@/constants/project';

import useDevSkillField from './hooks/useDevSkillField';

const DevSkillField = () => {
  const {
    errors,
    isSubmitted,
    generalSkills,
    typingSkill,
    customSkills,
    onClickSkill,
    onChangeTypingSkill,
    onEnterAddSkill,
    onClickDeleteCustomSkill,
  } = useDevSkillField();

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <Typography type="body1">기술스택 선택</Typography>
        <div className="flex flex-wrap gap-2 h-70 overflow-y-scroll custom-scrollbar">
          {SKILL_CATEGORIES.map((skill) => (
            <Tag
              key={skill.id}
              onClick={() => onClickSkill(skill.name)}
              isSelected={generalSkills.includes(skill.name)}
              styleType="outline"
              size="large"
            >
              {skill.name}
            </Tag>
          ))}
        </div>
      </div>
      {isSubmitted && errors?.skill?.generalSkills && (
        <Typography className="text-red-600">{errors?.skill?.generalSkills?.message}</Typography>
      )}
      <div className="flex flex-col gap-1">
        <Typography type="body1">기술스택 직접 입력</Typography>
        <Input
          value={typingSkill}
          placeholder="사용하는 기술이 위의 태그에 없는 경우 직접 입력해주세요. (Enter를 이용하여 태그를 구분해주세요.)"
          onChange={onChangeTypingSkill}
          onKeyDown={onEnterAddSkill}
        />
        <div className="flex flex-wrap gap-2 mt-3">
          {customSkills.map((customSkill) => (
            <div
              key={customSkill}
              className="inline-flex items-center rounded-full text-gray-60 gap-3 bg-gray-10 border border-gray-40 px-4 py-2 cursor-default"
            >
              <Typography type="body2">{customSkill}</Typography>
              <X size={18} onClick={() => onClickDeleteCustomSkill(customSkill)} className="cursor-pointer" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DevSkillField;
