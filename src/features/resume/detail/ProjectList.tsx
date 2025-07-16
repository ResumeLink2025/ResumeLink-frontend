import { Tag, Typography } from '@/components/common';
import type { ProjectInfoToUseResumeType } from '@/constants/project';
import { cn } from '@/utils/styleMerge';

interface ProjectListProps {
  projects?: ProjectInfoToUseResumeType[];
  isThemeBlack?: boolean;
}

const ProjectList = ({ projects, isThemeBlack = false }: ProjectListProps) => {
  return (
    <div className="flex flex-col gap-3">
      <Typography type="heading2" className="text-current-mode">
        프로젝트 경험
      </Typography>
      <div className="flex flex-col gap-6">
        {projects?.map((project, idx) => (
          <div key={idx} className="py-3 px-4 flex flex-col gap-7">
            <Typography type="title1" className="text-current-mode">
              {project.projectName}
            </Typography>
            <div className="flex flex-col gap-1">
              <Typography type="title2" className={isThemeBlack ? 'text-gray-30' : 'text-gray-60'}>
                프로젝트 설명
              </Typography>
              <Typography type="body1" className={isThemeBlack ? 'text-gray-30' : 'text-gray-60'}>
                {project.projectDesc}
              </Typography>
            </div>
            <div className="flex flex-col gap-1">
              <Typography type="title2" className={isThemeBlack ? 'text-gray-30' : 'text-gray-60'}>
                맡은 역할
              </Typography>
              <Typography type="body1" className={isThemeBlack ? 'text-gray-30' : 'text-gray-60'}>
                {project.role}
              </Typography>
            </div>
            <div className="flex flex-col gap-1">
              <Typography
                type="title2"
                className={cn(isThemeBlack ? 'text-gray-30' : 'text-gray-60', 'my-2')}
              >
                사용한 기술스택
              </Typography>
              <div className="flex flex-wrap gap-2">
                {[...project.generalSkills, ...project.customSkills].map((skill) => (
                  <Tag key={skill} styleType={isThemeBlack ? 'primary' : 'outline'} size="large">
                    {skill}
                  </Tag>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
