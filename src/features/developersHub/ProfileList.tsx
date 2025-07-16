import { useSearchParams } from 'next/navigation';

import useGetProjectList from '@/hooks/apis/project/useGetProjectList';
import useGetResumeList from '@/hooks/apis/resume/useGetResumeList';

import ProjectProfileCard from '../components/ProjectProfileCard';
import ResumeProfileCard from '../components/ResumeProfileCard';

interface ProfileListProps {
  listType: string;
}

const ProfileList = ({ listType }: ProfileListProps) => {
  const params = useSearchParams();

  const searchTerm = params.get('searchTerm');
  const skillNames = params.get('skillNames');
  const positionNames = params.get('positionNames');

  const { data: resumeList } = useGetResumeList(listType, searchTerm, skillNames, positionNames);
  const { data: projectList } = useGetProjectList(listType);

  return (
    <div className="grid grid-cols-5 gap-4 py-15">
      {resumeList && resumeList?.map((resume) => <ResumeProfileCard key={resume.id} {...resume} />)}
      {projectList && projectList?.map((project) => <ProjectProfileCard key={project.id} {...project} />)}
    </div>
  );
};

export default ProfileList;
