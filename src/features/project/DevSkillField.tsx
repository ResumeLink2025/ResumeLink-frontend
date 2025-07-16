import { X } from 'lucide-react';

import { Tag, Typography } from '@/components/common';
import Input from '@/components/common/Input';
import { SKILL_CATEGORIES } from '@/constants/project';
import { cn } from '@/utils/styleMerge';

import useDevSkillField from './hooks/useDevSkillField';


type DevSkillFieldProps = {
  className?: string;
};

const DevSkillField = ({ className }: DevSkillFieldProps) => {


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
  } = useDevSkillField({ defaultGeneralSkills, defaultCustomSkills });

  return (
    <div className={cn('flex flex-col gap-10', className)}>
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
        <Typography className="text-red-600">{errors.skill.generalSkills.message}</Typography>
      )}

      <div className="flex flex-col gap-1">
        <Typography type="body1">기술스택 직접 입력</Typography>
        <Input
          value={typingSkill}
          placeholder="(Enter로 태그 구분) 리스트에 없으면 직접 입력하세요."
          onChange={onChangeTypingSkill}
          onKeyDown={onEnterAddSkill}
        />

        {/* 커스텀 스킬 태그 목록 */}
        <div className="flex flex-wrap gap-2 mt-3">
          {customSkills.map((customSkill) => (
            <div
              key={customSkill}
              className="inline-flex items-center gap-3 rounded-full bg-gray-10 border border-gray-40 px-4 py-2 text-gray-60 cursor-default"
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
