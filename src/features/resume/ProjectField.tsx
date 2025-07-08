import { Tag, Typography } from '@/components/common';
import type { UserProjectType } from '@/constants/resume';
import { USER_PROJECT_LIST } from '@/constants/resume';
import { cn } from '@/utils/styleMerge';

interface ProjectFieldProps {
  selectedProjects: UserProjectType[];
  isSubmitted: boolean;
  errorMessage?: string;
  onClickProject: (project: UserProjectType) => void;
}

const ProjectField = ({ selectedProjects, isSubmitted, errorMessage, onClickProject }: ProjectFieldProps) => {
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
              selectedProjects.some((selectedProject) => selectedProject.id === project.id) &&
                'bg-primary border-transparent',
            )}
          >
            {project.projectName}
          </div>
        ))}
      </div>
      {errorMessage && isSubmitted && <Typography className="text-red-600">{errorMessage}</Typography>}
    </div>
  );
};

export default ProjectField;
