import { Tag } from '@/components/common';
import Input from '@/components/common/Input';
import { skillList } from '@/constants/skill';

interface AddSkillInfoSectionProps {
  selectedSkills: string[];
  setSelectedSkills: (skills: string[]) => void;
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
}

export default function AddSkillInfoSection({
  selectedSkills,
  setSelectedSkills,
  searchKeyword,
  setSearchKeyword,
}: AddSkillInfoSectionProps) {
  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const filteredSkills = skillList.filter((skill) =>
    skill.value.toLowerCase().includes(searchKeyword.toLowerCase()),
  );

  return (
    <div className="col-span-2 flex flex-col gap-2">
      <Input
        label="기술 스택"
        size="medium"
        placeholder="기술 스택을 검색하세요"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        className="focus:outline-none"
      />

      <div className="flex flex-wrap gap-2 mt-2">
        {filteredSkills.map((skill, idx) => (
          <button key={idx} type="button" onClick={() => toggleSkill(skill.value)}>
            <Tag
              styleType={selectedSkills.includes(skill.value) ? 'primary' : 'outline'}
              isSelected={selectedSkills.includes(skill.value)}
              size="medium"
            >
              {skill.value}
            </Tag>
          </button>
        ))}
      </div>
    </div>
  );
}
