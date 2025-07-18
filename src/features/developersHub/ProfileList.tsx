import ProjectProfileCard from '../components/ProjectProfileCard';
import ResumeProfileCard from '../components/ResumeProfileCard';
import useProfileList from './hooks/useProfileList';

interface ProfileListProps {
  listType: string;
}

const ProfileList = ({ listType }: ProfileListProps) => {
  const { resumeList, projectList, onClickResumeHeart, onClickProjectHeart } = useProfileList(listType);

  return (
    <div className="grid grid-cols-5 gap-4 py-15">
      {resumeList?.map((resume) => (
        <ResumeProfileCard key={resume.id} onClick={onClickResumeHeart} {...resume} />
      ))}
      {projectList?.map((project) => (
        <ProjectProfileCard key={project.id} onClick={onClickProjectHeart} {...project} />
      ))}
    </div>
  );
};

export default ProfileList;
