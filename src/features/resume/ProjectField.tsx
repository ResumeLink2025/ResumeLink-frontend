import { Tag, Typography } from '@/components/common';
import type { UserProjectType } from '@/constants/resume';
import { USER_PROJECT_LIST } from '@/constants/resume';
import { cn } from '@/utils/styleMerge';

interface ProjectFieldProps {
  selectedProjects: UserProjectType[];
  onClickProject: (project: UserProjectType) => void;
  errorMessage?: string;
}

const ProjectField = ({ selectedProjects, onClickProject, errorMessage }: ProjectFieldProps) => {
  return (
    <div className="p-5 border-2 border-dashed border-gray-60 rounded-[10px] flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Typography type="heading2">프로젝트 선택</Typography>
        <Tag size="small">필수</Tag>
      </div>
      <div className="flex flex-col gap-2">
        {USER_PROJECT_LIST.map((project) => (
          <div
            key={project.id}
            onClick={() => onClickProject(project)}
            className={cn(
              'p-3 border border-gray-40 rounded-[10px] cursor-pointer',
              selectedProjects.includes(project) && 'bg-primary border-transparent',
            )}
          >
            {project.title}
          </div>
        ))}
      </div>
      {errorMessage && <Typography className="text-red-600">{errorMessage}</Typography>}
    </div>
  );
};

export default ProjectField;
