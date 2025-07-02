import { skillList } from '@/constants/skill';

export default function AddSkillInfoSection() {
  return (
    <div className="col-span-2 flex flex-col gap-2">
      <label className="text-sm font-medium text-black">기술 스택</label>
      <input
        placeholder="기술 스택을 입력하세요"
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
      />

      <div className="flex flex-wrap gap-2 mt-2">
        {skillList.map((skill, idx) => (
          <span key={idx} className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-sm">
            {skill.value}
          </span>
        ))}
      </div>
    </div>
  );
}
