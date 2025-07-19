import { ProjectProfileCard,ResumeProfileCard } from '../components';
import useProfileList from './hooks/useProfileList';
import ProfileListSkeleton from './ProfileListSkeleton';

interface ProfileListProps {
  listType: string;
}

const ProfileList = ({ listType }: ProfileListProps) => {
  const {
    resumeList,
    projectList,
    isResumeListLoading,
    isProjectListLoading,
    onClickResumeHeart,
    onClickProjectHeart,
  } = useProfileList(listType);

  if (isResumeListLoading || isProjectListLoading) {
    return <ProfileListSkeleton />;
  }

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
