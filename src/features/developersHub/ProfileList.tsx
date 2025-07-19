import { ProjectProfileCard, ResumeProfileCard } from '../components';
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
    <div className="grid grid-cols-1 list-lg:grid-cols-5 list-md:grid-cols-4 list-sm:grid-cols-3 list-xs:grid-cols-2 gap-4 px-4 py-15">
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
